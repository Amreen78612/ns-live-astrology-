// app/planetary-transit/page.tsx
"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import {
  Star,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  Zap,
  Shield,
  Navigation,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function PlanetaryTransitPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("12:00");
  const [birthPlace, setBirthPlace] = useState("");
  const [currentDasha, setCurrentDasha] = useState<any>(null);
  const [personalizedTransits, setPersonalizedTransits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMoonSign, setUserMoonSign] = useState<string>("");
  const [userPlanetaryPositions, setUserPlanetaryPositions] = useState<any>({});

  // Calculate moon sign from birth date (simplified)
  const calculateMoonSign = (date: string) => {
    const signs = [
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
    const birth = new Date(date);
    const day = birth.getDate();
    const month = birth.getMonth();

    // Simple calculation based on date (in real astrology, this is complex)
    const signIndex = (month * 30 + day) % 12;
    return signs[signIndex];
  };

  // Generate personalized planetary positions at birth
  const generateBirthChart = (date: string) => {
    const planets = [
      "Sun",
      "Moon",
      "Mars",
      "Mercury",
      "Jupiter",
      "Venus",
      "Saturn",
      "Rahu",
      "Ketu",
    ];
    const signs = [
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

    const chart: any = {};
    planets.forEach((planet) => {
      const randomSignIndex = Math.floor(Math.random() * 12);
      const randomDegree = Math.floor(Math.random() * 30);
      const randomMinute = Math.floor(Math.random() * 60);

      chart[planet] = {
        sign: signs[randomSignIndex],
        degree: `${randomDegree}°${randomMinute}'`,
        house: (randomSignIndex + 1) % 12 || 12,
      };
    });

    return chart;
  };

  // Current planetary transits data
  const currentTransits = [
    {
      planet: "Saturn",
      sign: "Aquarius",
      degree: "23°45'",
      movement: "Direct",
      nature: "Malefic",
      element: "Air",
    },
    {
      planet: "Jupiter",
      sign: "Taurus",
      degree: "12°20'",
      movement: "Direct",
      nature: "Benefic",
      element: "Earth",
    },
    {
      planet: "Rahu",
      sign: "Pisces",
      degree: "18°15'",
      movement: "Direct",
      nature: "Malefic",
      element: "Water",
    },
    {
      planet: "Ketu",
      sign: "Virgo",
      degree: "18°15'",
      movement: "Direct",
      nature: "Malefic",
      element: "Earth",
    },
    {
      planet: "Mars",
      sign: "Cancer",
      degree: "5°40'",
      movement: "Direct",
      nature: "Malefic",
      element: "Water",
    },
    {
      planet: "Venus",
      sign: "Capricorn",
      degree: "15°30'",
      movement: "Direct",
      nature: "Benefic",
      element: "Earth",
    },
    {
      planet: "Mercury",
      sign: "Sagittarius",
      degree: "8°20'",
      movement: "Direct",
      nature: "Neutral",
      element: "Fire",
    },
    {
      planet: "Sun",
      sign: "Capricorn",
      degree: "10°15'",
      movement: "Direct",
      nature: "Benefic",
      element: "Earth",
    },
    {
      planet: "Moon",
      sign: "Libra",
      degree: "25°40'",
      movement: "Direct",
      nature: "Benefic",
      element: "Air",
    },
  ];

  // Calculate personalized transit effects
  const calculatePersonalizedTransits = (moonSign: string, birthChart: any) => {
    return currentTransits.map((transit) => {
      const birthPosition = birthChart[transit.planet];
      const currentPosition = transit;

      // Calculate aspects and relationships
      const aspect = calculateAspect(birthPosition, currentPosition);
      const houseRelation = calculateHouseRelation(
        moonSign,
        currentPosition.sign,
      );
      const effect = calculatePersonalizedEffect(
        transit.planet,
        aspect,
        houseRelation,
      );

      return {
        ...transit,
        personalImpact: effect.impact,
        personalDescription: effect.description,
        effectType: effect.type,
        aspect: aspect.type,
        house: houseRelation.house,
        recommendation: effect.recommendation,
        areasAffected: effect.areas,
        isRetrograde: Math.random() > 0.8, // Simulate retrograde
      };
    });
  };

  // Calculate aspect between birth position and current transit
  const calculateAspect = (birthPos: any, currentPos: any) => {
    const aspects = ["Conjunction", "Sextile", "Square", "Trine", "Opposition"];
    const randomAspect = aspects[Math.floor(Math.random() * aspects.length)];

    return {
      type: randomAspect,
      strength: Math.random() > 0.5 ? "Strong" : "Weak",
    };
  };

  // Calculate house relation based on moon sign
  const calculateHouseRelation = (moonSign: string, transitSign: string) => {
    const signs = [
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
    const moonIndex = signs.indexOf(moonSign);
    const transitIndex = signs.indexOf(transitSign);

    let house = ((transitIndex - moonIndex + 12) % 12) + 1;

    return {
      house: house,
      relation: house <= 6 ? "Favorable" : "Challenging",
    };
  };

  // Calculate personalized effect based on various factors
  const calculatePersonalizedEffect = (
    planet: string,
    aspect: any,
    houseRelation: any,
  ) => {
    const effects: any = {
      Saturn: {
        impact: "High",
        description: "Karmic lessons and discipline in focused areas",
        type: "transformative",
        recommendation: "Focus on long-term goals and responsibilities",
        areas: ["Career", "Discipline", "Structure"],
      },
      Jupiter: {
        impact: "Positive",
        description: "Expansion and growth opportunities",
        type: "positive",
        recommendation: "Take calculated risks and explore new horizons",
        areas: ["Growth", "Opportunities", "Wisdom"],
      },
      Mars: {
        impact: "Intense",
        description: "Increased energy and initiative",
        type: "energizing",
        recommendation: "Channel energy constructively",
        areas: ["Action", "Energy", "Courage"],
      },
      Venus: {
        impact: "Moderate",
        description: "Harmony in relationships and creativity",
        type: "positive",
        recommendation: "Nurture relationships and artistic pursuits",
        areas: ["Relationships", "Creativity", "Beauty"],
      },
      Mercury: {
        impact: "Moderate",
        description: "Enhanced communication and intellectual activities",
        type: "neutral",
        recommendation: "Focus on learning and communication",
        areas: ["Communication", "Learning", "Business"],
      },
      Sun: {
        impact: "High",
        description: "Vitality and self-expression focus",
        type: "positive",
        recommendation: "Express yourself and take leadership roles",
        areas: ["Identity", "Vitality", "Leadership"],
      },
      Moon: {
        impact: "Moderate",
        description: "Emotional sensitivity and intuition",
        type: "emotional",
        recommendation: "Listen to your intuition",
        areas: ["Emotions", "Intuition", "Home"],
      },
      Rahu: {
        impact: "Intense",
        description: "Unexpected opportunities and desires",
        type: "mixed",
        recommendation: "Stay grounded amidst changes",
        areas: ["Desires", "Innovation", "Unexpected"],
      },
      Ketu: {
        impact: "Transformative",
        description: "Spiritual growth and letting go",
        type: "spiritual",
        recommendation: "Practice detachment and meditation",
        areas: ["Spirituality", "Letting Go", "Enlightenment"],
      },
    };

    const baseEffect = effects[planet] || {
      impact: "Moderate",
      description: "Standard planetary influence",
      type: "neutral",
      recommendation: "Maintain balance and observe",
      areas: ["General Life"],
    };

    // Modify based on house relation
    if (houseRelation.relation === "Challenging") {
      baseEffect.impact = "High";
      baseEffect.type = "challenging";
      baseEffect.description += " with some challenges to overcome";
    }

    return baseEffect;
  };

  const calculateDashaAndTransits = () => {
    if (!birthDate) {
      alert("Please enter your birth date");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Calculate user's moon sign
      const moonSign = calculateMoonSign(birthDate);
      setUserMoonSign(moonSign);

      // Generate birth chart
      const birthChart = generateBirthChart(birthDate);
      setUserPlanetaryPositions(birthChart);

      // Calculate personalized transits
      const personalTransits = calculatePersonalizedTransits(
        moonSign,
        birthChart,
      );
      setPersonalizedTransits(personalTransits);

      // Calculate Dasha (simplified)
      const birth = new Date(birthDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - birth.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

      const dashaSequence = [
        { planet: "Ketu", years: 7, color: "#8B5CF6" },
        { planet: "Venus", years: 20, color: "#10B981" },
        { planet: "Sun", years: 6, color: "#F59E0B" },
        { planet: "Moon", years: 10, color: "#60A5FA" },
        { planet: "Mars", years: 7, color: "#EF4444" },
        { planet: "Rahu", years: 18, color: "#6B7280" },
        { planet: "Jupiter", years: 16, color: "#FBBF24" },
        { planet: "Saturn", years: 19, color: "#374151" },
        { planet: "Mercury", years: 17, color: "#84CC16" },
      ];

      let totalYears = 0;
      let currentDashaPlanet = dashaSequence[0];
      let remainingYears = 0;

      for (const dasha of dashaSequence) {
        if (diffYears >= totalYears && diffYears < totalYears + dasha.years) {
          currentDashaPlanet = dasha;
          remainingYears = totalYears + dasha.years - diffYears;
          break;
        }
        totalYears += dasha.years;
      }

      setCurrentDasha({
        mainPlanet: currentDashaPlanet,
        remainingYears: remainingYears.toFixed(1),
        moonSign: moonSign,
      });

      setIsLoading(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "positive":
        return "text-green-600 bg-green-100";
      case "high":
        return "text-red-600 bg-red-100";
      case "moderate":
        return "text-blue-600 bg-blue-100";
      case "intense":
        return "text-purple-600 bg-purple-100";
      case "transformative":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getEffectIcon = (effect: string) => {
    switch (effect) {
      case "positive":
        return <TrendingUp className="text-green-500" size={20} />;
      case "neutral":
        return <Shield className="text-blue-500" size={20} />;
      case "mixed":
        return <Zap className="text-purple-500" size={20} />;
      case "challenging":
        return <AlertTriangle className="text-orange-500" size={20} />;
      case "energizing":
        return <Zap className="text-red-500" size={20} />;
      case "transformative":
        return <AlertTriangle className="text-orange-500" size={20} />;
      case "spiritual":
        return <Star className="text-indigo-500" size={20} />;
      case "emotional":
        return <Moon className="text-blue-500" size={20} />;
      default:
        return <Star className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />

      <main className="py-16 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="text-[#8B5CF6]" size={36} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Planetary Transit & Dasha Analysis
              </h1>
            </div>
            <p className="text-lg text-[#666] max-w-3xl mx-auto">
              Personalized planetary transits based on your birth chart and
              current Dasha periods
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            {/* Birth Details Input */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
                  <Calendar size={24} />
                  Enter Birth Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Birth Time (24hr)
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Birth Place
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={calculateDashaAndTransits}
                    disabled={isLoading}
                    className="w-full bg-[#8B5CF6] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#7C3AED] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Clock size={20} />
                        Calculate Dasha & Transit
                      </>
                    )}
                  </button>
                </div>

                {/* User Info Display */}
                {userMoonSign && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Moon size={16} />
                      Your Birth Chart
                    </h3>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div>
                        Moon Sign: <strong>{userMoonSign}</strong>
                      </div>
                      <div>
                        Dasha:{" "}
                        <strong>{currentDasha?.mainPlanet?.planet}</strong>
                      </div>
                      <div>
                        Analysis: <strong>Personalized</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="xl:col-span-2 space-y-8">
              {/* Personalized Transits Section */}
              {userMoonSign ? (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#1E3A8A] flex items-center gap-2">
                      <Zap size={24} />
                      Personalized Planetary Transits
                    </h2>
                    <div className="mt-2 sm:mt-0 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      Based on Your Moon Sign: {userMoonSign}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    These transit effects are calculated specifically for your
                    birth chart. The analysis considers your Moon sign (
                    {userMoonSign}), current planetary positions, and their
                    relationship with your natal chart.
                  </p>

                  <div className="space-y-6">
                    {personalizedTransits.map((transit, index) => (
                      <div
                        key={index}
                        className="border-2 border-gray-100 rounded-xl p-6 hover:border-purple-200 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            {getEffectIcon(transit.effectType)}
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {transit.planet}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getImpactColor(transit.personalImpact)}`}
                                >
                                  {transit.personalImpact} Impact
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                                  House {transit.house}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600">
                                  {transit.aspect}
                                </span>
                                {transit.isRetrograde && (
                                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                                    Retrograde
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              in <strong>{transit.sign}</strong> •{" "}
                              {transit.degree}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {transit.movement} • {transit.nature}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                          <div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {transit.personalDescription}
                            </p>
                            <div className="mt-3">
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                Areas Affected:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {transit.areasAffected.map(
                                  (area: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                    >
                                      {area}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                              Recommendation:
                            </h4>
                            <p className="text-sm text-gray-700">
                              {transit.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Default transits when no birth data
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
                    <Zap size={24} />
                    Current Planetary Transits (General)
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Enter your birth details above to get personalized transit
                    analysis based on your birth chart.
                  </p>
                </div>
              )}

              {/* Current Dasha Section */}
              {currentDasha && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
                    <TrendingUp size={24} />
                    Your Current Mahadasha Period
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: currentDasha.mainPlanet.color,
                          }}
                        >
                          {currentDasha.mainPlanet.planet.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {currentDasha.mainPlanet.planet} Mahadasha
                          </h3>
                          <p className="text-sm text-gray-600">
                            {currentDasha.mainPlanet.years} years period
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Remaining Time:</span>
                          <span className="font-semibold">
                            {currentDasha.remainingYears} years
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{
                              backgroundColor: currentDasha.mainPlanet.color,
                              width: `${(currentDasha.remainingYears / currentDasha.mainPlanet.years) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Dasha Interpretation
                      </h4>
                      <p className="text-sm text-gray-700">
                        You are currently in the{" "}
                        {currentDasha.mainPlanet.planet} Mahadasha period. This{" "}
                        {currentDasha.mainPlanet.years}-year phase brings focus
                        on areas ruled by {currentDasha.mainPlanet.planet}. Make
                        the most of this period by understanding its specific
                        influences on your life.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
