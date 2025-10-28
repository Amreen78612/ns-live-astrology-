import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/lib/drizzle";
import { aiReports } from "@/db/schema";
import { eq } from "drizzle-orm";

const openai = new OpenAI({ apiKey: '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' });

export async function POST(req: NextRequest) {
  try {
    const { name, dob, type, userId } = await req.json();
    const prompt = `Generate a detailed ${type} astrology report for ${name}, born on ${dob}.
    Include sections on career, health, love, and finance.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "system", content: prompt }],
    });

    const aiResult = completion.choices[0].message?.content || "AI Report unavailable.";

    await db
      .update(aiReports)
      .set({ data: aiResult })
      .where(eq(aiReports.userId, parseInt(userId)));

    return NextResponse.json({ success: true, report: aiResult });
  } catch (err: any) {
    console.error("AI Report Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
