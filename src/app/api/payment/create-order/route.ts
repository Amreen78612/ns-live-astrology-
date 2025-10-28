import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { astroQuestions } from "@/db/schema";
import { createOrder } from "@/lib/payment";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, question, replyType } = await request.json();
    const userId = parseInt((session.user as any).id);

    // Create actual Razorpay order
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
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
