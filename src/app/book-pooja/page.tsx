import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Flame, Calendar, Users, Clock } from "lucide-react";

const poojas = [
  {
    id: 1,
    name: "Satyanarayan Pooja",
    duration: "2-3 Hours",
    pandits: "2 Pandits",
    price: "₹5,999",
    description: "For prosperity, peace, and removal of obstacles",
  },
  {
    id: 2,
    name: "Griha Pravesh Pooja",
    duration: "3-4 Hours",
    pandits: "3 Pandits",
    price: "₹8,999",
    description: "Auspicious housewarming ceremony for new home",
  },
  {
    id: 3,
    name: "Rudrabhishek Pooja",
    duration: "2 Hours",
    pandits: "2 Pandits",
    price: "₹7,499",
    description: "Lord Shiva worship for health and success",
  },
  {
    id: 4,
    name: "Lakshmi Pooja",
    duration: "2 Hours",
    pandits: "1 Pandit",
    price: "₹4,999",
    description: "For wealth, prosperity, and abundance",
  },
  {
    id: 5,
    name: "Navagraha Shanti Pooja",
    duration: "4-5 Hours",
    pandits: "3 Pandits",
    price: "₹11,999",
    description: "To pacify nine planets and remove malefic effects",
  },
  {
    id: 6,
    name: "Ganesh Pooja",
    duration: "1-2 Hours",
    pandits: "1 Pandit",
    price: "₹3,499",
    description: "Removal of obstacles and new beginnings",
  },
];

export default function BookPoojaPage() {
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
                Book A Pooja
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Perform sacred poojas and homas with our expert pandits at your
              home or temple
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl p-8 mb-12 text-white">
            <h2 className="text-2xl font-bold text-center mb-6">
              Why Book With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="mx-auto mb-2" size={40} />
                <h3 className="font-semibold mb-1">Expert Pandits</h3>
                <p className="text-sm text-white/90">
                  Verified and experienced
                </p>
              </div>
              <div className="text-center">
                <Calendar className="mx-auto mb-2" size={40} />
                <h3 className="font-semibold mb-1">Flexible Dates</h3>
                <p className="text-sm text-white/90">
                  Book as per your convenience
                </p>
              </div>
              <div className="text-center">
                <Clock className="mx-auto mb-2" size={40} />
                <h3 className="font-semibold mb-1">On-Time Service</h3>
                <p className="text-sm text-white/90">
                  Punctual and professional
                </p>
              </div>
              <div className="text-center">
                <Flame className="mx-auto mb-2" size={40} />
                <h3 className="font-semibold mb-1">All Materials</h3>
                <p className="text-sm text-white/90">
                  Complete pooja samagri included
                </p>
              </div>
            </div>
          </div>

          {/* Poojas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojas.map((pooja) => (
              <div
                key={pooja.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-[#1E3A8A] p-6 text-white">
                  <Flame className="mb-3" size={32} />
                  <h3 className="text-xl font-bold mb-2">{pooja.name}</h3>
                  <p className="text-sm text-white/80">{pooja.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666] flex items-center gap-2">
                        <Clock size={16} className="text-[#FF6B35]" />
                        Duration
                      </span>
                      <span className="font-semibold text-[#1E3A8A]">
                        {pooja.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666] flex items-center gap-2">
                        <Users size={16} className="text-[#FF6B35]" />
                        Required
                      </span>
                      <span className="font-semibold text-[#1E3A8A]">
                        {pooja.pandits}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
                      <span className="text-[#666]">Starting From</span>
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        {pooja.price}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Pooja */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              Need a Custom Pooja?
            </h2>
            <p className="text-[#666] mb-6">
              Can't find what you're looking for? Contact us for customized
              pooja arrangements
            </p>
            <button className="bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0F1F4A] transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
