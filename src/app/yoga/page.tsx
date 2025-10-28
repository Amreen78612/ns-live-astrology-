import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Users, Clock, Calendar } from "lucide-react";

const yogaClasses = [
  {
    name: "Hatha Yoga for Beginners",
    instructor: "Yogi Ramesh Kumar",
    duration: "60 mins",
    schedule: "Mon, Wed, Fri - 6:00 AM",
    students: 45,
    level: "Beginner",
  },
  {
    name: "Ashtanga Vinyasa Yoga",
    instructor: "Swami Priya Devi",
    duration: "90 mins",
    schedule: "Tue, Thu, Sat - 7:00 AM",
    students: 32,
    level: "Intermediate",
  },
  {
    name: "Pranayama & Meditation",
    instructor: "Guru Anand Sharma",
    duration: "45 mins",
    schedule: "Daily - 5:30 AM",
    students: 67,
    level: "All Levels",
  },
  {
    name: "Power Yoga",
    instructor: "Yogi Vikram Singh",
    duration: "75 mins",
    schedule: "Mon, Wed, Fri - 6:00 PM",
    students: 38,
    level: "Advanced",
  },
  {
    name: "Yin Yoga & Relaxation",
    instructor: "Devi Meera Patel",
    duration: "60 mins",
    schedule: "Tue, Thu - 7:00 PM",
    students: 41,
    level: "All Levels",
  },
  {
    name: "Kundalini Yoga",
    instructor: "Swami Rajendra",
    duration: "90 mins",
    schedule: "Sat, Sun - 8:00 AM",
    students: 29,
    level: "Intermediate",
  },
];

export default function YogaPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-4">
              Yoga Classes
            </h1>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Join our expert-led yoga classes and embark on a journey of
              physical and spiritual wellness
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yogaClasses.map((yogaClass, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[#10B981] text-white text-sm font-semibold rounded-full">
                    {yogaClass.level}
                  </span>
                  <div className="flex items-center gap-1 text-[#666]">
                    <Users size={16} />
                    <span className="text-sm">
                      {yogaClass.students} students
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-3">
                  {yogaClass.name}
                </h3>
                <p className="text-[#FF6B35] font-semibold mb-4">
                  {yogaClass.instructor}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[#666]">
                    <Clock size={18} />
                    <span>{yogaClass.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#666]">
                    <Calendar size={18} />
                    <span>{yogaClass.schedule}</span>
                  </div>
                </div>

                <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
