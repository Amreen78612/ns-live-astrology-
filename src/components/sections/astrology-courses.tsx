"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, BookOpen } from "lucide-react";

const courses = [
  "Advanced Techniques of Predictive KP & Nadi Astrology",
  "Advanced Techniques of Predictive Numerology",
  "Marriage and Child Birth Astrology – KP Method",
  "Advanced Techniques of Predictive KP Astrology",
  "Bhrigu Nandi Nadi Astrology",
];

export const AstrologyCourses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
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
              NS LIVE Courses
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
            NS Astrology Courses
          </h2>
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
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 snap-start bg-white rounded-xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full flex items-center justify-center mb-6 border-3 border-dashed border-[#FF6B35]">
                    <BookOpen size={60} className="text-[#FF6B35]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A8A] leading-tight min-h-[80px]">
                    {course}
                  </h3>
                  <div className="w-16 h-1 bg-[#FF6B35] rounded-full mt-4"></div>
                </div>
              </div>
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
