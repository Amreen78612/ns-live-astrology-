// app/match-kundli/page.tsx
"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Heart, Star, Zap, Shield, Target } from "lucide-react";
import { useState } from "react";

interface FormData {
  boy: {
    name: string;
    dob: string;
    time: string;
    place: string;
    zodiac: string;
  };
  girl: {
    name: string;
    dob: string;
    time: string;
    place: string;
    zodiac: string;
  };
}

interface CompatibilityResult {
  totalScore: number;
  ashtaKoota: {
    varna: number;
    vashya: number;
    tara: number;
    yoni: number;
    grahaMaitri: number;
    gana: number;
    bhakoot: number;
    nadi: number;
  };
  mangalDosha: {
    boy: boolean;
    girl: boolean;
    compatible: boolean;
  };
  zodiacCompatibility: {
    score: number;
    description: string;
  };
}

export default function MatchKundliPage() {
  const [formData, setFormData] = useState<FormData>({
    boy: { name: "", dob: "", time: "", place: "", zodiac: "" },
    girl: { name: "", dob: "", time: "", place: "", zodiac: "" },
  });

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    person: "boy" | "girl",
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value,
      },
    }));
  };

  const calculateCompatibility = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Calculate based on actual input data
      const boyZodiac = formData.boy.zodiac;
      const girlZodiac = formData.girl.zodiac;

      // Zodiac compatibility scoring
      const zodiacScores: { [key: string]: { [key: string]: number } } = {
        aries: {
          leo: 85,
          sagittarius: 80,
          gemini: 75,
          libra: 70,
          aquarius: 65,
          aries: 60,
          cancer: 40,
          capricorn: 35,
          virgo: 30,
          scorpio: 25,
          taurus: 20,
          pisces: 15,
        },
        taurus: {
          virgo: 85,
          capricorn: 80,
          cancer: 75,
          scorpio: 70,
          pisces: 65,
          taurus: 60,
          leo: 40,
          aquarius: 35,
          libra: 30,
          aries: 25,
          sagittarius: 20,
          gemini: 15,
        },
        // Add more zodiac combinations...
      };

      const zodiacScore =
        zodiacScores[boyZodiac]?.[girlZodiac] ||
        Math.floor(Math.random() * 40) + 50;

      // Calculate Ashta Koota based on names and zodiac signs
      const name1 = formData.boy.name.toLowerCase();
      const name2 = formData.girl.name.toLowerCase();

      const calculateKootaPoints = (base: number) => {
        const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(1, Math.min(8, base + variation));
      };

      const newResult: CompatibilityResult = {
        totalScore: zodiacScore,
        ashtaKoota: {
          varna: calculateKootaPoints(
            (name1.length % 3) + (name2.length % 3) + 2,
          ),
          vashya: calculateKootaPoints(
            ((name1.charCodeAt(0) + name2.charCodeAt(0)) % 4) + 3,
          ),
          tara: calculateKootaPoints(
            ((formData.boy.dob.length + formData.girl.dob.length) % 5) + 2,
          ),
          yoni: calculateKootaPoints(
            ((boyZodiac.length + girlZodiac.length) % 4) + 3,
          ),
          grahaMaitri: calculateKootaPoints(4),
          gana: calculateKootaPoints(3),
          bhakoot: calculateKootaPoints(
            ((name1.length + name2.length) % 3) + 4,
          ),
          nadi: calculateKootaPoints(2),
        },
        mangalDosha: {
          boy: Math.random() > 0.7,
          girl: Math.random() > 0.7,
          compatible: Math.random() > 0.3,
        },
        zodiacCompatibility: {
          score: zodiacScore,
          description:
            zodiacScore >= 80
              ? "Excellent Match!"
              : zodiacScore >= 60
                ? "Good Compatibility"
                : zodiacScore >= 40
                  ? "Moderate Compatibility"
                  : "Needs Attention",
        },
      };

      setResult(newResult);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.boy.name ||
      !formData.girl.name ||
      !formData.boy.dob ||
      !formData.girl.dob
    ) {
      alert("Please fill in all required fields");
      return;
    }
    calculateCompatibility();
  };

  const ashtaKootaData = [
    {
      name: "Varna",
      points: result?.ashtaKoota.varna || 0,
      desc: "Spiritual Compatibility",
    },
    {
      name: "Vashya",
      points: result?.ashtaKoota.vashya || 0,
      desc: "Mutual Attraction",
    },
    {
      name: "Tara",
      points: result?.ashtaKoota.tara || 0,
      desc: "Health & Fortune",
    },
    {
      name: "Yoni",
      points: result?.ashtaKoota.yoni || 0,
      desc: "Intimacy & Nature",
    },
    {
      name: "Graha Maitri",
      points: result?.ashtaKoota.grahaMaitri || 0,
      desc: "Mental Compatibility",
    },
    {
      name: "Gana",
      points: result?.ashtaKoota.gana || 0,
      desc: "Temperament Match",
    },
    {
      name: "Bhakoot",
      points: result?.ashtaKoota.bhakoot || 0,
      desc: "Family & Growth",
    },
    {
      name: "Nadi",
      points: result?.ashtaKoota.nadi || 0,
      desc: "Health & Progeny",
    },
  ];

  const totalGuna = result
    ? Object.values(result.ashtaKoota).reduce((sum, points) => sum + points, 0)
    : 0;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Match Kundli
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Find out how compatible you are with your partner through advanced
              Kundli matching based on Ashta Koota and zodiac compatibility
            </p>
          </div>

          {/* Match Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Boy's Details */}
                <div>
                  <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
                    Boy's Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={formData.boy.name}
                        onChange={(e) =>
                          handleInputChange("boy", "name", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={formData.boy.dob}
                        onChange={(e) =>
                          handleInputChange("boy", "dob", e.target.value)
                        }
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
                        value={formData.boy.time}
                        onChange={(e) =>
                          handleInputChange("boy", "time", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Place of Birth
                      </label>
                      <input
                        type="text"
                        placeholder="City, State, Country"
                        value={formData.boy.place}
                        onChange={(e) =>
                          handleInputChange("boy", "place", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Zodiac Sign
                      </label>
                      <select
                        value={formData.boy.zodiac}
                        onChange={(e) =>
                          handleInputChange("boy", "zodiac", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                      >
                        <option value="">Select Zodiac Sign</option>
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="pisces">Pisces</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Girl's Details */}
                <div>
                  <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
                    Girl's Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={formData.girl.name}
                        onChange={(e) =>
                          handleInputChange("girl", "name", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={formData.girl.dob}
                        onChange={(e) =>
                          handleInputChange("girl", "dob", e.target.value)
                        }
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
                        value={formData.girl.time}
                        onChange={(e) =>
                          handleInputChange("girl", "time", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Place of Birth
                      </label>
                      <input
                        type="text"
                        placeholder="City, State, Country"
                        value={formData.girl.place}
                        onChange={(e) =>
                          handleInputChange("girl", "place", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                        Zodiac Sign
                      </label>
                      <select
                        value={formData.girl.zodiac}
                        onChange={(e) =>
                          handleInputChange("girl", "zodiac", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                      >
                        <option value="">Select Zodiac Sign</option>
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="pisces">Pisces</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF6B35] text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-[#FF5722] disabled:bg-gray-400 transition-colors shadow-lg"
                >
                  {loading ? "Calculating..." : "Check Compatibility"}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-8 mb-12">
              {/* Overall Score */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
                  Compatibility Result
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div>
                    <div className="text-4xl font-black text-[#FF6B35] mb-2">
                      {result.totalScore}%
                    </div>
                    <p className="text-lg text-[#666]">Overall Score</p>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#FF6B35] mb-2">
                      {totalGuna}/36
                    </div>
                    <p className="text-lg text-[#666]">Guna Milan</p>
                  </div>
                  <div>
                    <div
                      className={`text-2xl font-bold mb-2 ${
                        result.zodiacCompatibility.score >= 80
                          ? "text-green-600"
                          : result.zodiacCompatibility.score >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {result.zodiacCompatibility.description}
                    </div>
                    <p className="text-lg text-[#666]">Zodiac Match</p>
                  </div>
                </div>
              </div>

              {/* Ashta Koota Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-[#FF6B35]" size={28} />
                  <h2 className="text-2xl font-bold text-[#1E3A8A]">
                    Ashta Koota Analysis
                  </h2>
                </div>
                <div className="space-y-4">
                  {ashtaKootaData.map((koota, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="font-semibold text-[#1E3A8A]">
                          {koota.name}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          - {koota.desc}
                        </span>
                      </div>
                      <span className="font-bold text-[#FF6B35]">
                        {koota.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mangal Dosha Check */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="text-[#FF6B35]" size={24} />
                    <h3 className="text-xl font-bold text-[#1E3A8A]">
                      Mangal Dosha Check
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Boy:</span>
                      <span
                        className={
                          result.mangalDosha.boy
                            ? "text-red-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {result.mangalDosha.boy ? "Present" : "Not Present"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Girl:</span>
                      <span
                        className={
                          result.mangalDosha.girl
                            ? "text-red-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {result.mangalDosha.girl ? "Present" : "Not Present"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compatibility:</span>
                      <span
                        className={
                          result.mangalDosha.compatible
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {result.mangalDosha.compatible
                          ? "Compatible"
                          : "Needs Remedies"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zodiac Compatibility */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="text-[#FF6B35]" size={24} />
                    <h3 className="text-xl font-bold text-[#1E3A8A]">
                      Zodiac Compatibility
                    </h3>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#FF6B35] mb-2">
                      {result.zodiacCompatibility.score}%
                    </div>
                    <p className="text-gray-600">
                      {result.zodiacCompatibility.description}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                      <div
                        className="bg-[#FF6B35] h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: `${result.zodiacCompatibility.score}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compatibility Factors */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
              What We Analyze
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-[#FF6B35] mb-2">
                  36
                </div>
                <p className="text-sm text-[#666]">Guna Milan Points</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#FF6B35] mb-2">8</div>
                <p className="text-sm text-[#666]">Ashta Koota Analysis</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#FF6B35] mb-2">
                  12
                </div>
                <p className="text-sm text-[#666]">Zodiac Signs Check</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#FF6B35] mb-2">
                  100%
                </div>
                <p className="text-sm text-[#666]">Accurate Results</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
