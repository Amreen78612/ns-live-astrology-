import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0A1628] text-white py-16 px-8 relative overflow-hidden">
      {/* Star Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Logo & About */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">NS</span>
            </div>
            <h2 className="text-3xl font-bold">
              NS Live Astro<sup className="text-xs">TM</sup>
            </h2>
          </div>
          <h3 className="text-2xl font-bold text-[#FF6B35] mb-4">
            About Astro
          </h3>
          <p className="text-white/80 max-w-4xl mx-auto leading-relaxed">
            NSLiveAstro is a leading platform for Vedic astrology, offering
            expert consultations, daily horoscopes, kundli matching, and
            spiritual services. Our certified astrologers and pandits provide
            authentic guidance based on ancient wisdom. Explore courses, book
            poojas, and connect with spiritual experts from the comfort of your
            home.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Our Services */}
          <div>
            <h4 className="text-xl font-bold text-[#FF6B35] mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/panchangam"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Daily Panchangam
                </Link>
              </li>
              <li>
                <Link
                  href="/free-kundli"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Free Kundli
                </Link>
              </li>
              <li>
                <Link
                  href="/match-kundli"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Match Kundli
                </Link>
              </li>
              <li>
                <Link
                  href="/astrologers"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Our Astrologers
                </Link>
              </li>
              <li>
                <Link
                  href="/book-pooja"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Book A Pooja
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Astrology Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* KP Astrology */}
          <div>
            <h4 className="text-xl font-bold text-[#FF6B35] mb-6">
              KP Astrology
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/kp-planets"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  KP Planets
                </Link>
              </li>
              <li>
                <Link
                  href="/kp-house-cusps"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  KP House Cusps
                </Link>
              </li>
              <li>
                <Link
                  href="/kp-birth-chart"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  KP Birth Chart
                </Link>
              </li>
              <li>
                <Link
                  href="/kp-house-significator"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  KP House Significator
                </Link>
              </li>
              <li>
                <Link
                  href="/kp-planet-significator"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  KP Planet Significator
                </Link>
              </li>
              <li>
                <Link
                  href="/kp-dasha-range"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  KP Dasha Range
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#FF6B35] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-white/80 hover:text-[#FF6B35] transition-colors"
                >
                  Pricing Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Info */}
          <div>
            <h4 className="text-xl font-bold text-[#FF6B35] mb-6">
              Official Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-[#FF6B35]" />
                <span className="text-white/80">+91 9652 47 5566</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-[#FF6B35]" />
                <span className="text-white/80">info@nsliveastro.com</span>
              </li>
              <li className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center hover:bg-[#FF5722] transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center hover:bg-[#FF5722] transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center hover:bg-[#FF5722] transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </li>
              <li className="mt-6">
                <button className="bg-[#FF6B35] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#FF5722] transition-colors w-full mb-3">
                  Franchise Registration
                </button>
                <button className="bg-[#FF6B35] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#FF5722] transition-colors w-full">
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm">
            Copyright © 2025 NSLive Astro (OPC) PRIVATE LIMITED. All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
