import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { astrologers } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Single astrologer by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: "Valid ID is required", code: "INVALID_ID" },
          { status: 400 },
        );
      }

      const astrologer = await db
        .select()
        .from(astrologers)
        .where(eq(astrologers.id, parseInt(id)))
        .limit(1);

      if (astrologer.length === 0) {
        return NextResponse.json(
          { error: "Astrologer not found", code: "NOT_FOUND" },
          { status: 404 },
        );
      }

      return NextResponse.json(astrologer[0], { status: 200 });
    }

    // List all astrologers with pagination and search
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");

    let query = db.select().from(astrologers);

    if (search) {
      query = query.where(
        or(
          like(astrologers.name, `%${search}%`),
          like(astrologers.email, `%${search}%`),
          like(astrologers.specialization, `%${search}%`),
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
      "specialization",
      "languages",
      "pricePerConsultation",
      "bio",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            error: `Required field '${field}' is missing`,
            code: "MISSING_REQUIRED_FIELD",
          },
          { status: 400 },
        );
      }
    }

    // Sanitize inputs
    const sanitizedData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      experienceYears: body.experienceYears,
      specialization: body.specialization.trim(),
      languages: body.languages.trim(),
      pricePerConsultation: body.pricePerConsultation,
      bio: body.bio.trim(),
      rating: body.rating !== undefined ? body.rating : 0,
      totalConsultations:
        body.totalConsultations !== undefined ? body.totalConsultations : 0,
      isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
      imageUrl: body.imageUrl ? body.imageUrl.trim() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newAstrologer = await db
      .insert(astrologers)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newAstrologer[0], { status: 201 });
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

    // Check if astrologer exists
    const existing = await db
      .select()
      .from(astrologers)
      .where(eq(astrologers.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Astrologer not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const body = await request.json();

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.email !== undefined)
      updates.email = body.email.trim().toLowerCase();
    if (body.phone !== undefined) updates.phone = body.phone.trim();
    if (body.experienceYears !== undefined)
      updates.experienceYears = body.experienceYears;
    if (body.specialization !== undefined)
      updates.specialization = body.specialization.trim();
    if (body.languages !== undefined) updates.languages = body.languages.trim();
    if (body.rating !== undefined) updates.rating = body.rating;
    if (body.totalConsultations !== undefined)
      updates.totalConsultations = body.totalConsultations;
    if (body.pricePerConsultation !== undefined)
      updates.pricePerConsultation = body.pricePerConsultation;
    if (body.isAvailable !== undefined) updates.isAvailable = body.isAvailable;
    if (body.bio !== undefined) updates.bio = body.bio.trim();
    if (body.imageUrl !== undefined)
      updates.imageUrl = body.imageUrl ? body.imageUrl.trim() : null;

    const updated = await db
      .update(astrologers)
      .set(updates)
      .where(eq(astrologers.id, parseInt(id)))
      .returning();

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

    // Check if astrologer exists
    const existing = await db
      .select()
      .from(astrologers)
      .where(eq(astrologers.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Astrologer not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const deleted = await db
      .delete(astrologers)
      .where(eq(astrologers.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "Astrologer deleted successfully",
        astrologer: deleted[0],
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
