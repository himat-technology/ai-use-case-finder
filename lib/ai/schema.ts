import { z } from "zod";

export const businessProfileSchema = z.object({
  industry: z.enum([
    "E-commerce",
    "Healthcare",
    "Manufacturing",
    "Education",
    "SaaS",
    "Finance",
    "Real Estate",
    "Logistics",
    "Marketing Agency",
    "Retail",
    "Hospitality",
    "Legal",
  ]),
  companySize: z.enum(["Solo", "2-10", "11-50", "51-200", "200+"]),
  businessFunction: z.enum([
    "Sales",
    "Marketing",
    "Customer Support",
    "HR",
    "Operations",
    "Finance",
    "Product Development",
    "IT",
    "Procurement",
  ]),
  challenges: z
    .array(
      z.enum([
        "Manual work",
        "Slow response times",
        "High operational costs",
        "Lead generation issues",
        "Customer support load",
        "Reporting inefficiencies",
        "Content production",
        "Data analysis",
        "Employee productivity",
      ])
    )
    .min(1, "Select at least one challenge"),
  goals: z
    .array(
      z.enum([
        "Reduce costs",
        "Increase revenue",
        "Improve customer experience",
        "Scale operations",
        "Increase efficiency",
        "Improve decision making",
        "Automate repetitive tasks",
      ])
    )
    .min(1, "Select at least one goal"),
  currentTools: z.string().max(500).optional().or(z.literal("")),
  additionalContext: z.string().max(2000).optional().or(z.literal("")),
});

export const opportunityScoreSchema = z.object({
  potentialRoi: z.number().min(0).max(100),
  easeOfImplementation: z.number().min(0).max(100),
  strategicImpact: z.number().min(0).max(100),
  timeToValue: z.number().min(0).max(100),
  overall: z.number().min(0).max(100).optional(),
});

export const useCaseSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string().min(20),
  category: z.enum([
    "Automation",
    "Customer Experience",
    "Marketing",
    "Sales",
    "Operations",
    "Analytics",
  ]),
  businessImpact: z.object({
    timeSavings: z.string(),
    costReduction: z.string(),
    productivityGains: z.string(),
    revenueOpportunities: z.string(),
  }),
  implementationDifficulty: z.enum(["Easy", "Medium", "Advanced"]),
  priorityScore: z.number().min(1).max(100),
  opportunityScore: opportunityScoreSchema,
  recommendedTools: z.array(z.string()).default([]),
});

export const roadmapPhaseSchema = z.object({
  phase: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  title: z.string(),
  timeline: z.string(),
  actions: z.array(z.string()).min(1),
  expectedOutcomes: z.array(z.string()).min(1),
  recommendedTools: z.array(z.string()).default([]),
  estimatedEffort: z.string(),
});

export const toolRecommendationSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  relevance: z.string(),
  relatedUseCases: z.array(z.string()).default([]),
});

export const executiveSummarySchema = z.object({
  overview: z.string().min(20),
  currentOpportunities: z.array(z.string()).min(1),
  keyAdoptionAreas: z.array(z.string()).min(1),
  estimatedBenefits: z.array(z.string()).min(1),
  recommendedNextSteps: z.array(z.string()).min(1),
  overallOpportunityScore: z.number().min(0).max(100),
});

export const aiAnalysisSchema = z.object({
  summary: executiveSummarySchema,
  useCases: z.array(useCaseSchema).min(4).max(12),
  roadmap: z.array(roadmapPhaseSchema).min(3).max(3),
  toolRecommendations: z.array(toolRecommendationSchema).min(3),
});

export type BusinessProfileInput = z.infer<typeof businessProfileSchema>;
export type AiAnalysisPayload = z.infer<typeof aiAnalysisSchema>;
