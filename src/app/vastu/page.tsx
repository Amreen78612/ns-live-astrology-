import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Home, Building2, Store, Compass } from "lucide-react";

const vastuServices = [
  {
    title: "Residential Vastu Consultation",
    icon: Home,
    description:
      "Complete Vastu analysis for homes, apartments, and villas with detailed architectural planning",
    price: "₹5,999",
    features: [
      "Site Visit",
      "Detailed Report",
      "Remedy Suggestions",
      "Follow-up Support",
    ],
  },
  {
    title: "Commercial Vastu Planning",
    icon: Building2,
    description:
      "Vastu solutions for offices, corporate buildings, and commercial complexes",
    price: "₹9,999",
    features: [
      "AutoCAD Planning",
      "Energy Flow Analysis",
      "Layout Optimization",
      "Implementation Guide",
    ],
  },
  {
    title: "Shop & Showroom Vastu",
    icon: Store,
    description:
      "Specialized Vastu for retail spaces, shops, and showrooms to boost business",
    price: "₹7,499",
    features: [
      "Entrance Planning",
      "Product Placement",
      "Cash Counter Direction",
      "Color Consultation",
    ],
  },
  {
    title: "Plot Selection & Analysis",
    icon: Compass,
    description:
      "Expert guidance for selecting the perfect plot based on Vastu principles",
    price: "₹3,999",
    features: [
      "Direction Analysis",
      "Soil Quality Check",
      "Surroundings Assessment",
      "Purchase Advice",
    ],
  },
];

const consultants = [
  {
    name: "MANGALAMPALLI SESHRAO",
    experience: "25+ years",
    specialty: "Residential Vastu",
  },
  {
    name: "Dr. PASUPULA ARUN MAHESH",
    experience: "20+ years",
    specialty: "Commercial Planning",
  },
  {
    name: "S V RAMANA RAO",
    experience: "30+ years",
    specialty: "Industrial Vastu",
  },
  {
    name: "SV RAGHUBABU",
    experience: "18+ years",
    specialty: "Plot Selection",
  },
  {
    name: "Dr. AKULA RAJANI PRAVEEN KUMAR",
    experience: "22+ years",
    specialty: "AutoCAD Planning",
  },
  {
    name: "Dr. K. KRISHNAMURTHY",
    experience: "28+ years",
    specialty: "Temple Vastu",
  },
];

export default function VastuPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-4">
              Vastu Consultation
            </h1>
            <p className="text-xl text-[#666] mb-4">
              Precision AUTOCAD Architectural Planning
            </p>
            <p className="text-base text-[#888] max-w-3xl mx-auto">
              Expert Vastu consultation for homes, apartments, offices,
              commercial spaces, and more. Our certified consultants provide
              detailed architectural planning with AutoCAD precision.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {vastuServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-[#FF6B35] flex items-center justify-center mb-6">
                  <service.icon className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#666] mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-3xl font-bold text-[#FF6B35] mb-4">
                  {service.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-[#666]"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors">
                  Book Consultation
                </button>
              </div>
            ))}
          </div>

          {/* Consultants Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-8">
              Our Expert Vastu Consultants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-[#F8F9FA] hover:bg-[#FF6B35] hover:text-white transition-all group"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#6B7280] to-[#4B5563] mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold text-[#FF6B35] group-hover:text-white mb-1">
                    {consultant.name}
                  </h3>
                  <p className="text-sm text-[#666] group-hover:text-white mb-1">
                    {consultant.experience}
                  </p>
                  <p className="text-xs text-[#888] group-hover:text-white">
                    {consultant.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
