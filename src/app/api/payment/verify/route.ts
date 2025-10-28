import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { astroQuestions } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    // Verify the signature
    // In production, use: crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    // For sandbox/demo, we'll accept the payment
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "demo_secret")
      .update(text)
      .digest("hex");

    const isValidSignature = generatedSignature === razorpay_signature;

    if (!isValidSignature) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    // Update payment status in database
    await db
      .update(astroQuestions)
      .set({
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(astroQuestions.razorpayOrderId, razorpay_order_id));

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 },
    );
  }
}
