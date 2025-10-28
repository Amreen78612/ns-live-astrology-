"use client";

import { useEffect, useRef, useState } from "react";
import { Search, MessageCircle, Users, Trophy } from "lucide-react";

const stats = [
  { icon: Search, number: 473, label: "Total Astrologers" },
  { icon: MessageCircle, number: 54, label: "Total Pandits" },
  { icon: Users, number: 3860, label: "Total Customers" },
  { icon: Trophy, number: 50, label: "Awards Winning" },
];

export const StatsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(timer);
          }
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-r from-[#FFD700] via-[#C6A732] to-[#10B981] py-12"
    >
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative"
            >
              {index > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/30" />
              )}
              <stat.icon size={48} className="text-white mb-4" />
              <div className="text-6xl font-black text-white mb-2">
                {counts[index].toLocaleString()}
                <sup className="text-3xl">+</sup>
              </div>
              <div className="text-lg text-white font-normal">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
