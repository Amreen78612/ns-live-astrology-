import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Gem, Shield, Star } from "lucide-react";

const gemstones = [
  {
    name: "Ruby (Manik)",
    planet: "Sun",
    color: "#E74C3C",
    benefits: ["Leadership", "Confidence", "Health", "Authority"],
    price: "₹2,499 - ₹25,000",
    weight: "3-7 carats",
  },
  {
    name: "Pearl (Moti)",
    planet: "Moon",
    color: "#ECF0F1",
    benefits: ["Peace of Mind", "Emotional Balance", "Intuition", "Calmness"],
    price: "₹1,500 - ₹15,000",
    weight: "5-10 carats",
  },
  {
    name: "Red Coral (Moonga)",
    planet: "Mars",
    color: "#C0392B",
    benefits: ["Courage", "Energy", "Vitality", "Blood Circulation"],
    price: "₹800 - ₹8,000",
    weight: "6-9 carats",
  },
  {
    name: "Emerald (Panna)",
    planet: "Mercury",
    color: "#27AE60",
    benefits: ["Intelligence", "Communication", "Business", "Memory"],
    price: "₹3,000 - ₹30,000",
    weight: "3-6 carats",
  },
  {
    name: "Yellow Sapphire (Pukhraj)",
    planet: "Jupiter",
    color: "#F39C12",
    benefits: ["Wisdom", "Wealth", "Marriage", "Children"],
    price: "₹5,000 - ₹50,000",
    weight: "3-5 carats",
  },
  {
    name: "Diamond (Heera)",
    planet: "Venus",
    color: "#ECF0F1",
    benefits: ["Luxury", "Relationships", "Beauty", "Prosperity"],
    price: "₹25,000 - ₹5,00,000",
    weight: "1-3 carats",
  },
  {
    name: "Blue Sapphire (Neelam)",
    planet: "Saturn",
    color: "#34495E",
    benefits: ["Discipline", "Focus", "Longevity", "Success"],
    price: "₹10,000 - ₹1,00,000",
    weight: "4-7 carats",
  },
  {
    name: "Hessonite (Gomed)",
    planet: "Rahu",
    color: "#D68910",
    benefits: ["Protection", "Success", "Clarity", "Mental Strength"],
    price: "₹1,200 - ₹12,000",
    weight: "5-8 carats",
  },
  {
    name: "Cat's Eye (Lehsunia)",
    planet: "Ketu",
    color: "#7D6608",
    benefits: ["Intuition", "Spirituality", "Protection", "Hidden Knowledge"],
    price: "₹2,000 - ₹20,000",
    weight: "5-7 carats",
  },
];

export default function GemstonesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gem className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Buy Gemstones
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto mb-4">
              Authentic certified gemstones for planetary remedies
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-[#888]">
              <div className="flex items-center gap-2">
                <Shield className="text-[#10B981]" size={18} />
                <span>Lab Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-[#FFD700]" size={18} />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <Gem className="text-[#FF6B35]" size={18} />
                <span>Energized</span>
              </div>
            </div>
          </div>

          {/* Gemstones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gemstones.map((gemstone, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${gemstone.color}, ${gemstone.color}dd)`,
                    boxShadow: `0 8px 24px ${gemstone.color}40`,
                  }}
                >
                  <Gem className="text-white" size={60} />
                </div>

                <h3 className="text-2xl font-bold text-[#1E3A8A] text-center mb-2">
                  {gemstone.name}
                </h3>
                <p className="text-center text-[#FF6B35] font-semibold mb-4">
                  Planet: {gemstone.planet}
                </p>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#666] mb-2">
                    Benefits:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {gemstone.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#F8F9FA] text-xs font-medium text-[#666] rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#666]">Weight Range:</span>
                    <span className="font-semibold">{gemstone.weight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#666]">Price Range:</span>
                    <span className="font-semibold text-[#10B981]">
                      {gemstone.price}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors">
                  Consult & Buy
                </button>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-6">
              Why Choose Our Gemstones?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="text-[#10B981] mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                  Lab Certified
                </h3>
                <p className="text-[#666]">
                  All gemstones come with authentic lab certification
                </p>
              </div>
              <div className="text-center">
                <Star className="text-[#FFD700] mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                  Energized & Purified
                </h3>
                <p className="text-[#666]">
                  Properly energized with Vedic mantras before delivery
                </p>
              </div>
              <div className="text-center">
                <Gem className="text-[#FF6B35] mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                  Expert Guidance
                </h3>
                <p className="text-[#666]">
                  Free consultation to choose the right gemstone
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
