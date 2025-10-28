"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Heart, Briefcase, Coins, UploadCloud } from "lucide-react";

export default function InsightsPage() {
  const [aiReportLoading, setAiReportLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setAiReportLoading(true);
    // Simulate AI API call
    setTimeout(() => {
      setAiReportLoading(false);
      alert("✅ Your AI-generated astrology report has been created!");
    }, 2000);
  };

  const handlePalmUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      alert("🖐️ Palm image uploaded successfully! AI reading will be available soon.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-10">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI Astrology Reports & Mystical Insights
      </motion.h1>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* AI Astrology Reports */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-purple-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-purple-600 flex items-center gap-2">
            <Brain size={24} /> AI Astrology Reports
          </h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Get automatically generated, deeply personalized astrology reports powered by AI.
            These reports interpret your planetary patterns, dashas, and life path in detail.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-purple-50 p-3 rounded-xl text-center">
              <Briefcase className="mx-auto text-purple-500 mb-1" />
              <p className="text-sm font-medium">Career</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl text-center">
              <Heart className="mx-auto text-purple-500 mb-1" />
              <p className="text-sm font-medium">Love</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl text-center">
              <Coins className="mx-auto text-purple-500 mb-1" />
              <p className="text-sm font-medium">Finance</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl text-center">
              <Brain className="mx-auto text-purple-500 mb-1" />
              <p className="text-sm font-medium">Health</p>
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={aiReportLoading}
            className="mt-6 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            {aiReportLoading ? "⏳ Generating Report..." : "Generate My AI Report"}
          </button>
        </motion.div>

        {/* Numerology Reports */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-purple-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-purple-600">🔢 Numerology Report</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Enter your full name and date of birth to discover your destiny, expression, and soul
            urge numbers. Understand the hidden meaning of your name and how it influences your
            life path.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("✅ Numerology analysis will be emailed shortly!");
            }}
            className="mt-4 flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              required
              placeholder="Full Name"
              className="border border-purple-200 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="date"
              required
              className="border border-purple-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
            >
              Get Report
            </button>
          </form>
        </motion.div>

        {/* Tarot Reading */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-purple-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-purple-600">🃏 Tarot Card Reading</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Get intuitive tarot insights — AI-assisted or interpreted by experienced tarot readers.
            Reveal what's hidden in your current energy.
          </p>
          <button
            onClick={() => alert("🔮 Tarot reading feature coming soon!")}
            className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            Draw My Tarot Reading
          </button>
        </motion.div>

        {/* Palmistry */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow border border-purple-100"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-purple-600">🖐️ Palmistry (AI Hand Reading)</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Upload a clear image of your palm to receive an AI-powered palm reading. Our algorithms
            analyze key lines — Life Line, Heart Line, and Fate Line — to offer insights into your
            personality and future.
          </p>
          <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePalmUpload}
              className="block text-sm text-gray-700 bg-purple-50 border border-purple-200 p-2 rounded-lg cursor-pointer"
            />
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Palm Preview"
                className="w-24 h-24 object-cover rounded-lg border border-purple-300"
              />
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}