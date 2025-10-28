import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq, like, and, or, desc } from "drizzle-orm";

const VALID_SERVICE_TYPES = ["astrologer", "pandit", "pooja", "course"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Single booking by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: "Valid ID is required", code: "INVALID_ID" },
          { status: 400 },
        );
      }

      const booking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, parseInt(id)))
        .limit(1);

      if (booking.length === 0) {
        return NextResponse.json(
          { error: "Booking not found", code: "BOOKING_NOT_FOUND" },
          { status: 404 },
        );
      }

      return NextResponse.json(booking[0], { status: 200 });
    }

    // List bookings with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");

    let query = db.select().from(bookings);

    const conditions = [];

    // Search functionality
    if (search) {
      conditions.push(
        or(
          like(bookings.customerName, `%${search}%`),
          like(bookings.customerEmail, `%${search}%`),
        ),
      );
    }

    // Filter by status
    if (status) {
      conditions.push(eq(bookings.status, status));
    }

    // Filter by serviceType
    if (serviceType) {
      conditions.push(eq(bookings.serviceType, serviceType));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(bookings.createdAt))
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

    // Validate required fields
    const requiredFields = [
      "customerName",
      "customerEmail",
      "customerPhone",
      "serviceType",
      "serviceId",
      "bookingDate",
      "bookingTime",
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

    // Validate serviceType
    if (!VALID_SERVICE_TYPES.includes(body.serviceType)) {
      return NextResponse.json(
        {
          error: `serviceType must be one of: ${VALID_SERVICE_TYPES.join(", ")}`,
          code: "INVALID_SERVICE_TYPE",
        },
        { status: 400 },
      );
    }

    // Validate serviceId is a number
    if (isNaN(parseInt(body.serviceId))) {
      return NextResponse.json(
        {
          error: "serviceId must be a valid number",
          code: "INVALID_SERVICE_ID",
        },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail.trim().toLowerCase(),
      customerPhone: body.customerPhone.trim(),
      serviceType: body.serviceType.trim(),
      serviceId: parseInt(body.serviceId),
      bookingDate: body.bookingDate.trim(),
      bookingTime: body.bookingTime.trim(),
      status: body.status?.trim() || "pending",
      paymentStatus: body.paymentStatus?.trim() || "pending",
      notes: body.notes?.trim() || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newBooking = await db
      .insert(bookings)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newBooking[0], { status: 201 });
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if booking exists
    const existingBooking = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, parseInt(id)))
      .limit(1);

    if (existingBooking.length === 0) {
      return NextResponse.json(
        { error: "Booking not found", code: "BOOKING_NOT_FOUND" },
        { status: 404 },
      );
    }

    const body = await request.json();

    // Validate serviceType if provided
    if (body.serviceType && !VALID_SERVICE_TYPES.includes(body.serviceType)) {
      return NextResponse.json(
        {
          error: `serviceType must be one of: ${VALID_SERVICE_TYPES.join(", ")}`,
          code: "INVALID_SERVICE_TYPE",
        },
        { status: 400 },
      );
    }

    // Validate serviceId if provided
    if (body.serviceId && isNaN(parseInt(body.serviceId))) {
      return NextResponse.json(
        {
          error: "serviceId must be a valid number",
          code: "INVALID_SERVICE_ID",
        },
        { status: 400 },
      );
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    // Add fields to update if they exist in the request body
    if (body.customerName) updateData.customerName = body.customerName.trim();
    if (body.customerEmail)
      updateData.customerEmail = body.customerEmail.trim().toLowerCase();
    if (body.customerPhone)
      updateData.customerPhone = body.customerPhone.trim();
    if (body.serviceType) updateData.serviceType = body.serviceType.trim();
    if (body.serviceId) updateData.serviceId = parseInt(body.serviceId);
    if (body.bookingDate) updateData.bookingDate = body.bookingDate.trim();
    if (body.bookingTime) updateData.bookingTime = body.bookingTime.trim();
    if (body.status) updateData.status = body.status.trim();
    if (body.paymentStatus)
      updateData.paymentStatus = body.paymentStatus.trim();
    if (body.notes !== undefined)
      updateData.notes = body.notes ? body.notes.trim() : null;

    const updatedBooking = await db
      .update(bookings)
      .set(updateData)
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    if (updatedBooking.length === 0) {
      return NextResponse.json(
        { error: "Booking not found", code: "BOOKING_NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedBooking[0], { status: 200 });
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if booking exists
    const existingBooking = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, parseInt(id)))
      .limit(1);

    if (existingBooking.length === 0) {
      return NextResponse.json(
        { error: "Booking not found", code: "BOOKING_NOT_FOUND" },
        { status: 404 },
      );
    }

    const deletedBooking = await db
      .delete(bookings)
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "Booking deleted successfully",
        booking: deletedBooking[0],
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
