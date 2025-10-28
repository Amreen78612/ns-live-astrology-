import { Sparkles } from "lucide-react";

const consultants = [
  { name: "MANGALAMPALLI SESHRAO", borderColor: "#FF6B35" },
  { name: "Dr.PASUPULA ARUN MAHESH", borderColor: "#FF0000" },
  { name: "S V RAMANA RAO", borderColor: "#00CED1" },
  { name: "SV RAGHUBABU", borderColor: "#FF6B35" },
  { name: "Dr.AKULA. RAJANI PRAVEEN KUMAR", borderColor: "#FF0000" },
  { name: "Dr.K. KRISHNAMURTHY", borderColor: "#00CED1" },
];

export const VastuConsultants = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} className="text-[#FF6B35]" />
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wide">
              Vastu Consultation
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-6">
            Precision AUTOCAD Architectural Planning
          </h2>
          <p className="text-lg text-[#333] leading-relaxed max-w-4xl mx-auto">
            We specialize in creating precise architectural plans using AUTOCAD
            technology for residential homes, apartments, office spaces, and
            commercial establishments. Our expert Vastu consultants ensure that
            your space is designed according to ancient Vastu principles while
            incorporating modern architectural standards for optimal energy flow
            and prosperity.
          </p>
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className="relative w-56 h-56 rounded-full flex items-center justify-center mb-6 bg-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform"
                style={{
                  border: `4px dashed ${consultant.borderColor}`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-[#6B7280] to-[#4B5563] flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white/50"
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
              <h3 className="text-lg font-bold text-[#FF6B35] text-center uppercase">
                {consultant.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
