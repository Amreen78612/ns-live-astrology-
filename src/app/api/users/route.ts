import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Single user by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          {
            error: "Valid ID is required",
            code: "INVALID_ID",
          },
          { status: 400 },
        );
      }

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(id)))
        .limit(1);

      if (user.length === 0) {
        return NextResponse.json(
          {
            error: "User not found",
            code: "USER_NOT_FOUND",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(user[0], { status: 200 });
    }

    // List users with pagination and search
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");

    let query = db.select().from(users);

    if (search) {
      query = query.where(
        or(like(users.name, `%${search}%`), like(users.email, `%${search}%`)),
      );
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      {
        error: "Internal server error: " + error,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
          code: "MISSING_EMAIL",
        },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          error: "Password is required",
          code: "MISSING_PASSWORD",
        },
        { status: 400 },
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          error: "Name is required",
          code: "MISSING_NAME",
        },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();
    const userRole = role || "user";

    // Auto-generate timestamps
    const now = new Date().toISOString();

    // Insert new user
    const newUser = await db
      .insert(users)
      .values({
        email: sanitizedEmail,
        password: password,
        name: sanitizedName,
        role: userRole,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      {
        error: "Internal server error: " + error,
      },
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
        {
          error: "Valid ID is required",
          code: "INVALID_ID",
        },
        { status: 400 },
      );
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        {
          error: "User not found",
          code: "USER_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { email, password, name, role } = body;

    // Build update object with only provided fields
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (email !== undefined) {
      updates.email = email.trim().toLowerCase();
    }

    if (password !== undefined) {
      updates.password = password;
    }

    if (name !== undefined) {
      updates.name = name.trim();
    }

    if (role !== undefined) {
      updates.role = role;
    }

    // Update user
    const updatedUser = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedUser[0], { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      {
        error: "Internal server error: " + error,
      },
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
        {
          error: "Valid ID is required",
          code: "INVALID_ID",
        },
        { status: 400 },
      );
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        {
          error: "User not found",
          code: "USER_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    // Delete user
    const deleted = await db
      .delete(users)
      .where(eq(users.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "User deleted successfully",
        user: deleted[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      {
        error: "Internal server error: " + error,
      },
      { status: 500 },
    );
  }
}
