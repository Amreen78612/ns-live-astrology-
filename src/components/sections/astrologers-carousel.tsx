"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const astrologers = [
  {
    name: "Dr. Rajesh Kumar",
    experience: 25,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/team-18.jpg",
    borderColor: "#FF6B35",
  },
  {
    name: "Acharya Sharma",
    experience: 18,
    image: null,
    borderColor: "#0066FF",
  },
  {
    name: "Pt. Sanjay Mishra",
    experience: 30,
    image: null,
    borderColor: "#10B981",
  },
  {
    name: "Dr. Anita Rao",
    experience: 15,
    image: null,
    borderColor: "#FF6B35",
  },
  {
    name: "Astro Vikram Singh",
    experience: 20,
    image: null,
    borderColor: "#00CED1",
  },
  {
    name: "Jyotish Acharya",
    experience: 12,
    image: null,
    borderColor: "#0066FF",
  },
  { name: "Vedic Expert", experience: 22, image: null, borderColor: "#10B981" },
  { name: "Pandit Ji", experience: 28, image: null, borderColor: "#FF6B35" },
];

export const AstrologersCarousel = () => {
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
    <section className="py-16 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} className="text-[#FF6B35]" />
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wide">
              Our Astrologers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-3">
            We Have An Expert Astrologers
          </h2>
          <p className="text-xl text-[#FF6B35] font-medium">To Serve You.</p>
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
            {astrologers.map((astrologer, index) => (
              <Link
                key={index}
                href={`/astrologers/${index + 1}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-44 h-44 mb-4 rounded-full border-4 shadow-lg overflow-hidden group-hover:scale-105 transition-transform"
                    style={{ borderColor: astrologer.borderColor }}
                  >
                    {astrologer.image ? (
                      <Image
                        src={astrologer.image}
                        alt={astrologer.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-[#6B7280] to-[#4B5563] flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-white/50"
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
                  <h3 className="text-base font-bold text-[#1E3A8A] group-hover:text-[#FF6B35] transition-colors mb-1">
                    {astrologer.name}
                  </h3>
                  <p className="text-sm text-[#666]">
                    Exp: {astrologer.experience} Yr(s)
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
