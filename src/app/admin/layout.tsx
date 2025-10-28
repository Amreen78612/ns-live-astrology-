"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Calendar,
  Flame,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  MessageCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/admin/astro-questions",
    label: "Astro Questions",
    icon: MessageCircle,
  },
  { href: "/admin/astrologers", label: "Astrologers", icon: Users },
  { href: "/admin/pandits", label: "Pandits", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/poojas", label: "Poojas", icon: Flame },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-[#1E3A8A] p-2"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">NS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1E3A8A]">
                  NS Live Astro
                </h1>
                <p className="text-xs text-[#FF6B35]">Admin Panel</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session?.user && (
              <span className="text-sm text-gray-600 hidden md:inline">
                {session.user.name}
              </span>
            )}
            <Link
              href="/"
              className="flex items-center gap-2 text-[#1E3A8A] hover:text-[#FF6B35] transition-colors"
            >
              <Home size={20} />
              <span className="hidden md:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#FF6B35] hover:text-[#FF5722] transition-colors"
            >
              <LogOut size={20} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-30 w-64 h-screen bg-white shadow-xl transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <nav className="p-4 pt-20 lg:pt-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#FF6B35] text-white"
                          : "text-[#1E3A8A] hover:bg-[#F8F9FA]"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
