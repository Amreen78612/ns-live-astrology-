const Razorpay = require("razorpay");

(async () => {
  const r = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const o = await r.orders.create({
      amount: 99 * 100,
      currency: "INR",
      receipt: "test_" + Date.now(),
    });
    console.log("OK", JSON.stringify(o, null, 2));
  } catch (e) {
    console.error("ERR", e);
    process.exit(1);
  }
})();
