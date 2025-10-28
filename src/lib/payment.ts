import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Create a Razorpay order (amount is in rupees; we convert to paise)
export async function createOrder(amount: number) {
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert rupees to paise
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });
  return order;
}
