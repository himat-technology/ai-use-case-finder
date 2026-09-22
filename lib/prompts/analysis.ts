import type { BusinessProfile } from "@/types";

export function buildAnalysisPrompt(profile: BusinessProfile): string {
  return `You are an enterprise AI transformation consultant.

Analyze the provided business profile.
Generate practical, actionable AI use cases tailored to this organization.

Business Profile:
- Industry: ${profile.industry}
- Company Size: ${profile.companySize}
- Business Function: ${profile.businessFunction}
- Primary Challenges: ${profile.challenges.join(", ")}
- Goals: ${profile.goals.join(", ")}
- Current Tools: ${profile.currentTools || "Not specified"}
- Additional Context: ${profile.additionalContext || "None"}

Generate:
- 6-8 AI use cases across relevant categories
- Impact analysis with quantified metrics where possible
- Priority ranking (1-100)
- Recommended tools for each use case and overall
- 3-phase implementation roadmap
- Executive summary suitable for stakeholders

Categories must be one of: Automation, Customer Experience, Marketing, Sales, Operations, Analytics
Difficulty must be one of: Easy, Medium, Advanced

Identify:
- High-value automation opportunities
- Productivity improvements
- Customer experience enhancements
- Revenue growth opportunities
- Process optimization ideas
- Decision-support use cases

Return valid JSON only matching this schema exactly:
{
  "summary": {
    "overview": "string",
    "currentOpportunities": ["string"],
    "keyAdoptionAreas": ["string"],
    "estimatedBenefits": ["string"],
    "recommendedNextSteps": ["string"],
    "overallOpportunityScore": 0
  },
  "useCases": [
    {
      "id": "uc_1",
      "title": "string",
      "description": "What it does, how it works, and why it matters",
      "category": "Automation",
      "businessImpact": {
        "timeSavings": "string",
        "costReduction": "string",
        "productivityGains": "string",
        "revenueOpportunities": "string"
      },
      "implementationDifficulty": "Easy",
      "priorityScore": 80,
      "opportunityScore": {
        "potentialRoi": 80,
        "easeOfImplementation": 75,
        "strategicImpact": 70,
        "timeToValue": 85,
        "overall": 77
      },
      "recommendedTools": ["Tool Name"]
    }
  ],
  "roadmap": [
    {
      "phase": 1,
      "title": "Quick Wins",
      "timeline": "0–30 Days",
      "actions": ["string"],
      "expectedOutcomes": ["string"],
      "recommendedTools": ["string"],
      "estimatedEffort": "string"
    },
    {
      "phase": 2,
      "title": "Optimization",
      "timeline": "1–3 Months",
      "actions": ["string"],
      "expectedOutcomes": ["string"],
      "recommendedTools": ["string"],
      "estimatedEffort": "string"
    },
    {
      "phase": 3,
      "title": "Scale",
      "timeline": "3–12 Months",
      "actions": ["string"],
      "expectedOutcomes": ["string"],
      "recommendedTools": ["string"],
      "estimatedEffort": "string"
    }
  ],
  "toolRecommendations": [
    {
      "name": "string",
      "category": "string",
      "description": "string",
      "relevance": "string",
      "relatedUseCases": ["use case title"]
    }
  ]
}`;
}

export const SYSTEM_PROMPT = `You are an enterprise AI transformation consultant specializing in practical AI adoption for businesses.
Always return valid JSON only. No markdown fences. No commentary.
Be specific to the industry and function provided. Avoid generic advice.
Quantify business impact where reasonable. Prioritize feasible, high-ROI opportunities.`;
