import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { astroQuestions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET - Get all questions (admin only) or user's questions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    const userId = parseInt((session.user as any).id);

    // If admin, return all questions with user info
    if (userRole === "admin") {
      const questions = await db
        .select({
          id: astroQuestions.id,
          question: astroQuestions.question,
          answer: astroQuestions.answer,
          replyType: astroQuestions.replyType,
          paymentStatus: astroQuestions.paymentStatus,
          createdAt: astroQuestions.createdAt,
          user: {
            id: users.id,
            name: users.name,
            email: users.email,
          },
        })
        .from(astroQuestions)
        .leftJoin(users, eq(astroQuestions.userId, users.id))
        .orderBy(astroQuestions.createdAt);

      return NextResponse.json(questions);
    }

    // If regular user, return only their questions
    const questions = await db
      .select()
      .from(astroQuestions)
      .where(eq(astroQuestions.userId, userId))
      .orderBy(astroQuestions.createdAt);

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

// PATCH - Update question (admin only - add reply)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const { id, answer } = await request.json();

    if (!id || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Update the question with the answer
    const [updated] = await db
      .update(astroQuestions)
      .set({
        answer,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(astroQuestions.id, id))
      .returning();

    // If replyType is email, send email notification (optional - implement later)
    if (updated.replyType === "email") {
      // TODO: Send email with the answer
      console.log("Send email notification to user:", updated);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 },
    );
  }
}
