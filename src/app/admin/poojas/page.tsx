"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Flame } from "lucide-react";
import Link from "next/link";

export default function PoojasManagement() {
  const [poojas, setPoojas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/poojas")
      .then((res) => res.json())
      .then((data) => setPoojas(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPoojas = poojas.filter((pooja: any) =>
    pooja.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
          Manage Poojas
        </h1>
        <p className="text-[#666]">View, add, edit, or remove pooja services</p>
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
              placeholder="Search poojas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
            />
          </div>
          <Link
            href="/admin/poojas/add"
            className="flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Add Pooja
          </Link>
        </div>
      </div>

      {/* Poojas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoojas.map((pooja: any) => (
          <div
            key={pooja.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F1F4A] p-6 text-white">
              <Flame className="mb-3" size={32} />
              <h3 className="text-xl font-bold mb-2">{pooja.name}</h3>
              <p className="text-sm text-white/80 line-clamp-2">
                {pooja.description}
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Duration:</span>
                  <span className="font-semibold text-[#1E3A8A]">
                    {pooja.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Pandits Required:</span>
                  <span className="font-semibold text-[#1E3A8A]">
                    {pooja.pandits_required}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Bookings:</span>
                  <span className="font-semibold text-[#1E3A8A]">
                    {pooja.total_bookings || 0}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-[#666]">Price:</span>
                  <span className="text-2xl font-bold text-[#FF6B35]">
                    {pooja.price}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-colors">
                  <Edit size={18} />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPoojas.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-[#666]">
          <p>No poojas found</p>
        </div>
      )}
    </div>
  );
}
