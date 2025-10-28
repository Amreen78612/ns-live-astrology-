"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Speak with Our Expert Astrologers",
    subtitle:
      "Get personalized astrological guidance from certified professionals",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/banner3-3.jpg",
  },
  {
    title: "Discover Your Life's Path",
    subtitle: "Unlock the secrets of your destiny with Vedic astrology",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/banner4-4.jpg",
  },
  {
    title: "Join Our Franchise Program",
    subtitle: "Become a part of India's leading astrology network",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/Franchise_banner-5.png",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[400px] md:h-[600px] bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-[1400px] mx-auto h-full px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Left: Zodiac Wheel */}
            <div className="relative w-[200px] h-[200px] md:w-[400px] md:h-[400px] flex-shrink-0">
              <Image
                src={slide.image}
                alt="Zodiac Wheel"
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>

            {/* Right: Text Content */}
            <div className="flex-1 text-center md:text-left px-4">
              <h1
                className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight"
                style={{
                  textShadow: "2px 2px 8px rgba(138, 43, 226, 0.5)",
                }}
              >
                {slide.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
                {slide.subtitle}
              </p>
              <button className="bg-[#0066FF] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:scale-105 transition-transform shadow-lg">
                View More
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
      >
        <ChevronLeft size={20} className="text-[#1E3A8A] md:w-6 md:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
      >
        <ChevronRight size={20} className="text-[#1E3A8A] md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6 md:w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
