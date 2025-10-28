import Image from "next/image";
import {
  MessageCircle,
  Bus,
  Users,
  ArrowRight,
  Calculator,
  Presentation,
} from "lucide-react";

const leftFeatures = [
  {
    icon: MessageCircle,
    title: "KP Planets",
    description:
      "Detailed analysis of planetary positions and their influence in KP system",
  },
  {
    icon: Bus,
    title: "KP House Cusps",
    description: "Precise calculation of house cusps for accurate predictions",
  },
  {
    icon: Users,
    title: "KP Birth Chart",
    description: "Complete birth chart analysis using Krishnamurti Paddhati",
  },
];

const rightFeatures = [
  {
    icon: ArrowRight,
    title: "KP House Significator",
    description: "Understanding house significators for event timing",
  },
  {
    icon: Calculator,
    title: "KP Planet Significator",
    description: "Planetary significators and their role in predictions",
  },
  {
    icon: Presentation,
    title: "KP Dasha Range",
    description: "Accurate dasha periods and sub-periods calculation",
  },
];

export const KPAstrologyFeatures = () => {
  return (
    <section className="py-16 px-8 bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Features */}
          <div className="flex-1 space-y-8">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base text-[#666] max-w-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center: Zodiac Wheel */}
          <div className="relative flex-shrink-0">
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/icons/9df91bc2d3ecdb753af8e2b20197aa7f-5.png"
                alt="KP Astrology Zodiac Wheel"
                fill
                className="object-contain"
              />
              <div className="absolute -top-8 -left-8 bg-[#FF6B35] text-white rounded-full w-32 h-32 flex items-center justify-center text-center font-bold shadow-lg">
                <span className="text-lg">25+ Service we provide</span>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="flex-1 space-y-8">
            {rightFeatures.map((feature, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base text-[#666] max-w-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
