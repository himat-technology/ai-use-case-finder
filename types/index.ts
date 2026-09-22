export type Industry =
  | "E-commerce"
  | "Healthcare"
  | "Manufacturing"
  | "Education"
  | "SaaS"
  | "Finance"
  | "Real Estate"
  | "Logistics"
  | "Marketing Agency"
  | "Retail"
  | "Hospitality"
  | "Legal";

export type CompanySize =
  | "Solo"
  | "2-10"
  | "11-50"
  | "51-200"
  | "200+";

export type BusinessFunction =
  | "Sales"
  | "Marketing"
  | "Customer Support"
  | "HR"
  | "Operations"
  | "Finance"
  | "Product Development"
  | "IT"
  | "Procurement";

export type Challenge =
  | "Manual work"
  | "Slow response times"
  | "High operational costs"
  | "Lead generation issues"
  | "Customer support load"
  | "Reporting inefficiencies"
  | "Content production"
  | "Data analysis"
  | "Employee productivity";

export type Goal =
  | "Reduce costs"
  | "Increase revenue"
  | "Improve customer experience"
  | "Scale operations"
  | "Increase efficiency"
  | "Improve decision making"
  | "Automate repetitive tasks";

export type UseCaseCategory =
  | "Automation"
  | "Customer Experience"
  | "Marketing"
  | "Sales"
  | "Operations"
  | "Analytics";

export type ImplementationDifficulty = "Easy" | "Medium" | "Advanced";

export interface BusinessProfile {
  industry: Industry;
  companySize: CompanySize;
  businessFunction: BusinessFunction;
  challenges: Challenge[];
  goals: Goal[];
  currentTools?: string;
  additionalContext?: string;
}

export interface OpportunityScore {
  potentialRoi: number;
  easeOfImplementation: number;
  strategicImpact: number;
  timeToValue: number;
  overall: number;
}

export interface BusinessImpact {
  timeSavings: string;
  costReduction: string;
  productivityGains: string;
  revenueOpportunities: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  category: UseCaseCategory;
  businessImpact: BusinessImpact;
  implementationDifficulty: ImplementationDifficulty;
  priorityScore: number;
  opportunityScore: OpportunityScore;
  recommendedTools: string[];
}

export interface ToolRecommendation {
  name: string;
  category: string;
  description: string;
  relevance: string;
  relatedUseCases: string[];
}

export interface RoadmapPhase {
  phase: 1 | 2 | 3;
  title: string;
  timeline: string;
  actions: string[];
  expectedOutcomes: string[];
  recommendedTools: string[];
  estimatedEffort: string;
}

export interface ExecutiveSummary {
  overview: string;
  currentOpportunities: string[];
  keyAdoptionAreas: string[];
  estimatedBenefits: string[];
  recommendedNextSteps: string[];
  overallOpportunityScore: number;
}

export interface AnalysisHistory {
  id: string;
  industry: string;
  businessFunction: string;
  createdAt: string;
  overallScore: number;
  summaryPreview: string;
}

export interface AnalysisResponse {
  success: boolean;
  summary: ExecutiveSummary;
  useCases: UseCase[];
  roadmap: RoadmapPhase[];
  toolRecommendations: ToolRecommendation[];
  scores: {
    averageRoi: number;
    averageEase: number;
    averageStrategic: number;
    averageTimeToValue: number;
    overall: number;
  };
  categoryBreakdown: Record<UseCaseCategory, number>;
  meta?: {
    source: "openai" | "demo";
    generatedAt: string;
  };
  error?: string;
}

export const INDUSTRIES: Industry[] = [
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
];

export const COMPANY_SIZES: { value: CompanySize; label: string }[] = [
  { value: "Solo", label: "Solo" },
  { value: "2-10", label: "2–10 Employees" },
  { value: "11-50", label: "11–50 Employees" },
  { value: "51-200", label: "51–200 Employees" },
  { value: "200+", label: "200+ Employees" },
];

export const BUSINESS_FUNCTIONS: BusinessFunction[] = [
  "Sales",
  "Marketing",
  "Customer Support",
  "HR",
  "Operations",
  "Finance",
  "Product Development",
  "IT",
  "Procurement",
];

export const CHALLENGES: Challenge[] = [
  "Manual work",
  "Slow response times",
  "High operational costs",
  "Lead generation issues",
  "Customer support load",
  "Reporting inefficiencies",
  "Content production",
  "Data analysis",
  "Employee productivity",
];

export const GOALS: Goal[] = [
  "Reduce costs",
  "Increase revenue",
  "Improve customer experience",
  "Scale operations",
  "Increase efficiency",
  "Improve decision making",
  "Automate repetitive tasks",
];

export const USE_CASE_CATEGORIES: UseCaseCategory[] = [
  "Automation",
  "Customer Experience",
  "Marketing",
  "Sales",
  "Operations",
  "Analytics",
];
