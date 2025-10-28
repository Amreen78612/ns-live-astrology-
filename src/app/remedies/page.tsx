"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

export default function RemediesPage() {
  const [reportRequested, setReportRequested] = useState(false);

  const handleReportRequest = async () => {
    setReportRequested(true);
    alert("✅ Your personalized remedy report request has been sent!");
  };

  const shareRemedy = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Astrological Remedies",
        text: "Check out my personalized remedies and recommendations from NS Live Astro!",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white px-6 py-10">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-orange-700 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Remedies & Recommendations
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Gemstone Suggestions */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-orange-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-orange-600">
            💎 Gemstone Suggestions
          </h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Discover the most auspicious gemstones aligned with your planetary influences. Wearing
            the right gemstone strengthens beneficial planets and reduces malefic effects.
          </p>
          <ul className="mt-3 list-disc list-inside text-gray-600">
            <li>Ruby (for Sun) – boosts confidence and authority</li>
            <li>Emerald (for Mercury) – enhances intellect and communication</li>
            <li>Yellow Sapphire (for Jupiter) – brings wisdom and prosperity</li>
          </ul>
        </motion.div>

        {/* Mantras, Puja & Yantras */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-orange-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-orange-600">
            🕉️ Mantras, Puja & Yantras
          </h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Strengthen your spiritual balance with sacred mantras, energizing pujas, and divine
            yantras. Each practice is chosen based on your chart’s planetary alignments.
          </p>
          <ul className="mt-3 list-disc list-inside text-gray-600">
            <li>Gayatri Mantra – for peace and clarity</li>
            <li>Mahamrityunjaya Mantra – for protection and healing</li>
            <li>Shree Yantra – for wealth and abundance</li>
          </ul>
        </motion.div>

        {/* Donations */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-orange-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-orange-600">🙏 Donations (Daan)</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Donate items associated with unfavorable planets to balance karma. Daan removes
            planetary blockages and increases positive flow.
          </p>
          <ul className="mt-3 list-disc list-inside text-gray-600">
            <li>Donate food or clothes to the poor on Saturdays (for Saturn)</li>
            <li>Feed cows or offer sweets to children on Thursdays (for Jupiter)</li>
            <li>Donate copper or jaggery on Sundays (for Sun)</li>
          </ul>
        </motion.div>

        {/* Personalized Remedy Report */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-orange-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-orange-600">📜 Personalized Remedy Report</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Get a detailed, personalized remedy report curated by professional astrologers. It will
            include gemstone, mantra, and donation advice tailored to your exact birth chart.
          </p>
          <button
            onClick={handleReportRequest}
            className="mt-4 bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition-all"
          >
            {reportRequested ? "Request Sent ✅" : "Request My Report"}
          </button>
        </motion.div>

        {/* Advanced Analytics */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-orange-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-orange-600">📊 Advanced Analytical Features</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Gain access to AI-driven insights about your planetary transits, life patterns, and
            karmic strengths. See your astrological data visualized beautifully.
          </p>
          <button
            onClick={() => alert("Coming soon! AI-powered analysis in progress 🔮")}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
          >
            View My Analysis
          </button>
        </motion.div>

        {/* Social Media Sharing */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-orange-100 flex justify-between items-center"
          whileHover={{ scale: 1.01 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-orange-600">
              📱 Share on Social Media
            </h2>
            <p className="text-gray-700 mt-3 leading-relaxed">
              Proud of your remedies or insights? Share them with your followers and inspire others
              to balance their lives spiritually.
            </p>
          </div>
          <button
            onClick={shareRemedy}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all flex items-center gap-2"
          >
            <Share2 size={18} /> Share
          </button>
        </motion.div>
      </div>
    </main>
  );
}
