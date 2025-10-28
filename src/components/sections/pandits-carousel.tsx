"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const pandits = [
  {
    name: "Pandit Sharma",
    experience: 15,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/team-18.jpg",
  },
  { name: "Pandit Kumar", experience: 20, image: null },
  { name: "Pandit Singh", experience: 12, image: null },
  { name: "Pandit Patel", experience: 18, image: null },
  { name: "Pandit Reddy", experience: 10, image: null },
  { name: "Pandit Rao", experience: 25, image: null },
  { name: "Pandit Gupta", experience: 8, image: null },
  { name: "Pandit Iyer", experience: 30, image: null },
];

export const PanditsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-8 bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} className="text-[#FF6B35]" />
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wide">
              Our Pandits
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-3">
            We Have An Expert Pandits / Purohits
          </h2>
          <p className="text-xl text-[#FF6B35] font-medium">
            To Perform All Types Of Poojas & Homas.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all -ml-6"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pandits.map((pandit, index) => (
              <Link
                key={index}
                href={`/pandits/${index + 1}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
                    {pandit.image ? (
                      <Image
                        src={pandit.image}
                        alt={pandit.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
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
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3A8A] group-hover:text-[#FF6B35] transition-colors mb-1">
                    {pandit.name}
                  </h3>
                  <p className="text-sm text-[#666]">
                    Exp: {pandit.experience} Yr(s)
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all -mr-6"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
