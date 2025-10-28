import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BookOpen, Clock, Users, Award } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced Techniques of Predictive KP & Nadi Astrology",
    duration: "6 Months",
    students: 1240,
    level: "Advanced",
    price: "₹15,999",
  },
  {
    id: 2,
    title: "Advanced Techniques of Predictive Numerology",
    duration: "4 Months",
    students: 890,
    level: "Intermediate",
    price: "₹12,999",
  },
  {
    id: 3,
    title: "Marriage and Child Birth Astrology – KP Method",
    duration: "5 Months",
    students: 1450,
    level: "Advanced",
    price: "₹14,999",
  },
  {
    id: 4,
    title: "Advanced Techniques of Predictive KP Astrology",
    duration: "6 Months",
    students: 2100,
    level: "Advanced",
    price: "₹16,999",
  },
  {
    id: 5,
    title: "Bhrigu Nandi Nadi Astrology",
    duration: "8 Months",
    students: 670,
    level: "Expert",
    price: "₹19,999",
  },
  {
    id: 6,
    title: "Fundamentals of Vedic Astrology",
    duration: "3 Months",
    students: 3200,
    level: "Beginner",
    price: "₹9,999",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                NS Astrology Courses
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Learn from India's best astrologers and become a certified
              astrology professional
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <BookOpen className="text-[#FF6B35] mx-auto mb-3" size={40} />
              <h3 className="text-lg font-bold text-[#1E3A8A] mb-1">
                Expert Faculty
              </h3>
              <p className="text-sm text-[#666]">
                Learn from 20+ years experienced astrologers
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Award className="text-[#10B981] mx-auto mb-3" size={40} />
              <h3 className="text-lg font-bold text-[#1E3A8A] mb-1">
                Certified Courses
              </h3>
              <p className="text-sm text-[#666]">
                Get recognized certification upon completion
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Clock className="text-[#0066FF] mx-auto mb-3" size={40} />
              <h3 className="text-lg font-bold text-[#1E3A8A] mb-1">
                Flexible Schedule
              </h3>
              <p className="text-sm text-[#666]">
                Learn at your own pace with recorded sessions
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Users className="text-[#FFD700] mx-auto mb-3" size={40} />
              <h3 className="text-lg font-bold text-[#1E3A8A] mb-1">
                5000+ Students
              </h3>
              <p className="text-sm text-[#666]">
                Join thousands of successful graduates
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-bold leading-tight min-h-[80px]">
                    {course.title}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666] flex items-center gap-2">
                        <Clock size={16} className="text-[#FF6B35]" />
                        Duration
                      </span>
                      <span className="font-semibold text-[#1E3A8A]">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666] flex items-center gap-2">
                        <Users size={16} className="text-[#FF6B35]" />
                        Students
                      </span>
                      <span className="font-semibold text-[#1E3A8A]">
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
                      <span className="text-[#666]">Course Fee</span>
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-semibold hover:bg-[#0F1F4A] transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
