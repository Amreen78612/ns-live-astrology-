"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  User,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  Home,
} from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Utility Bar */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] py-2 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between text-xs md:text-sm flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[#1E3A8A]">
            <Phone size={14} className="md:hidden" />
            <Phone size={16} className="hidden md:block" />
            <span className="font-medium">+91 9652 47 5566</span>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 text-[#1E3A8A] hover:text-[#FF6B35] transition-colors"
            >
              <User size={16} />
              <span className="font-medium">Login</span>
            </Link>

            <button className="bg-[#FF6B35] text-white px-3 py-1 rounded-md font-medium hover:bg-[#FF5722] transition-colors text-xs">
              Astrologer Registration
            </button>

            <button className="bg-[#1E3A8A] text-white px-3 py-1 rounded-md font-medium hover:bg-[#0F1F4A] transition-colors text-xs">
              Pandit Registration
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-[#1E3A8A] font-medium text-xs md:text-sm">
                EN
              </span>
              <ChevronDown size={14} className="text-[#1E3A8A]" />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Facebook
                size={16}
                className="text-[#1E3A8A] cursor-pointer hover:text-[#FF6B35] transition-colors"
              />
              <Twitter
                size={16}
                className="text-[#1E3A8A] cursor-pointer hover:text-[#FF6B35] transition-colors"
              />
              <Instagram
                size={16}
                className="text-[#1E3A8A] cursor-pointer hover:text-[#FF6B35] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

  {/* Logo Section */}
  <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-3 md:py-4 px-4 md:px-8 border-b border-orange-200">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg md:text-xl">
                NS
              </span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#1E3A8A]">
                NS Live Astro<sup className="text-xs">TM</sup>
              </h1>
              <p className="text-[10px] md:text-xs text-[#FF6B35] hidden sm:block">
                Spreading Spiritual Astro Activities
              </p>
            </div>
          </Link>

          <button
            className="lg:hidden text-[#1E3A8A] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

  {/* Main Navigation */}
  <nav className="bg-gradient-to-r from-orange-50 to-orange-100 sticky top-0 z-50 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <ul
            className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 py-4`}
          >
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors py-1"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/daily-panchangam"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Daily Panchangam
              </Link>
            </li>
            <li>
              <Link
                href="/horoscope"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Horoscope
              </Link>
            </li>
            <li>
              <Link
                href="/free-kundli"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Free Kundli
              </Link>
            </li>
            <li>
              <Link
                href="/remedies"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Remedies
              </Link>
            </li>
            <li>
              <Link
                href="/love-compatibility"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Love / marriage compatibility
              </Link>
            </li>
            <li>
              <Link
                href="/astrologers"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Our Astrologers
              </Link>
            </li>
            <li>
              <Link
                href="/ask-astrologer"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Ask an Astrologer
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Astrology Courses
              </Link>
            </li>
            <li>
              <Link
                href="/book-pooja"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Book A Pooja
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors block py-1"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/insights"
                className="text-[#1E3A8A] font-semibold hover:text-[#FF6B35] transition-colors flex items-center gap-2 py-1"
              >
                <span>AI Reports & Insights</span>
                <span className="bg-[#FF6B35] text-white text-xs px-2 py-0.5 rounded-full">New</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
