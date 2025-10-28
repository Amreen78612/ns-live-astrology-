"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, Ban, CheckCircle } from "lucide-react";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter(
    (user: any) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
          Manage Users
        </h1>
        <p className="text-[#666]">View and manage all registered users</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#10B981] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Joined</th>
                <th className="px-6 py-4 text-left">Bookings</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user: any) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#F8F9FA] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#1E3A8A]">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#666]">{user.email}</td>
                  <td className="px-6 py-4 text-[#666]">
                    {user.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[#666]">{user.created_at}</td>
                  <td className="px-6 py-4 text-[#666]">
                    {user.total_bookings || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      {user.status === "active" ? (
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Ban size={18} />
                        </button>
                      ) : (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-[#666]">
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
