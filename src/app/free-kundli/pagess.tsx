import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Sparkles } from "lucide-react";

export default function FreeKundliPage() {
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

          {/* Kundli Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8 text-center">
              Enter Your Birth Details
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Gender
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors">
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#1E3A8A] mb-2">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city, state, country"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-[#FF6B35] text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-[#FF5722] transition-colors shadow-lg"
                >
                  Generate Kundli
                </button>
              </div>
            </form>
          </div>

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
