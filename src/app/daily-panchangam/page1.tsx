import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Calendar, Clock, Sun, Moon, Star } from "lucide-react";

export default function DailyPanchangamPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Daily Panchangam
              </h1>
            </div>
            <p className="text-xl text-[#666] mb-2">{currentDate}</p>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Verify whether a day is good for a particular activity by
              referring to the Daily Panchangam
            </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
