"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function PanditsManagement() {
  const [pandits, setPandits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/pandits")
      .then((res) => res.json())
      .then((data) => setPandits(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPandits = pandits.filter((pandit: any) =>
    pandit.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
          Manage Pandits
        </h1>
        <p className="text-[#666]">
          View, add, edit, or remove pandits from your platform
        </p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search pandits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
            />
          </div>
          <Link
            href="/admin/pandits/add"
            className="flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Add Pandit
          </Link>
        </div>
      </div>

      {/* Pandits Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#10B981] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Experience</th>
                <th className="px-6 py-4 text-left">Specialization</th>
                <th className="px-6 py-4 text-left">Languages</th>
                <th className="px-6 py-4 text-left">Poojas Done</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPandits.map((pandit: any) => (
                <tr
                  key={pandit.id}
                  className="hover:bg-[#F8F9FA] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#1E3A8A]">
                      {pandit.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#666]">
                    {pandit.experience} Years
                  </td>
                  <td className="px-6 py-4 text-[#666]">
                    {pandit.specialization}
                  </td>
                  <td className="px-6 py-4 text-[#666]">{pandit.languages}</td>
                  <td className="px-6 py-4 text-[#666]">
                    {pandit.poojas_completed || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        pandit.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pandit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPandits.length === 0 && (
          <div className="text-center py-12 text-[#666]">
            <p>No pandits found</p>
          </div>
        )}
      </div>
    </div>
  );
}
