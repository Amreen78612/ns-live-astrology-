"use client";

import { useState, useEffect } from "react";

interface HoroscopeData {
  sign: string;
  period: string;
  prediction: string;
  luckyNumber: number;
  luckyColor: string;
  mood: string;
  compatibility: string;
}

interface BirthChart {
  zodiacSign: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planetaryPositions: {
    sun: string;
    moon: string;
    mercury: string;
    venus: string;
    mars: string;
  };
  lifePathNumber: number;
  birthStone: string;
  characteristics: string[];
}

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export default function HoroscopePage() {
  const [activeTab, setActiveTab] = useState<
    "daily" | "weekly" | "monthly" | "yearly" | "personal"
  >("daily");
  const [selectedSign, setSelectedSign] = useState("Aries");
  const [region, setRegion] = useState<"north" | "south">("north");
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [birthChart, setBirthChart] = useState<BirthChart | null>(null);
  const [loading, setLoading] = useState(false);
  const [birthDetails, setBirthDetails] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    place: "",
  });

  const fetchHoroscope = async (period: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/horoscope?sign=${selectedSign}&period=${period}&region=${region}`,
      );
      const data = await response.json();

      if (data.success) {
        setHoroscope(data.data);
      }
    } catch (error) {
      console.error("Error fetching horoscope:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateBirthChart = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: parseInt(birthDetails.day),
          month: parseInt(birthDetails.month),
          year: parseInt(birthDetails.year),
          hour: parseInt(birthDetails.hour) || 12,
          minute: parseInt(birthDetails.minute) || 0,
          place: birthDetails.place,
          latitude: 0,
          longitude: 0,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBirthChart(data.data);
        setSelectedSign(data.data.zodiacSign);
      }
    } catch (error) {
      console.error("Error generating birth chart:", error);
    } finally {
      setLoading(false);
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    if (!horoscope) return;

    const text = `My ${horoscope.period} horoscope for ${horoscope.sign}: ${horoscope.prediction}`;
    const url = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(text);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareText}`,
      whatsapp: `https://wa.me/?text=${shareText} ${url}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  useEffect(() => {
    if (activeTab !== "personal") {
      fetchHoroscope(activeTab);
    }
  }, [activeTab, selectedSign, region]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Vedic Horoscope
          </h1>
          <p className="text-lg text-gray-600">
            Get your personalized daily, weekly, monthly, and yearly predictions
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Region:
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setRegion("north")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  region === "north"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                North Indian
              </button>
              <button
                onClick={() => setRegion("south")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  region === "south"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                South Indian
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Zodiac Signs
              </h3>
              <div className="space-y-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign}
                    onClick={() => setSelectedSign(sign)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedSign === sign
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {sign}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex overflow-x-auto">
                {["daily", "weekly", "monthly", "yearly", "personal"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Reading the stars...</p>
                </div>
              ) : activeTab === "personal" ? (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Personalized Birth Chart
                  </h3>

                  {/* Birth Details Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Day
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={birthDetails.day}
                        onChange={(e) =>
                          setBirthDetails({
                            ...birthDetails,
                            day: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="DD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Month
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={birthDetails.month}
                        onChange={(e) =>
                          setBirthDetails({
                            ...birthDetails,
                            month: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="MM"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        min="1900"
                        max="2024"
                        value={birthDetails.year}
                        onChange={(e) =>
                          setBirthDetails({
                            ...birthDetails,
                            year: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Place of Birth
                      </label>
                      <input
                        type="text"
                        value={birthDetails.place}
                        onChange={(e) =>
                          setBirthDetails({
                            ...birthDetails,
                            place: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <button
                    onClick={generateBirthChart}
                    disabled={
                      !birthDetails.day ||
                      !birthDetails.month ||
                      !birthDetails.year
                    }
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Generate Birth Chart
                  </button>

                  {birthChart && (
                    <div className="mt-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">
                            Zodiac Information
                          </h4>
                          <p>
                            <strong>Sun Sign:</strong> {birthChart.sunSign}
                          </p>
                          <p>
                            <strong>Moon Sign:</strong> {birthChart.moonSign}
                          </p>
                          <p>
                            <strong>Rising Sign:</strong>{" "}
                            {birthChart.risingSign}
                          </p>
                          <p>
                            <strong>Life Path Number:</strong>{" "}
                            {birthChart.lifePathNumber}
                          </p>
                          <p>
                            <strong>Birth Stone:</strong>{" "}
                            {birthChart.birthStone}
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">
                            Planetary Positions
                          </h4>
                          {Object.entries(birthChart.planetaryPositions).map(
                            ([planet, position]) => (
                              <p key={planet}>
                                <strong>
                                  {planet.charAt(0).toUpperCase() +
                                    planet.slice(1)}
                                  :
                                </strong>{" "}
                                {position}
                              </p>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          Key Characteristics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {birthChart.characteristics.map((char, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : horoscope ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 capitalize">
                        {horoscope.period} Horoscope for {horoscope.sign}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {region === "north" ? "North Indian" : "South Indian"}{" "}
                        Style
                      </p>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => shareOnSocialMedia("twitter")}
                        className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
                        title="Share on Twitter"
                      >
                        <span className="text-sm">Twitter</span>
                      </button>
                      <button
                        onClick={() => shareOnSocialMedia("facebook")}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                        title="Share on Facebook"
                      >
                        <span className="text-sm">Facebook</span>
                      </button>
                      <button
                        onClick={() => shareOnSocialMedia("whatsapp")}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <span className="text-sm">WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Prediction */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <p className="text-lg text-gray-800">
                      {horoscope.prediction}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {horoscope.luckyNumber}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Lucky Number
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                        style={{
                          backgroundColor: horoscope.luckyColor.toLowerCase(),
                        }}
                      ></div>
                      <div className="text-sm text-gray-600">Lucky Color</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {horoscope.mood}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Mood</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {horoscope.compatibility}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Compatibility
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
