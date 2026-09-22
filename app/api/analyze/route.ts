import { NextResponse } from "next/server";
import { analyzeBusinessProfile } from "@/lib/ai/analyze";
import { businessProfileSchema } from "@/lib/ai/schema";
import type { BusinessProfile } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON body",
        },
        { status: 400 }
      );
    }

    const parsed = businessProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const profile = parsed.data as BusinessProfile;
    const result = await analyzeBusinessProfile(profile);

    return NextResponse.json(result);
  } catch (error) {
    console.error("/api/analyze error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze business profile",
      },
      { status: 500 }
    );
  }
}
