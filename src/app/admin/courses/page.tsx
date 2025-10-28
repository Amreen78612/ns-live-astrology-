"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCourses = courses.filter((course: any) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">
          Manage Courses
        </h1>
        <p className="text-[#666]">
          View, add, edit, or remove astrology courses
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
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none"
            />
          </div>
          <Link
            href="/admin/courses/add"
            className="flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Add Course
          </Link>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course: any) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] p-6 text-white">
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2">
                {course.level}
              </span>
              <h3 className="text-lg font-bold leading-tight min-h-[60px]">
                {course.title}
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Duration:</span>
                  <span className="font-semibold text-[#1E3A8A]">
                    {course.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Students:</span>
                  <span className="font-semibold text-[#1E3A8A]">
                    {course.students_enrolled || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Price:</span>
                  <span className="text-xl font-bold text-[#FF6B35]">
                    {course.price}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-[#666]">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      course.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye size={18} />
                  View
                </button>
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

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-[#666]">
          <p>No courses found</p>
        </div>
      )}
    </div>
  );
}
