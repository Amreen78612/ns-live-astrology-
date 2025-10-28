"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Calendar, Clock, Sun, Moon, Star, Share2, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function DailyPanchangamPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  const panchangamData = [
    { label: "Tithi", value: "Krishna Paksha Chaturthi" },
    { label: "Nakshatra", value: "Uttara Phalguni" },
    { label: "Yoga", value: "Harshana" },
    { label: "Karana", value: "Bava" },
    { label: "Sunrise", value: "06:15 AM" },
    { label: "Sunset", value: "06:45 PM" },
    { label: "Moonrise", value: "08:30 PM" },
    { label: "Moonset", value: "09:15 AM" },
  ];

  const choghadiyaData = [
    {
      period: "Morning",
      time: "06:15 AM - 08:45 AM",
      type: "Shubh",
      quality: "Auspicious",
    },
    {
      period: "Late Morning",
      time: "08:45 AM - 11:15 AM",
      type: "Labh",
      quality: "Profitable",
    },
    {
      period: "Noon",
      time: "11:15 AM - 12:45 PM",
      type: "Amrit",
      quality: "Excellent",
    },
    {
      period: "Afternoon",
      time: "12:45 PM - 02:15 PM",
      type: "Char",
      quality: "Good",
    },
    {
      period: "Late Afternoon",
      time: "02:15 PM - 03:45 PM",
      type: "Rog",
      quality: "Inauspicious",
    },
    {
      period: "Evening",
      time: "03:45 PM - 05:15 PM",
      type: "Kaal",
      quality: "Inauspicious",
    },
    {
      period: "Late Evening",
      time: "05:15 PM - 06:45 PM",
      type: "Shubh",
      quality: "Auspicious",
    },
  ];

  const horaData = [
    {
      planet: "Sun",
      time: "06:15 AM - 07:15 AM",
      quality: "Good for authority",
    },
    {
      planet: "Moon",
      time: "07:15 AM - 08:15 AM",
      quality: "Good for emotions",
    },
    {
      planet: "Mars",
      time: "08:15 AM - 09:15 AM",
      quality: "Good for initiative",
    },
    {
      planet: "Mercury",
      time: "09:15 AM - 10:15 AM",
      quality: "Good for communication",
    },
    {
      planet: "Jupiter",
      time: "10:15 AM - 11:15 AM",
      quality: "Good for wisdom",
    },
    {
      planet: "Venus",
      time: "11:15 AM - 12:15 PM",
      quality: "Good for relationships",
    },
    {
      planet: "Saturn",
      time: "12:15 PM - 01:15 PM",
      quality: "Good for discipline",
    },
  ];

  const sharePanchangam = () => {
    if (navigator.share) {
      navigator.share({
        title: `Daily Panchangam - ${currentDate}`,
        text: `Check out today's Panchangam details including Tithi, Nakshatra, Yoga, Karana and Muhurat timings.`,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto">
          {/* Page Header with Share Button */}
          <div className="text-center mb-12 relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Daily Panchangam
              </h1>
            </div>
            <p className="text-xl text-[#666] mb-2">{currentDate}</p>
            <p className="text-base text-[#888] max-w-2xl mx-auto mb-6">
              Verify whether a day is good for a particular activity by
              referring to the Daily Panchangam
            </p>

            {/* Social Share Button */}
            <div className="flex justify-center">
              <button
                onClick={sharePanchangam}
                className="flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-lg hover:bg-[#2D4BA8] transition-colors"
              >
                <Share2 size={20} />
                Share Today's Panchangam
              </button>
            </div>
          </div>

          {/* Panchangam Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {panchangamData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg"
                >
                  <span className="text-lg font-semibold text-[#1E3A8A]">
                    {item.label}
                  </span>
                  <span className="text-lg text-[#FF6B35] font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Auspicious Times */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Sun className="text-[#FFD700] mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                Rahu Kaal
              </h3>
              <p className="text-2xl text-[#FF6B35] font-semibold">
                12:00 PM - 01:30 PM
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Moon className="text-[#0066FF] mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                Yamaganda
              </h3>
              <p className="text-2xl text-[#FF6B35] font-semibold">
                09:00 AM - 10:30 AM
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Star className="text-[#10B981] mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                Abhijit Muhurta
              </h3>
              <p className="text-2xl text-[#FF6B35] font-semibold">
                11:45 AM - 12:33 PM
              </p>
            </div>
          </div>

          {/* Choghadiya Timings */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center flex items-center justify-center gap-2">
              <Clock className="text-[#FF6B35]" size={28} />
              Choghadiya Muhurat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {choghadiyaData.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    item.quality === "Auspicious" ||
                    item.quality === "Excellent"
                      ? "border-green-500 bg-green-50"
                      : item.quality === "Profitable" || item.quality === "Good"
                        ? "border-blue-500 bg-blue-50"
                        : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#1E3A8A]">
                        {item.period}
                      </h3>
                      <p className="text-sm text-[#666]">{item.time}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.quality === "Auspicious" ||
                        item.quality === "Excellent"
                          ? "bg-green-100 text-green-800"
                          : item.quality === "Profitable" ||
                              item.quality === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm mt-2 text-[#666]">{item.quality}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hora Timings */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-center flex items-center justify-center gap-2">
              <Zap className="text-[#FF6B35]" size={28} />
              Hora Timings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {horaData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-[#1E3A8A]">
                      {item.planet} Hora
                    </h3>
                    <p className="text-sm text-[#666]">{item.time}</p>
                  </div>
                  <span className="text-sm text-[#FF6B35] font-medium text-right max-w-[150px]">
                    {item.quality}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Astrology Services CTA */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#FF6B35] rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Personalized Astrology Services
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Get detailed horoscope analysis, personalized remedies, and
              guidance from expert astrologers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Book Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Services
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
