import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Users, Star, Phone } from "lucide-react";

const pandits = [
  {
    name: "Pt. Rajesh Kumar Sharma",
    experience: 25,
    specialty: "Vedic Rituals",
    rating: 4.9,
    consultations: 1240,
  },
  {
    name: "Acharya Sanjay Mishra",
    experience: 18,
    specialty: "Pooja & Homas",
    rating: 4.8,
    consultations: 980,
  },
  {
    name: "Pt. Ramesh Shastri",
    experience: 30,
    specialty: "Wedding Ceremonies",
    rating: 4.9,
    consultations: 1560,
  },
  {
    name: "Guru Anand Dikshit",
    experience: 22,
    specialty: "Griha Pravesh",
    rating: 4.7,
    consultations: 876,
  },
  {
    name: "Pt. Vikram Pandey",
    experience: 15,
    specialty: "Satyanarayan Pooja",
    rating: 4.8,
    consultations: 745,
  },
  {
    name: "Acharya Manoj Joshi",
    experience: 20,
    specialty: "Navagraha Homas",
    rating: 4.9,
    consultations: 1120,
  },
  {
    name: "Pt. Suresh Tripathi",
    experience: 28,
    specialty: "Mundan Ceremony",
    rating: 4.8,
    consultations: 965,
  },
  {
    name: "Guru Prakash Tiwari",
    experience: 16,
    specialty: "Durga Pooja",
    rating: 4.7,
    consultations: 680,
  },
  {
    name: "Pt. Narayan Das",
    experience: 24,
    specialty: "Temple Rituals",
    rating: 4.9,
    consultations: 1340,
  },
  {
    name: "Acharya Mohan Sharma",
    experience: 19,
    specialty: "Naming Ceremony",
    rating: 4.8,
    consultations: 820,
  },
  {
    name: "Pt. Krishna Bhatt",
    experience: 21,
    specialty: "Lakshmi Pooja",
    rating: 4.9,
    consultations: 1050,
  },
  {
    name: "Guru Ravi Upadhyay",
    experience: 17,
    specialty: "Ganesh Homa",
    rating: 4.7,
    consultations: 715,
  },
];

export default function PanditsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Our Expert Pandits
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Experienced and knowledgeable pandits/purohits to perform all
              types of poojas and homas
            </p>
          </div>

          {/* Pandits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pandits.map((pandit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2 text-center"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#6B7280] to-[#4B5563] mx-auto mb-4 border-4 border-white shadow-lg"></div>

                <h3 className="text-lg font-bold text-[#1E3A8A] mb-1 hover:text-[#FF6B35] transition-colors">
                  {pandit.name}
                </h3>

                <p className="text-sm text-[#FF6B35] font-semibold mb-2">
                  {pandit.specialty}
                </p>

                <p className="text-xs text-[#666] mb-3">
                  Exp: {pandit.experience} Yr(s)
                </p>

                <div className="flex items-center justify-center gap-4 mb-4 text-xs text-[#666]">
                  <div className="flex items-center gap-1">
                    <Star className="text-[#FFD700] fill-[#FFD700]" size={14} />
                    <span className="font-semibold">{pandit.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{pandit.consultations}+</span>
                  </div>
                </div>

                <button className="w-full bg-[#FF6B35] text-white py-2 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2">
                  <Phone size={16} />
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Pandit for Your Special Occasion?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Book our expert pandits for weddings, poojas, homas, and all
              religious ceremonies. Available at your location with all puja
              materials.
            </p>
            <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#F8F9FA] transition-colors">
              Contact Us Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
