import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { astrologers, pandits, courses, bookings, articles } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Query count from astrologers table
    const astrologersCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(astrologers);

    // Query count from pandits table
    const panditsCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(pandits);

    // Query count from courses table
    const coursesCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(courses);

    // Query count from bookings table
    const bookingsCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(bookings);

    // Query count from articles table
    const articlesCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(articles);

    // Query recent bookings - last 5 bookings ordered by createdAt DESC
    const recentBookings = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(5);

    // Return aggregated statistics
    return NextResponse.json(
      {
        totalAstrologers: Number(astrologersCount[0]?.count || 0),
        totalPandits: Number(panditsCount[0]?.count || 0),
        totalCourses: Number(coursesCount[0]?.count || 0),
        totalBookings: Number(bookingsCount[0]?.count || 0),
        totalArticles: Number(articlesCount[0]?.count || 0),
        recentBookings: recentBookings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET dashboard stats error:", error);
    return NextResponse.json(
      {
        error: "Internal server error: " + error,
      },
      { status: 500 },
    );
  }
}
