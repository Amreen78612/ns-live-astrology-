"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Sparkles, Download, Share2, Calendar } from "lucide-react";
import { useState } from "react";

// Define types for better TypeScript support
interface PlanetaryPosition {
  planet: string;
  sign: string;
  house: number;
  degree: string;
}

interface House {
  house: number;
  sign: string;
  lord: string;
}

interface Panchangam {
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  paksha: string;
}

interface KundliData {
  name: string;
  lagna: string;
  moonSign: string;
  nakshatra: string;
  planetaryPositions: PlanetaryPosition[];
  houses: House[];
  aspects: string[];
  panchangam: Panchangam;
  chartType: string;
}

interface FormData {
  name: string;
  gender: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  chartType: string;
}

export default function FreeKundliPage() {
  const [kundliData, setKundliData] = useState<KundliData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "Male",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    chartType: "north",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const generateKundli = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/kundli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate kundli");
      }

      if (result.success) {
        setKundliData(result.data);
      } else {
        throw new Error("Failed to generate kundli");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Kundli generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!kundliData) return;

    // Create a simple PDF content
    const content = `
      KUNDLI REPORT - JANAM PATRIKA
      =============================
      
      Name: ${kundliData.name}
      Chart Type: ${kundliData.chartType === "north" ? "North Indian" : "South Indian"}
      
      BASIC DETAILS:
      --------------
      Lagna (Ascendant): ${kundliData.lagna}
      Moon Sign: ${kundliData.moonSign}
      Nakshatra: ${kundliData.nakshatra}
      
      PANCHANGAM:
      -----------
      Tithi: ${kundliData.panchangam.tithi}
      Nakshatra: ${kundliData.panchangam.nakshatra}
      Yoga: ${kundliData.panchangam.yoga}
      Karana: ${kundliData.panchangam.karana}
      Paksha: ${kundliData.panchangam.paksha}
      
      PLANETARY POSITIONS:
      --------------------
      ${kundliData.planetaryPositions
        .map(
          (planet) =>
            `${planet.planet}: ${planet.sign} (House ${planet.house}) - ${planet.degree}`,
        )
        .join("\n      ")}
      
      HOUSES (BHAVAS):
      ----------------
      ${kundliData.houses
        .map(
          (house) =>
            `House ${house.house}: ${house.sign} (Lord: ${house.lord})`,
        )
        .join("\n      ")}
      
      PLANETARY ASPECTS:
      ------------------
      ${kundliData.aspects.join("\n      ")}
      
      Generated on: ${new Date().toLocaleDateString()}
      
      Note: This is a computer-generated kundli report.
      For detailed analysis, consult with a professional astrologer.
    `;

    // Create and download text file as PDF simulation
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${kundliData.name.replace(/\s+/g, "_")}_kundli_report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const shareKundli = () => {
    if (!kundliData) return;

    if (navigator.share) {
      navigator.share({
        title: `${kundliData.name}'s Kundli`,
        text: `Check out my detailed Kundli report. Lagna: ${kundliData.lagna}, Moon Sign: ${kundliData.moonSign}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Free Kundli
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Generate your free online kundli report and predict the future by
              reading your birth chart
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {/* Kundli Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8 text-center">
              Enter Your Birth Details
            </h2>

            <form onSubmit={generateKundli} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Time of Birth
                  </label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    placeholder="Enter city, state, country"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Chart Type
                  </label>
                  <select
                    name="chartType"
                    value={formData.chartType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                  >
                    <option value="north">North Indian Style</option>
                    <option value="south">South Indian Style</option>
                  </select>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#FF6B35] text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-[#FF5722] disabled:bg-gray-400 transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Kundli...
                    </>
                  ) : (
                    "Generate Kundli"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Kundli Results */}
          {kundliData && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">
                    {kundliData.name}'s Kundli
                  </h2>
                  <p className="text-gray-600">
                    Complete Birth Chart Analysis -{" "}
                    {kundliData.chartType === "north"
                      ? "North Indian"
                      : "South Indian"}{" "}
                    Style
                  </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={downloadPDF}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                  >
                    <Download size={20} />
                    Download PDF
                  </button>
                  <button
                    onClick={shareKundli}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Lagna (Ascendant)
                  </h3>
                  <p className="text-lg">{kundliData.lagna}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Moon Sign
                  </h3>
                  <p className="text-lg">{kundliData.moonSign}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">
                    Nakshatra
                  </h3>
                  <p className="text-lg">{kundliData.nakshatra}</p>
                </div>
              </div>

              {/* Daily Panchangam */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-yellow-600" size={24} />
                  <h3 className="text-xl font-bold text-yellow-800">
                    Daily Panchangam
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-yellow-600">Tithi</p>
                    <p className="font-semibold">
                      {kundliData.panchangam.tithi}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-yellow-600">Nakshatra</p>
                    <p className="font-semibold">
                      {kundliData.panchangam.nakshatra}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-yellow-600">Yoga</p>
                    <p className="font-semibold">
                      {kundliData.panchangam.yoga}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-yellow-600">Karana</p>
                    <p className="font-semibold">
                      {kundliData.panchangam.karana}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-yellow-600">Paksha</p>
                    <p className="font-semibold">
                      {kundliData.panchangam.paksha}
                    </p>
                  </div>
                </div>
              </div>

              {/* Planetary Positions */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">
                  Planetary Positions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {kundliData.planetaryPositions.map((planet, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {planet.planet}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Sign: {planet.sign}
                          </p>
                          <p className="text-sm text-gray-600">
                            House: {planet.house}
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {planet.degree}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Houses */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">
                  Houses (Bhavas)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {kundliData.houses.map((house, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg text-center border"
                    >
                      <h4 className="font-bold text-blue-800">
                        House {house.house}
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">{house.sign}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Lord: {house.lord}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aspects */}
              <div>
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">
                  Planetary Aspects
                </h3>
                <div className="space-y-3">
                  {kundliData.aspects.map((aspect, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500"
                    >
                      <p className="text-gray-800">{aspect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                Accurate Predictions
              </h3>
              <p className="text-[#666]">
                Get precise astrological predictions based on your birth chart
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                Detailed Analysis
              </h3>
              <p className="text-[#666]">
                Comprehensive analysis of all planetary positions
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                Life Guidance
              </h3>
              <p className="text-[#666]">
                Receive guidance for important life decisions
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
