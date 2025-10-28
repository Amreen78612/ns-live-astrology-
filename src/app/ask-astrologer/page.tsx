"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AskAstrologerPage() {
  const { data: session } = useSession();
  const [question, setQuestion] = useState("");
  const [replyType, setReplyType] = useState("chat");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function handlePay() {
    if (!question.trim()) {
      alert("Please type your question before paying.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99, question, replyType }),
      });
      const data = await res.json();
      if (!data.orderId) throw new Error("Order not created");

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "NS Live Astro",
        description: "Ask an Astrologer (One-Question Consultation)",
        order_id: data.orderId,
        handler: function (response: any) {
          alert("✅ Payment successful! Your question has been submitted.");
          console.log("Payment response:", response);
        },
        prefill: {
          name: session?.user?.name || "Guest",
          email: session?.user?.email || "guest@example.com",
        },
        theme: { color: "#ff6b00" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment error", err);
      // Show specific message when available to aid debugging
      alert(err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full py-12 bg-[#fffaf5]">
      <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Ask an Astrologer <span className="text-orange-500">(₹99)</span>
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Get personalized astrological advice from our experts. Type your
          question below and choose how you want to receive your reply.
        </p>

        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Your Question:
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Type your question here..."
          />

          <label className="block font-medium text-gray-700 mt-4">
            Preferred Reply Method:
          </label>
          <select
            value={replyType}
            onChange={(e) => setReplyType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="chat">Chat</option>
            <option value="email">Email</option>
          </select>

          <div className="text-center mt-8">
            <button
              onClick={handlePay}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all"
            >
              {loading ? "Processing..." : "Pay ₹99 & Ask"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
