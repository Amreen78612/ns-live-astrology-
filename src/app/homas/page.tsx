import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Flame, Clock, Users } from "lucide-react";

const homas = [
  {
    name: "Ganesh Homa",
    duration: "2-3 hours",
    participants: "1-5 people",
    price: "₹3,500",
    benefits: ["Remove Obstacles", "New Beginnings", "Success", "Wisdom"],
    description:
      "Invoke Lord Ganesha for removing obstacles and ensuring success in new ventures",
  },
  {
    name: "Navagraha Homa",
    duration: "3-4 hours",
    participants: "Family",
    price: "₹7,500",
    benefits: ["Planetary Peace", "Health", "Prosperity", "Protection"],
    description:
      "Pacify all nine planets and reduce malefic effects in your horoscope",
  },
  {
    name: "Lakshmi Homa",
    duration: "2-3 hours",
    participants: "1-5 people",
    price: "₹4,500",
    benefits: ["Wealth", "Abundance", "Prosperity", "Success"],
    description:
      "Invoke Goddess Lakshmi for financial abundance and prosperity",
  },
  {
    name: "Durga Homa",
    duration: "3-4 hours",
    participants: "Family",
    price: "₹6,000",
    benefits: ["Protection", "Strength", "Victory", "Courage"],
    description: "Powerful protection from negative energies and enemies",
  },
  {
    name: "Mrityunjaya Homa",
    duration: "4-5 hours",
    participants: "Individual",
    price: "₹11,000",
    benefits: ["Health", "Longevity", "Healing", "Protection"],
    description:
      "For health issues, serious illnesses, and protection from untimely death",
  },
  {
    name: "Sudarshana Homa",
    duration: "3-4 hours",
    participants: "Family",
    price: "₹8,500",
    benefits: ["Protection", "Enemy Removal", "Peace", "Victory"],
    description: "Remove enemies, black magic, and negative forces",
  },
  {
    name: "Ayushya Homa",
    duration: "2-3 hours",
    participants: "Individual",
    price: "₹5,500",
    benefits: ["Longevity", "Health", "Well-being", "Vitality"],
    description: "For longevity, good health, and overall well-being",
  },
  {
    name: "Chandi Homa",
    duration: "5-6 hours",
    participants: "Family",
    price: "₹15,000",
    benefits: ["Power", "Success", "Protection", "Prosperity"],
    description: "Most powerful homa for overall success and protection",
  },
  {
    name: "Saraswati Homa",
    duration: "2-3 hours",
    participants: "Students",
    price: "₹4,000",
    benefits: ["Knowledge", "Education", "Wisdom", "Success"],
    description:
      "For students and those seeking knowledge and academic excellence",
  },
];

export default function HomasPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Homa Services
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Sacred fire rituals performed by expert pandits for various life
              needs and planetary remedies
            </p>
          </div>

          {/* Homas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homas.map((homa, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF0000] flex items-center justify-center mx-auto mb-4">
                  <Flame className="text-white" size={40} />
                </div>

                <h3 className="text-2xl font-bold text-[#1E3A8A] text-center mb-3">
                  {homa.name}
                </h3>

                <p className="text-sm text-[#666] text-center mb-4 leading-relaxed">
                  {homa.description}
                </p>

                <div className="flex items-center justify-between text-sm text-[#666] mb-4 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{homa.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{homa.participants}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#666] mb-2">
                    Key Benefits:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {homa.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#FFF5F0] text-xs font-medium text-[#FF6B35] rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-[#10B981]">
                    {homa.price}
                  </span>
                </div>

                <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors">
                  Book Homa
                </button>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-8">
              What's Included in Every Homa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#FF6B35] text-white flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-[#1E3A8A] mb-2">Expert Pandit</h3>
                <p className="text-sm text-[#666]">Experienced Vedic priest</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#0066FF] text-white flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-[#1E3A8A] mb-2">All Materials</h3>
                <p className="text-sm text-[#666]">
                  Complete puja samagri provided
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-[#1E3A8A] mb-2">
                  Proper Rituals
                </h3>
                <p className="text-sm text-[#666]">Authentic Vedic procedure</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#FFD700] text-white flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-bold text-[#1E3A8A] mb-2">Prasadam</h3>
                <p className="text-sm text-[#666]">
                  Blessed offerings for family
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
