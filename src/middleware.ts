import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Handle /login page - redirect authenticated users to their dashboard
    if (pathname.startsWith("/login")) {
      if (token) {
        // User is logged in, redirect based on role
        if (token.role === "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
      // If not logged in, allow access to login page
      return NextResponse.next();
    }

    // Protect /dashboard - only authenticated users
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // Both admin and regular users can access /dashboard
      return NextResponse.next();
    }

    // Handle /admin - only admins
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Always allow access to login page (we handle redirect in middleware)
        if (pathname.startsWith("/login")) {
          return true;
        }

        // Allow public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/api") ||
          pathname.startsWith("/articles") ||
          pathname.startsWith("/astrologers") ||
          pathname.startsWith("/courses") ||
          pathname.startsWith("/free-kundli") ||
          pathname.startsWith("/horoscope") ||
          pathname.startsWith("/match-kundli") ||
          pathname.startsWith("/book-pooja") ||
          pathname.startsWith("/pandits") ||
          pathname.startsWith("/daily-panchangam") ||
          pathname.startsWith("/books") ||
          pathname.startsWith("/certificates") ||
          pathname.startsWith("/gallery") ||
          pathname.startsWith("/gemstones") ||
          pathname.startsWith("/homas") ||
          pathname.startsWith("/love-compatibility") ||
          pathname.startsWith("/pdf") ||
          pathname.startsWith("/planetary-transit") ||
          pathname.startsWith("/vastu") ||
          pathname.startsWith("/yoga")
        ) {
          return true;
        }

        // Protect admin routes - only admins
        if (pathname.startsWith("/admin")) {
          return !!token && token.role === "admin";
        }

        // Protect dashboard routes - any authenticated user
        if (pathname.startsWith("/dashboard")) {
          return !!token;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/login", "/admin/:path*", "/dashboard/:path*"],
};
