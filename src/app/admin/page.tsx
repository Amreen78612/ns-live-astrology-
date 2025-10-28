import {
  Users,
  BookOpen,
  Flame,
  FileText,
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total Astrologers",
    value: "473",
    icon: Users,
    color: "bg-blue-500",
    link: "/admin/astrologers",
  },
  {
    label: "Total Pandits",
    value: "54",
    icon: Users,
    color: "bg-green-500",
    link: "/admin/pandits",
  },
  {
    label: "Total Customers",
    value: "3,860",
    icon: TrendingUp,
    color: "bg-purple-500",
    link: "/admin/users",
  },
  {
    label: "Active Courses",
    value: "24",
    icon: BookOpen,
    color: "bg-orange-500",
    link: "/admin/courses",
  },
  {
    label: "Total Articles",
    value: "156",
    icon: FileText,
    color: "bg-pink-500",
    link: "/admin/articles",
  },
  {
    label: "Bookings Today",
    value: "18",
    icon: Calendar,
    color: "bg-cyan-500",
    link: "/admin/bookings",
  },
  {
    label: "Revenue (Month)",
    value: "₹4.2L",
    icon: DollarSign,
    color: "bg-emerald-500",
    link: "/admin/revenue",
  },
  {
    label: "Avg Rating",
    value: "4.8",
    icon: Star,
    color: "bg-yellow-500",
    link: "/admin/reviews",
  },
];

const recentBookings = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Satyanarayan Pooja",
    date: "Today, 3:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Priya Gupta",
    service: "Consultation",
    date: "Today, 4:30 PM",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Amit Kumar",
    service: "Griha Pravesh",
    date: "Tomorrow, 10:00 AM",
    status: "Confirmed",
  },
  {
    id: 4,
    customer: "Neha Singh",
    service: "Kundli Matching",
    date: "Tomorrow, 2:00 PM",
    status: "Confirmed",
  },
];

const topAstrologers = [
  {
    name: "Dr. Rajesh Kumar",
    consultations: 156,
    rating: 4.9,
    revenue: "₹45,600",
  },
  {
    name: "Acharya Sharma",
    consultations: 134,
    rating: 4.8,
    revenue: "₹38,200",
  },
  {
    name: "Pt. Sanjay Mishra",
    consultations: 128,
    rating: 4.9,
    revenue: "₹42,800",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[1600px] mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[#666]">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="text-white" size={24} />
                </div>
                <span className="text-3xl font-extrabold text-[#1E3A8A]">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-[#666] font-semibold">{stat.label}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">
                Recent Bookings
              </h2>
              <Link
                href="/admin/bookings"
                className="text-[#FF6B35] font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-[#1E3A8A]">
                      {booking.customer}
                    </p>
                    <p className="text-sm text-[#666]">{booking.service}</p>
                    <p className="text-xs text-[#888] mt-1">{booking.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Astrologers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">
                Top Performers
              </h2>
              <Link
                href="/admin/astrologers"
                className="text-[#FF6B35] font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {topAstrologers.map((astrologer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#6B7280] to-[#4B5563] flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1E3A8A]">
                        {astrologer.name}
                      </p>
                      <p className="text-xs text-[#666]">
                        {astrologer.consultations} consultations
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#FF6B35]">
                      {astrologer.revenue}
                    </p>
                    <p className="text-xs text-[#666]">
                      ⭐ {astrologer.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/astrologers/add"
            className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white p-6 rounded-xl text-center font-semibold hover:shadow-xl transition-all"
          >
            + Add Astrologer
          </Link>
          <Link
            href="/admin/courses/add"
            className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white p-6 rounded-xl text-center font-semibold hover:shadow-xl transition-all"
          >
            + Add Course
          </Link>
          <Link
            href="/admin/articles/add"
            className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white p-6 rounded-xl text-center font-semibold hover:shadow-xl transition-all"
          >
            + Add Article
          </Link>
          <Link
            href="/admin/poojas/add"
            className="bg-gradient-to-r from-[#1E3A8A] to-[#0F1F4A] text-white p-6 rounded-xl text-center font-semibold hover:shadow-xl transition-all"
          >
            + Add Pooja
          </Link>
        </div>
      </div>
    </div>
  );
}
