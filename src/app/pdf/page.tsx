import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { FileText, Download, Eye } from "lucide-react";

const pdfCategories = [
  {
    title: "Birth Chart PDFs",
    items: [
      {
        name: "Complete Vedic Birth Chart",
        pages: 45,
        size: "2.5 MB",
        price: "Free",
      },
      {
        name: "KP System Birth Chart",
        pages: 38,
        size: "2.1 MB",
        price: "Free",
      },
      {
        name: "Detailed Planetary Positions",
        pages: 25,
        size: "1.8 MB",
        price: "Free",
      },
    ],
  },
  {
    title: "Prediction Reports",
    items: [
      {
        name: "Life Prediction Report (10 Years)",
        pages: 120,
        size: "5.2 MB",
        price: "₹999",
      },
      {
        name: "Career & Finance Forecast",
        pages: 75,
        size: "3.8 MB",
        price: "₹599",
      },
      {
        name: "Marriage Compatibility Report",
        pages: 55,
        size: "2.9 MB",
        price: "₹499",
      },
      {
        name: "Health & Wellness Analysis",
        pages: 60,
        size: "3.1 MB",
        price: "₹499",
      },
    ],
  },
  {
    title: "Remedies & Solutions",
    items: [
      {
        name: "Planetary Remedies Guide",
        pages: 95,
        size: "4.2 MB",
        price: "₹399",
      },
      {
        name: "Gemstone Recommendation Report",
        pages: 42,
        size: "2.4 MB",
        price: "₹299",
      },
      {
        name: "Mantra & Yantra Guide",
        pages: 68,
        size: "3.5 MB",
        price: "₹349",
      },
    ],
  },
  {
    title: "Educational Resources",
    items: [
      {
        name: "KP Astrology Basics (eBook)",
        pages: 185,
        size: "8.5 MB",
        price: "₹799",
      },
      {
        name: "Nadi Astrology Guide",
        pages: 142,
        size: "6.8 MB",
        price: "₹699",
      },
      {
        name: "Vedic Predictive Techniques",
        pages: 210,
        size: "9.2 MB",
        price: "₹899",
      },
    ],
  },
];

export default function PDFPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Astrology PDFs & Reports
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Download comprehensive astrology reports, charts, and educational
              resources
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {pdfCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 pb-3 border-b-2 border-[#FF6B35]">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border-2 border-[#E5E7EB] rounded-xl p-6 hover:border-[#FF6B35] hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-20 bg-gradient-to-b from-[#FF6B35] to-[#FF8C42] rounded-lg flex items-center justify-center">
                          <FileText className="text-white" size={32} />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            item.price === "Free"
                              ? "bg-[#10B981] text-white"
                              : "bg-[#FFF5F0] text-[#FF6B35]"
                          }`}
                        >
                          {item.price}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1E3A8A] mb-3 line-clamp-2 min-h-[56px]">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-[#666] mb-4">
                        <span>{item.pages} pages</span>
                        <span>{item.size}</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-[#FF6B35] text-white py-2 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2">
                          <Download size={16} />
                          {item.price === "Free" ? "Download" : "Buy"}
                        </button>
                        <button className="px-4 bg-[#F8F9FA] text-[#666] rounded-lg hover:bg-[#E5E7EB] transition-colors">
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Report CTA */}
          <div className="mt-16 bg-gradient-to-r from-[#1E3A8A] to-[#0F1F4A] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <FileText className="mx-auto mb-4" size={64} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Custom Astrology Report?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Get a personalized astrology report tailored to your specific
              questions and concerns. Our expert astrologers will prepare a
              detailed analysis just for you.
            </p>
            <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FF5722] transition-colors">
              Request Custom Report
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
