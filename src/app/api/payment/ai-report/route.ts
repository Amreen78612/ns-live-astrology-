import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { razorpay } from "@/lib/payment";
import { db } from "@/lib/drizzle";
import { aiReports } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, dob, type, amount } = await req.json();
    const order = await razorpay.orders.create({
      amount: (amount || 49) * 100,
      currency: "INR",
      receipt: "AI_REPORT_" + Date.now(),
    });

    await db.insert(aiReports).values({
      userId: Number((session.user as any).id),
      name,
      dob,
      type,
      paymentStatus: "unpaid",
      razorpayOrderId: String(order.id),
      // order.amount can be string or number depending on Razorpay client version — normalize to number
      amount: Number(order.amount),
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount, key: process.env.RAZORPAY_KEY_ID });
  } catch (err: any) {
    console.error("Error creating AI report order:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}