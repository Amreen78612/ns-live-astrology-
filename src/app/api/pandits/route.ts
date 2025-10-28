import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pandits } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: "Valid ID is required", code: "INVALID_ID" },
          { status: 400 },
        );
      }

      const pandit = await db
        .select()
        .from(pandits)
        .where(eq(pandits.id, parseInt(id)))
        .limit(1);

      if (pandit.length === 0) {
        return NextResponse.json(
          { error: "Pandit not found", code: "NOT_FOUND" },
          { status: 404 },
        );
      }

      return NextResponse.json(pandit[0], { status: 200 });
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");

    let query = db.select().from(pandits);

    if (search) {
      query = query.where(
        or(
          like(pandits.name, `%${search}%`),
          like(pandits.email, `%${search}%`),
          like(pandits.specializations, `%${search}%`),
        ),
      );
    }

    const results = await query.limit(limit).offset(offset);

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

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "experienceYears",
      "specializations",
      "languages",
      "bio",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            error: `${field} is required`,
            code: "MISSING_REQUIRED_FIELD",
          },
          { status: 400 },
        );
      }
    }

    // Validate experienceYears is a number
    if (typeof body.experienceYears !== "number" || body.experienceYears < 0) {
      return NextResponse.json(
        {
          error: "experienceYears must be a positive number",
          code: "INVALID_EXPERIENCE_YEARS",
        },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      experienceYears: body.experienceYears,
      specializations: body.specializations.trim(),
      languages: body.languages.trim(),
      bio: body.bio.trim(),
      isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
      imageUrl: body.imageUrl ? body.imageUrl.trim() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert new pandit
    const newPandit = await db
      .insert(pandits)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newPandit[0], { status: 201 });
  } catch (error) {
    console.error("POST error:", error);

    // Check for unique constraint violation on email
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { error: "Email already exists", code: "DUPLICATE_EMAIL" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if pandit exists
    const existingPandit = await db
      .select()
      .from(pandits)
      .where(eq(pandits.id, parseInt(id)))
      .limit(1);

    if (existingPandit.length === 0) {
      return NextResponse.json(
        { error: "Pandit not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const body = await request.json();

    // Build update object with sanitized data
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (body.name !== undefined) {
      updates.name = body.name.trim();
    }

    if (body.email !== undefined) {
      updates.email = body.email.trim().toLowerCase();
    }

    if (body.phone !== undefined) {
      updates.phone = body.phone.trim();
    }

    if (body.experienceYears !== undefined) {
      if (
        typeof body.experienceYears !== "number" ||
        body.experienceYears < 0
      ) {
        return NextResponse.json(
          {
            error: "experienceYears must be a positive number",
            code: "INVALID_EXPERIENCE_YEARS",
          },
          { status: 400 },
        );
      }
      updates.experienceYears = body.experienceYears;
    }

    if (body.specializations !== undefined) {
      updates.specializations = body.specializations.trim();
    }

    if (body.languages !== undefined) {
      updates.languages = body.languages.trim();
    }

    if (body.bio !== undefined) {
      updates.bio = body.bio.trim();
    }

    if (body.isAvailable !== undefined) {
      updates.isAvailable = body.isAvailable;
    }

    if (body.imageUrl !== undefined) {
      updates.imageUrl = body.imageUrl ? body.imageUrl.trim() : null;
    }

    // Update pandit
    const updatedPandit = await db
      .update(pandits)
      .set(updates)
      .where(eq(pandits.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPandit[0], { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);

    // Check for unique constraint violation on email
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { error: "Email already exists", code: "DUPLICATE_EMAIL" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if pandit exists
    const existingPandit = await db
      .select()
      .from(pandits)
      .where(eq(pandits.id, parseInt(id)))
      .limit(1);

    if (existingPandit.length === 0) {
      return NextResponse.json(
        { error: "Pandit not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    // Delete pandit
    const deletedPandit = await db
      .delete(pandits)
      .where(eq(pandits.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "Pandit deleted successfully",
        pandit: deletedPandit[0],
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
