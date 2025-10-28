import Image from "next/image";
import { Sparkles } from "lucide-react";

const features = [
  {
    title: "Today's Panchangam",
    description:
      "You can verify whether a day is good for a particular activity once can refer to the Daily Panchangam!",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/ser1-6.png",
    borderColor: "#FFD700",
  },
  {
    title: "Free Kundli",
    description:
      "Generate your free online kundli report from application and it can help you predict the future for yourself by reading the birth chart.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/ser2-7.png",
    borderColor: "#1E3A8A",
  },
  {
    title: "Match Kundli",
    description:
      "Love could be confusing, but only until you haven't found how compatible you two are for each other.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/icons/icon-99-1.png",
    borderColor: "#FF6B35",
  },
];

export const ComplimentaryFeatures = () => {
  return (
    <section className="py-16 px-8 bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} className="text-[#FF6B35]" />
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">
              NS LIVE ASTRO
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
            COMPLIMENTARY FEATURES
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
                  style={{
                    border: `3px dashed ${feature.borderColor}`,
                  }}
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#1E3A8A] mb-4">
                  {feature.title}
                </h3>
                <div className="w-20 h-1 bg-[#FF6B35] rounded-full mb-6"></div>
                <p className="text-base text-[#666] leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
