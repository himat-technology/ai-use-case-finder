import OpenAI from "openai";
import { SYSTEM_PROMPT, buildAnalysisPrompt } from "@/lib/prompts/analysis";
import { aiAnalysisSchema, type AiAnalysisPayload } from "@/lib/ai/schema";
import { generateDemoAnalysis } from "@/lib/ai/demo";
import {
  aggregateScores,
  buildCategoryBreakdown,
  enrichUseCaseScores,
} from "@/lib/scoring";
import { generateId } from "@/lib/utils";
import type { AnalysisResponse, BusinessProfile, UseCase } from "@/types";

const MAX_RETRIES = 2;

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced?.[1]) {
      return JSON.parse(fenced[1].trim());
    }
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Unable to parse AI response as JSON");
  }
}

function normalizeUseCases(
  useCases: AiAnalysisPayload["useCases"],
  profile: BusinessProfile
): UseCase[] {
  const mapped: UseCase[] = useCases.map((uc, index) => ({
    ...uc,
    id: uc.id || generateId(`uc_${index + 1}`),
    recommendedTools: uc.recommendedTools ?? [],
    opportunityScore: {
      potentialRoi: uc.opportunityScore.potentialRoi,
      easeOfImplementation: uc.opportunityScore.easeOfImplementation,
      strategicImpact: uc.opportunityScore.strategicImpact,
      timeToValue: uc.opportunityScore.timeToValue,
      overall:
        uc.opportunityScore.overall ??
        Math.round(
          uc.opportunityScore.potentialRoi * 0.3 +
            uc.opportunityScore.easeOfImplementation * 0.2 +
            uc.opportunityScore.strategicImpact * 0.3 +
            uc.opportunityScore.timeToValue * 0.2
        ),
    },
  }));

  return enrichUseCaseScores(mapped, profile);
}

async function callOpenAI(
  profile: BusinessProfile
): Promise<AiAnalysisPayload> {
  const client = getClient();
  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const completion = await client.chat.completions.create({
        model,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildAnalysisPrompt(profile) },
        ],
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      const parsed = extractJson(content);
      return aiAnalysisSchema.parse(parsed);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("OpenAI analysis failed");
}

function toResponse(
  payload: AiAnalysisPayload,
  profile: BusinessProfile,
  source: "openai" | "demo"
): AnalysisResponse {
  const useCases = normalizeUseCases(payload.useCases, profile);
  const scores = aggregateScores(useCases);
  const categoryBreakdown = buildCategoryBreakdown(useCases);

  return {
    success: true,
    summary: {
      ...payload.summary,
      overallOpportunityScore:
        payload.summary.overallOpportunityScore || scores.overall,
    },
    useCases: useCases.sort((a, b) => b.priorityScore - a.priorityScore),
    roadmap: payload.roadmap.sort((a, b) => a.phase - b.phase),
    toolRecommendations: payload.toolRecommendations,
    scores: {
      ...scores,
      overall: payload.summary.overallOpportunityScore || scores.overall,
    },
    categoryBreakdown,
    meta: {
      source,
      generatedAt: new Date().toISOString(),
    },
  };
}

export async function analyzeBusinessProfile(
  profile: BusinessProfile
): Promise<AnalysisResponse> {
  const forceDemo = process.env.FORCE_DEMO_MODE === "true";
  const hasKey = Boolean(process.env.OPENAI_API_KEY);

  if (forceDemo || !hasKey) {
    const demo = generateDemoAnalysis(profile);
    return toResponse(demo, profile, "demo");
  }

  try {
    const payload = await callOpenAI(profile);
    return toResponse(payload, profile, "openai");
  } catch (error) {
    console.error("OpenAI analysis failed, falling back to demo:", error);
    const demo = generateDemoAnalysis(profile);
    const response = toResponse(demo, profile, "demo");
    response.meta = {
      source: "demo",
      generatedAt: new Date().toISOString(),
    };
    return response;
  }
}
