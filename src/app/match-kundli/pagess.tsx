import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Heart } from "lucide-react";

export default function MatchKundliPage() {
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
              Find out how compatible you are with your partner through Kundli
              matching
            </p>
          </div>

          {/* Match Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Boy's Details */}
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center">
                  Boy's Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Time of Birth
                    </label>
                    <input
                      type="time"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
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
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                      Time of Birth
                    </label>
                    <input
                      type="time"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-[#FF6B35] text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-[#FF5722] transition-colors shadow-lg"
              >
                Check Compatibility
              </button>
            </div>
          </div>

          {/* Compatibility Factors */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
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
                <p className="text-sm text-[#666]">Kuta Analysis</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#FF6B35] mb-2">
                  12
                </div>
                <p className="text-sm text-[#666]">Mangal Dosha Check</p>
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
