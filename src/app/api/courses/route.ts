import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq, like, and, or, desc } from "drizzle-orm";

const VALID_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Single course by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: "Valid ID is required", code: "INVALID_ID" },
          { status: 400 },
        );
      }

      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.id, parseInt(id)))
        .limit(1);

      if (course.length === 0) {
        return NextResponse.json(
          { error: "Course not found", code: "NOT_FOUND" },
          { status: 404 },
        );
      }

      return NextResponse.json(course[0], { status: 200 });
    }

    // List with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");
    const level = searchParams.get("level");

    let query = db.select().from(courses);

    const conditions = [];

    // Search condition
    if (search) {
      conditions.push(
        or(
          like(courses.title, `%${search}%`),
          like(courses.description, `%${search}%`),
          like(courses.instructorName, `%${search}%`),
        ),
      );
    }

    // Level filter
    if (level) {
      conditions.push(eq(courses.level, level));
    }

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(courses.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      durationMonths,
      level,
      price,
      instructorName,
      syllabus,
      totalStudents,
      isActive,
    } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required", code: "MISSING_TITLE" },
        { status: 400 },
      );
    }

    if (!description) {
      return NextResponse.json(
        { error: "Description is required", code: "MISSING_DESCRIPTION" },
        { status: 400 },
      );
    }

    if (!durationMonths) {
      return NextResponse.json(
        { error: "Duration months is required", code: "MISSING_DURATION" },
        { status: 400 },
      );
    }

    if (!level) {
      return NextResponse.json(
        { error: "Level is required", code: "MISSING_LEVEL" },
        { status: 400 },
      );
    }

    if (!price && price !== 0) {
      return NextResponse.json(
        { error: "Price is required", code: "MISSING_PRICE" },
        { status: 400 },
      );
    }

    if (!instructorName) {
      return NextResponse.json(
        { error: "Instructor name is required", code: "MISSING_INSTRUCTOR" },
        { status: 400 },
      );
    }

    if (!syllabus) {
      return NextResponse.json(
        { error: "Syllabus is required", code: "MISSING_SYLLABUS" },
        { status: 400 },
      );
    }

    // Validate level
    if (!VALID_LEVELS.includes(level)) {
      return NextResponse.json(
        {
          error: `Level must be one of: ${VALID_LEVELS.join(", ")}`,
          code: "INVALID_LEVEL",
        },
        { status: 400 },
      );
    }

    // Validate numeric fields
    if (isNaN(parseInt(durationMonths))) {
      return NextResponse.json(
        { error: "Duration months must be a number", code: "INVALID_DURATION" },
        { status: 400 },
      );
    }

    if (isNaN(parseInt(price))) {
      return NextResponse.json(
        { error: "Price must be a number", code: "INVALID_PRICE" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      title: title.trim(),
      description: description.trim(),
      durationMonths: parseInt(durationMonths),
      level: level.trim(),
      price: parseInt(price),
      instructorName: instructorName.trim(),
      syllabus: syllabus.trim(),
      totalStudents: totalStudents !== undefined ? parseInt(totalStudents) : 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newCourse = await db
      .insert(courses)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newCourse[0], { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    const body = await request.json();

    // Check if record exists
    const existing = await db
      .select()
      .from(courses)
      .where(eq(courses.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Course not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    // Validate level if provided
    if (body.level && !VALID_LEVELS.includes(body.level)) {
      return NextResponse.json(
        {
          error: `Level must be one of: ${VALID_LEVELS.join(", ")}`,
          code: "INVALID_LEVEL",
        },
        { status: 400 },
      );
    }

    // Validate numeric fields if provided
    if (
      body.durationMonths !== undefined &&
      isNaN(parseInt(body.durationMonths))
    ) {
      return NextResponse.json(
        { error: "Duration months must be a number", code: "INVALID_DURATION" },
        { status: 400 },
      );
    }

    if (body.price !== undefined && isNaN(parseInt(body.price))) {
      return NextResponse.json(
        { error: "Price must be a number", code: "INVALID_PRICE" },
        { status: 400 },
      );
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined)
      updateData.description = body.description.trim();
    if (body.durationMonths !== undefined)
      updateData.durationMonths = parseInt(body.durationMonths);
    if (body.level !== undefined) updateData.level = body.level.trim();
    if (body.price !== undefined) updateData.price = parseInt(body.price);
    if (body.instructorName !== undefined)
      updateData.instructorName = body.instructorName.trim();
    if (body.syllabus !== undefined) updateData.syllabus = body.syllabus.trim();
    if (body.totalStudents !== undefined)
      updateData.totalStudents = parseInt(body.totalStudents);
    if (body.isActive !== undefined)
      updateData.isActive = Boolean(body.isActive);

    const updated = await db
      .update(courses)
      .set(updateData)
      .where(eq(courses.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Course not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if record exists
    const existing = await db
      .select()
      .from(courses)
      .where(eq(courses.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Course not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const deleted = await db
      .delete(courses)
      .where(eq(courses.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: "Course not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Course deleted successfully",
        course: deleted[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 },
    );
  }
}
