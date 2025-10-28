import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { poojas } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: "Valid ID is required", code: "INVALID_ID" },
          { status: 400 },
        );
      }

      const record = await db
        .select()
        .from(poojas)
        .where(eq(poojas.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: "Pooja not found", code: "NOT_FOUND" },
          { status: 404 },
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");

    let query = db.select().from(poojas);

    if (search) {
      query = query.where(
        or(
          like(poojas.name, `%${search}%`),
          like(poojas.description, `%${search}%`),
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
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: "Name is required", code: "MISSING_NAME" },
        { status: 400 },
      );
    }

    if (!body.description || !body.description.trim()) {
      return NextResponse.json(
        { error: "Description is required", code: "MISSING_DESCRIPTION" },
        { status: 400 },
      );
    }

    if (!body.durationHours || !body.durationHours.trim()) {
      return NextResponse.json(
        { error: "Duration hours is required", code: "MISSING_DURATION_HOURS" },
        { status: 400 },
      );
    }

    if (body.requiredPandits === undefined || body.requiredPandits === null) {
      return NextResponse.json(
        {
          error: "Required pandits is required",
          code: "MISSING_REQUIRED_PANDITS",
        },
        { status: 400 },
      );
    }

    if (typeof body.requiredPandits !== "number" || body.requiredPandits < 0) {
      return NextResponse.json(
        {
          error: "Required pandits must be a non-negative number",
          code: "INVALID_REQUIRED_PANDITS",
        },
        { status: 400 },
      );
    }

    if (body.price === undefined || body.price === null) {
      return NextResponse.json(
        { error: "Price is required", code: "MISSING_PRICE" },
        { status: 400 },
      );
    }

    if (typeof body.price !== "number" || body.price < 0) {
      return NextResponse.json(
        { error: "Price must be a non-negative number", code: "INVALID_PRICE" },
        { status: 400 },
      );
    }

    // Sanitize and prepare data
    const now = new Date().toISOString();
    const insertData = {
      name: body.name.trim(),
      description: body.description.trim(),
      durationHours: body.durationHours.trim(),
      requiredPandits: body.requiredPandits,
      price: body.price,
      includesMaterials:
        body.includesMaterials !== undefined ? body.includesMaterials : true,
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: now,
      updatedAt: now,
    };

    const newRecord = await db.insert(poojas).values(insertData).returning();

    return NextResponse.json(newRecord[0], { status: 201 });
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

    // Check if record exists
    const existing = await db
      .select()
      .from(poojas)
      .where(eq(poojas.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Pooja not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const body = await request.json();

    // Validate if provided
    if (
      body.requiredPandits !== undefined &&
      (typeof body.requiredPandits !== "number" || body.requiredPandits < 0)
    ) {
      return NextResponse.json(
        {
          error: "Required pandits must be a non-negative number",
          code: "INVALID_REQUIRED_PANDITS",
        },
        { status: 400 },
      );
    }

    if (
      body.price !== undefined &&
      (typeof body.price !== "number" || body.price < 0)
    ) {
      return NextResponse.json(
        { error: "Price must be a non-negative number", code: "INVALID_PRICE" },
        { status: 400 },
      );
    }

    // Prepare update data
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.description !== undefined)
      updates.description = body.description.trim();
    if (body.durationHours !== undefined)
      updates.durationHours = body.durationHours.trim();
    if (body.requiredPandits !== undefined)
      updates.requiredPandits = body.requiredPandits;
    if (body.price !== undefined) updates.price = body.price;
    if (body.includesMaterials !== undefined)
      updates.includesMaterials = body.includesMaterials;
    if (body.isActive !== undefined) updates.isActive = body.isActive;

    const updated = await db
      .update(poojas)
      .set(updates)
      .where(eq(poojas.id, parseInt(id)))
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

    // Check if record exists
    const existing = await db
      .select()
      .from(poojas)
      .where(eq(poojas.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Pooja not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const deleted = await db
      .delete(poojas)
      .where(eq(poojas.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "Pooja deleted successfully",
        deleted: deleted[0],
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
