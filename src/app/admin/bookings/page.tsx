"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle } from "lucide-react";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBookings = bookings.filter((booking: any) => {
    const matchesSearch =
      booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
          Manage Bookings
        </h1>
        <p className="text-[#666]">View and manage all customer bookings</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-[#666] text-sm mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-[#1E3A8A]">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-[#666] text-sm mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-500">
            {bookings.filter((b: any) => b.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-[#666] text-sm mb-1">Confirmed</p>
          <p className="text-3xl font-bold text-green-500">
            {bookings.filter((b: any) => b.status === "confirmed").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-[#666] text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold text-blue-500">
            {bookings.filter((b: any) => b.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1E3A8A] text-white">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Service</th>
                <th className="px-6 py-4 text-left">Date & Time</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking: any) => (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F8F9FA] transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-[#666]">
                    #{booking.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#1E3A8A]">
                      {booking.customer_name}
                    </div>
                    <div className="text-sm text-[#666]">
                      {booking.customer_phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#666]">
                    {booking.service_type}
                  </td>
                  <td className="px-6 py-4 text-[#666]">
                    <div>{booking.booking_date}</div>
                    <div className="text-sm">{booking.booking_time}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#FF6B35]">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <CheckCircle size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-[#666]">
            <p>No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}
