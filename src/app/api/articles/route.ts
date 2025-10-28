import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq, like, or, and, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Single article by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: "Valid ID is required", code: "INVALID_ID" },
          { status: 400 },
        );
      }

      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.id, parseInt(id)))
        .limit(1);

      if (article.length === 0) {
        return NextResponse.json(
          { error: "Article not found", code: "ARTICLE_NOT_FOUND" },
          { status: 404 },
        );
      }

      return NextResponse.json(article[0], { status: 200 });
    }

    // List articles with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    let query = db.select().from(articles);

    // Build filter conditions
    const conditions = [];

    // Search filter
    if (search) {
      conditions.push(
        or(
          like(articles.title, `%${search}%`),
          like(articles.excerpt, `%${search}%`),
          like(articles.author, `%${search}%`),
        ),
      );
    }

    // Category filter
    if (category) {
      conditions.push(eq(articles.category, category));
    }

    // Published filter
    if (published !== null && published !== undefined) {
      const isPublished = published === "true";
      conditions.push(eq(articles.isPublished, isPublished));
    }

    // Apply all conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(articles.createdAt))
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
      excerpt,
      content,
      author,
      category,
      readTime,
      isPublished,
      views,
    } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !author || !category || !readTime) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, excerpt, content, author, category, readTime",
          code: "MISSING_REQUIRED_FIELDS",
        },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category.trim(),
      readTime: readTime.trim(),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : false,
      views: views !== undefined ? parseInt(views) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert new article
    const newArticle = await db
      .insert(articles)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newArticle[0], { status: 201 });
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if article exists
    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, parseInt(id)))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { error: "Article not found", code: "ARTICLE_NOT_FOUND" },
        { status: 404 },
      );
    }

    const body = await request.json();

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    // Sanitize and add provided fields
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt.trim();
    if (body.content !== undefined) updates.content = body.content.trim();
    if (body.author !== undefined) updates.author = body.author.trim();
    if (body.category !== undefined) updates.category = body.category.trim();
    if (body.readTime !== undefined) updates.readTime = body.readTime.trim();
    if (body.isPublished !== undefined)
      updates.isPublished = Boolean(body.isPublished);
    if (body.views !== undefined) updates.views = parseInt(body.views);

    // Update article
    const updatedArticle = await db
      .update(articles)
      .set(updates)
      .where(eq(articles.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedArticle[0], { status: 200 });
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid ID is required", code: "INVALID_ID" },
        { status: 400 },
      );
    }

    // Check if article exists
    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, parseInt(id)))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { error: "Article not found", code: "ARTICLE_NOT_FOUND" },
        { status: 404 },
      );
    }

    // Delete article
    const deletedArticle = await db
      .delete(articles)
      .where(eq(articles.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "Article deleted successfully",
        article: deletedArticle[0],
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
