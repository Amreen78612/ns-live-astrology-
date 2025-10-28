import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Sparkles, Phone, Video, MessageCircle } from "lucide-react";
import Image from "next/image";

const astrologers = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    experience: 25,
    specialization: "Vedic Astrology, KP System",
    languages: "Hindi, English, Telugu",
    rating: 4.8,
    consultations: 5420,
  },
  {
    id: 2,
    name: "Acharya Sharma",
    experience: 18,
    specialization: "Numerology, Vastu",
    languages: "Hindi, English",
    rating: 4.7,
    consultations: 3890,
  },
  {
    id: 3,
    name: "Pt. Sanjay Mishra",
    experience: 30,
    specialization: "Marriage Astrology, Career",
    languages: "Hindi, English, Bengali",
    rating: 4.9,
    consultations: 6750,
  },
  {
    id: 4,
    name: "Dr. Anita Rao",
    experience: 15,
    specialization: "Medical Astrology, Remedies",
    languages: "English, Tamil, Telugu",
    rating: 4.6,
    consultations: 2340,
  },
  {
    id: 5,
    name: "Astro Vikram Singh",
    experience: 20,
    specialization: "Love & Relationships",
    languages: "Hindi, Punjabi, English",
    rating: 4.8,
    consultations: 4120,
  },
  {
    id: 6,
    name: "Jyotish Acharya",
    experience: 12,
    specialization: "Financial Astrology",
    languages: "Hindi, English, Marathi",
    rating: 4.5,
    consultations: 1890,
  },
];

export default function AstrologersPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Our Expert Astrologers
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Connect with India's most experienced and certified astrologers
              for personalized guidance
            </p>
          </div>

          {/* Astrologers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {astrologers.map((astrologer) => (
              <div
                key={astrologer.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
              >
                {/* Profile Image */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-[#6B7280] to-[#4B5563] overflow-hidden border-4 border-[#FF6B35] mb-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white/50"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A8A] text-center">
                    {astrologer.name}
                  </h3>
                  <p className="text-sm text-[#FF6B35] font-semibold">
                    Exp: {astrologer.experience} Years
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-[#666] font-semibold mb-1">
                      Specialization:
                    </p>
                    <p className="text-sm text-[#1E3A8A]">
                      {astrologer.specialization}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold mb-1">
                      Languages:
                    </p>
                    <p className="text-sm text-[#1E3A8A]">
                      {astrologer.languages}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-[#666]">Rating</p>
                      <p className="text-lg font-bold text-[#FF6B35]">
                        ⭐ {astrologer.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#666]">Consultations</p>
                      <p className="text-lg font-bold text-[#1E3A8A]">
                        {astrologer.consultations.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center gap-1 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors">
                    <Phone size={20} />
                    <span className="text-xs">Call</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors">
                    <Video size={20} />
                    <span className="text-xs">Video</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF5722] transition-colors">
                    <MessageCircle size={20} />
                    <span className="text-xs">Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
