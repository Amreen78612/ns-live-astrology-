// app/love-compatibility/page.tsx
"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoveCompatibilityPage() {
  const zodiacSigns = [
    { name: "Aries", dates: "Mar 21 - Apr 19", element: "Fire" },
    { name: "Taurus", dates: "Apr 20 - May 20", element: "Earth" },
    { name: "Gemini", dates: "May 21 - Jun 20", element: "Air" },
    { name: "Cancer", dates: "Jun 21 - Jul 22", element: "Water" },
    { name: "Leo", dates: "Jul 23 - Aug 22", element: "Fire" },
    { name: "Virgo", dates: "Aug 23 - Sep 22", element: "Earth" },
    { name: "Libra", dates: "Sep 23 - Oct 22", element: "Air" },
    { name: "Scorpio", dates: "Oct 23 - Nov 21", element: "Water" },
    { name: "Sagittarius", dates: "Nov 22 - Dec 21", element: "Fire" },
    { name: "Capricorn", dates: "Dec 22 - Jan 19", element: "Earth" },
    { name: "Aquarius", dates: "Jan 20 - Feb 18", element: "Air" },
    { name: "Pisces", dates: "Feb 19 - Mar 20", element: "Water" },
  ];

  const [yourSign, setYourSign] = useState("");
  const [partnerSign, setPartnerSign] = useState("");
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(
    null,
  );
  const [compatibilityMessage, setCompatibilityMessage] = useState("");

  // Calculate compatibility based on zodiac signs
  const calculateCompatibility = () => {
    if (!yourSign || !partnerSign) {
      alert("Please select both signs");
      return;
    }

    // Find the selected signs
    const yourZodiac = zodiacSigns.find(
      (sign) => sign.name.toLowerCase() === yourSign,
    );
    const partnerZodiac = zodiacSigns.find(
      (sign) => sign.name.toLowerCase() === partnerSign,
    );

    if (!yourZodiac || !partnerZodiac) {
      alert("Invalid sign selection");
      return;
    }

    // Base compatibility calculation
    let score = 50; // Start with a base score

    // Element compatibility
    const elementCompatibility: Record<string, Record<string, number>> = {
      Fire: { Fire: 20, Air: 15, Water: -10, Earth: -15 },
      Earth: { Earth: 20, Water: 15, Fire: -15, Air: -10 },
      Air: { Air: 20, Fire: 15, Earth: -10, Water: -15 },
      Water: { Water: 20, Earth: 15, Air: -15, Fire: -10 },
    };

    // Add element compatibility
    score +=
      elementCompatibility[yourZodiac.element][partnerZodiac.element] || 0;

    // Special compatibility rules for certain sign pairs
    const specialCompatibility: Record<string, Record<string, number>> = {
      aries: { leo: 25, sagittarius: 25, cancer: -20, capricorn: -20 },
      taurus: { virgo: 25, capricorn: 25, leo: -20, aquarius: -20 },
      gemini: { libra: 25, aquarius: 25, virgo: -20, pisces: -20 },
      cancer: { scorpio: 25, pisces: 25, aries: -20, libra: -20 },
      leo: { aries: 25, sagittarius: 25, taurus: -20, scorpio: -20 },
      virgo: { taurus: 25, capricorn: 25, gemini: -20, sagittarius: -20 },
      libra: { gemini: 25, aquarius: 25, cancer: -20, capricorn: -20 },
      scorpio: { cancer: 25, pisces: 25, leo: -20, aquarius: -20 },
      sagittarius: { aries: 25, leo: 25, virgo: -20, pisces: -20 },
      capricorn: { taurus: 25, virgo: 25, aries: -20, libra: -20 },
      aquarius: { gemini: 25, libra: 25, taurus: -20, scorpio: -20 },
      pisces: { cancer: 25, scorpio: 25, gemini: -20, sagittarius: -20 },
    };

    // Add special compatibility
    score += specialCompatibility[yourSign]?.[partnerSign] || 0;

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // Set compatibility message based on score
    let message = "";
    if (score >= 90) {
      message = "Perfect Match! Soulmate potential!";
    } else if (score >= 80) {
      message =
        "Excellent Compatibility! Great potential for a lasting relationship.";
    } else if (score >= 70) {
      message = "Very Good Match! Strong connection and understanding.";
    } else if (score >= 60) {
      message = "Good Compatibility! Potential for a harmonious relationship.";
    } else if (score >= 50) {
      message =
        "Moderate Compatibility! Work on communication and understanding.";
    } else if (score >= 40) {
      message = "Challenging Match! Requires effort and compromise.";
    } else {
      message = "Difficult Compatibility! Significant differences to overcome.";
    }

    setCompatibilityScore(score);
    setCompatibilityMessage(message);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Love Compatibility
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Discover your zodiac love compatibility and find your perfect
              match based on astrological signs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Zodiac Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
                Select Your Signs
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-3">
                    Your Sign
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    value={yourSign}
                    onChange={(e) => setYourSign(e.target.value)}
                  >
                    <option value="">Select your sign</option>
                    {zodiacSigns.map((sign, index) => (
                      <option key={index} value={sign.name.toLowerCase()}>
                        {sign.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-3">
                    Partner's Sign
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    value={partnerSign}
                    onChange={(e) => setPartnerSign(e.target.value)}
                  >
                    <option value="">Select partner's sign</option>
                    {zodiacSigns.map((sign, index) => (
                      <option key={index} value={sign.name.toLowerCase()}>
                        {sign.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="w-full mt-6 bg-[#FF6B35] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#FF5722] transition-colors shadow-lg"
                onClick={calculateCompatibility}
              >
                Check Love Compatibility
              </button>
            </div>

            {/* Compatibility Result */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
                Compatibility Score
              </h2>
              <div className="text-center">
                {compatibilityScore !== null ? (
                  <>
                    <div className="text-6xl font-black text-[#FF6B35] mb-4">
                      {compatibilityScore}%
                    </div>
                    <p className="text-lg text-[#666] mb-4">
                      {compatibilityMessage}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                      <div
                        className="bg-[#FF6B35] h-4 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${compatibilityScore}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      <p className="font-semibold">Elements:</p>
                      <p>
                        {
                          zodiacSigns.find(
                            (s) => s.name.toLowerCase() === yourSign,
                          )?.element
                        }{" "}
                        +
                        {" " +
                          zodiacSigns.find(
                            (s) => s.name.toLowerCase() === partnerSign,
                          )?.element}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="py-8">
                    <p className="text-gray-500">
                      Select both signs and click "Check Love Compatibility" to
                      see your result
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Matching CTA */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF5722] rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Want Detailed Analysis?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Get comprehensive Kundli matching with Ashta Koota analysis for
              marriage compatibility
            </p>
            <Link
              href="/match-kundli"
              className="inline-flex items-center gap-2 bg-white text-[#FF6B35] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Match Kundli <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
