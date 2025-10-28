import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { astroQuestions } from "@/db/schema";
import { createOrder } from "@/lib/payment";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { amount, question, replyType } = body;

    let userId: number | null = null;
    if (session?.user) {
      userId = parseInt((session.user as any).id);
    } else if (process.env.NODE_ENV !== "production") {
      // Dev bypass: allow providing a dev user id via header for local testing
      const devUserId = request.headers.get("x-dev-user-id");
      if (devUserId) {
        userId = parseInt(devUserId);
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await createOrder(amount);
    const now = new Date().toISOString();

    await db.insert(astroQuestions).values({
      userId,
      question,
      replyType,
      paymentStatus: "unpaid",
      razorpayOrderId: order.id,
      amount: amount * 100,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: amount * 100,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    // Return detailed error in development to help debugging
    const message =
      process.env.NODE_ENV === "production"
        ? "Failed to create order"
        : (error as any)?.message || String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
