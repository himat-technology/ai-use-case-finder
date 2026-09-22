import type { BusinessProfile, UseCase, UseCaseCategory } from "@/types";
import { calculateOpportunityScore } from "@/lib/scoring";
import { generateId } from "@/lib/utils";

interface UseCaseTemplate {
  title: string;
  description: string;
  category: UseCaseCategory;
  difficulty: "Easy" | "Medium" | "Advanced";
  tools: string[];
  challenges: string[];
  goals: string[];
  functions: string[];
  impact: {
    timeSavings: string;
    costReduction: string;
    productivityGains: string;
    revenueOpportunities: string;
  };
  scores: {
    potentialRoi: number;
    easeOfImplementation: number;
    strategicImpact: number;
    timeToValue: number;
  };
}

const TEMPLATES: UseCaseTemplate[] = [
  {
    title: "Automated Customer Support Assistant",
    description:
      "Deploy an AI assistant that resolves common inquiries, routes complex tickets, and drafts replies for agents. Reduces wait times while improving consistency across channels.",
    category: "Customer Experience",
    difficulty: "Medium",
    tools: ["Intercom", "Zendesk AI", "Freshdesk AI"],
    challenges: ["Customer support load", "Slow response times"],
    goals: ["Improve customer experience", "Reduce costs", "Increase efficiency"],
    functions: ["Customer Support", "Operations"],
    impact: {
      timeSavings: "30–50% reduction in first-response handling time",
      costReduction: "20–35% lower support cost per ticket",
      productivityGains: "Agents focus on complex, high-value cases",
      revenueOpportunities: "Higher retention via faster resolution",
    },
    scores: {
      potentialRoi: 82,
      easeOfImplementation: 70,
      strategicImpact: 78,
      timeToValue: 75,
    },
  },
  {
    title: "AI Lead Scoring & Qualification",
    description:
      "Score inbound and outbound leads using behavioral, firmographic, and engagement signals. Prioritize sales outreach and auto-route hot leads to the right rep.",
    category: "Sales",
    difficulty: "Medium",
    tools: ["HubSpot AI", "Salesforce Einstein", "Clay"],
    challenges: ["Lead generation issues", "Manual work", "Employee productivity"],
    goals: ["Increase revenue", "Increase efficiency", "Improve decision making"],
    functions: ["Sales", "Marketing"],
    impact: {
      timeSavings: "5–10 hours/week saved on lead triage",
      costReduction: "Lower CAC via better targeting",
      productivityGains: "Reps spend more time on qualified opportunities",
      revenueOpportunities: "10–25% lift in conversion from prioritized pipeline",
    },
    scores: {
      potentialRoi: 88,
      easeOfImplementation: 68,
      strategicImpact: 85,
      timeToValue: 70,
    },
  },
  {
    title: "Content Generation & Campaign Studio",
    description:
      "Generate briefs, drafts, variants, and localized assets for campaigns. Maintain brand voice while accelerating production for web, email, and social.",
    category: "Marketing",
    difficulty: "Easy",
    tools: ["ChatGPT", "Claude", "Jasper"],
    challenges: ["Content production", "Manual work", "Employee productivity"],
    goals: ["Scale operations", "Increase efficiency", "Increase revenue"],
    functions: ["Marketing", "Sales"],
    impact: {
      timeSavings: "40–60% faster content production cycles",
      costReduction: "Reduced freelance and agency spend",
      productivityGains: "Marketers focus on strategy and creative direction",
      revenueOpportunities: "More experiments → higher campaign ROI",
    },
    scores: {
      potentialRoi: 76,
      easeOfImplementation: 88,
      strategicImpact: 72,
      timeToValue: 90,
    },
  },
  {
    title: "Workflow & Data Entry Automation",
    description:
      "Automate repetitive handoffs between tools—order updates, CRM syncs, invoice drafts, and status notifications—using AI-assisted workflows and document extraction.",
    category: "Automation",
    difficulty: "Easy",
    tools: ["Zapier", "Make", "n8n"],
    challenges: ["Manual work", "High operational costs", "Reporting inefficiencies"],
    goals: ["Automate repetitive tasks", "Reduce costs", "Increase efficiency"],
    functions: ["Operations", "Finance", "IT", "HR", "Procurement"],
    impact: {
      timeSavings: "10–20 hours/week recovered across teams",
      costReduction: "Fewer errors and rework costs",
      productivityGains: "Staff capacity redirected to higher-value work",
      revenueOpportunities: "Faster cycle times improve throughput",
    },
    scores: {
      potentialRoi: 80,
      easeOfImplementation: 85,
      strategicImpact: 70,
      timeToValue: 88,
    },
  },
  {
    title: "Predictive Operations Forecasting",
    description:
      "Use historical and real-time data to forecast demand, staffing, inventory, or capacity. Surface anomalies early and recommend corrective actions.",
    category: "Operations",
    difficulty: "Advanced",
    tools: ["Power BI", "Tableau", "Looker"],
    challenges: ["Data analysis", "High operational costs", "Reporting inefficiencies"],
    goals: ["Improve decision making", "Scale operations", "Reduce costs"],
    functions: ["Operations", "Finance", "IT", "Product Development"],
    impact: {
      timeSavings: "Automated weekly forecasting replaces manual spreadsheets",
      costReduction: "5–15% waste reduction via better planning",
      productivityGains: "Managers get decision-ready insights daily",
      revenueOpportunities: "Fewer stockouts and missed service windows",
    },
    scores: {
      potentialRoi: 84,
      easeOfImplementation: 48,
      strategicImpact: 88,
      timeToValue: 50,
    },
  },
  {
    title: "Executive Insights Dashboard",
    description:
      "Consolidate KPIs into an AI-augmented analytics layer that explains trends, flags risks, and generates narrative summaries for leadership reviews.",
    category: "Analytics",
    difficulty: "Medium",
    tools: ["Power BI", "Tableau", "Looker"],
    challenges: ["Reporting inefficiencies", "Data analysis", "Employee productivity"],
    goals: ["Improve decision making", "Increase efficiency", "Scale operations"],
    functions: ["Finance", "Operations", "IT", "Product Development"],
    impact: {
      timeSavings: "Hours saved preparing weekly/monthly reports",
      costReduction: "Less analyst overtime on recurring packs",
      productivityGains: "Faster decisions with clearer narrative insights",
      revenueOpportunities: "Earlier detection of growth and churn signals",
    },
    scores: {
      potentialRoi: 78,
      easeOfImplementation: 62,
      strategicImpact: 80,
      timeToValue: 65,
    },
  },
  {
    title: "Personalized Recommendation Engine",
    description:
      "Recommend products, services, or next-best actions based on customer behavior and context across web, email, and in-app experiences.",
    category: "Customer Experience",
    difficulty: "Advanced",
    tools: ["Dynamic Yield", "Segment", "Claude"],
    challenges: ["Lead generation issues", "Customer support load", "Data analysis"],
    goals: ["Increase revenue", "Improve customer experience", "Scale operations"],
    functions: ["Marketing", "Sales", "Product Development", "Customer Support"],
    impact: {
      timeSavings: "Automated merchandising and personalization rules",
      costReduction: "Lower wasted ad spend via better relevance",
      productivityGains: "Teams manage strategy instead of one-off rules",
      revenueOpportunities: "5–15% AOV / conversion uplift potential",
    },
    scores: {
      potentialRoi: 86,
      easeOfImplementation: 45,
      strategicImpact: 82,
      timeToValue: 48,
    },
  },
  {
    title: "Proposal & Document Copilot",
    description:
      "Draft proposals, SOWs, RFPs, and client updates from templates and CRM context. Keep pricing, tone, and compliance language consistent.",
    category: "Sales",
    difficulty: "Easy",
    tools: ["ChatGPT", "Claude", "Notion AI"],
    challenges: ["Manual work", "Slow response times", "Employee productivity"],
    goals: ["Increase revenue", "Increase efficiency", "Automate repetitive tasks"],
    functions: ["Sales", "Legal", "Marketing", "Procurement"],
    impact: {
      timeSavings: "50–70% faster proposal turnaround",
      costReduction: "Reduced rewrite and review cycles",
      productivityGains: "Sellers ship more proposals per week",
      revenueOpportunities: "Higher win rate from faster, tailored responses",
    },
    scores: {
      potentialRoi: 74,
      easeOfImplementation: 86,
      strategicImpact: 68,
      timeToValue: 88,
    },
  },
  {
    title: "Intelligent Process Monitoring",
    description:
      "Monitor key operational workflows with AI anomaly detection. Alert owners when SLAs slip, bottlenecks form, or quality metrics degrade.",
    category: "Operations",
    difficulty: "Medium",
    tools: ["n8n", "Datadog", "Power BI"],
    challenges: ["High operational costs", "Slow response times", "Data analysis"],
    goals: ["Scale operations", "Increase efficiency", "Improve decision making"],
    functions: ["Operations", "IT", "Customer Support"],
    impact: {
      timeSavings: "Earlier issue detection cuts firefighting time",
      costReduction: "Prevent costly escalations and rework",
      productivityGains: "Ops teams act on prioritized alerts",
      revenueOpportunities: "Higher reliability improves customer trust",
    },
    scores: {
      potentialRoi: 79,
      easeOfImplementation: 58,
      strategicImpact: 76,
      timeToValue: 60,
    },
  },
];

function scoreTemplate(
  template: UseCaseTemplate,
  profile: BusinessProfile
): number {
  let score = 40;
  for (const c of profile.challenges) {
    if (template.challenges.includes(c)) score += 12;
  }
  for (const g of profile.goals) {
    if (template.goals.includes(g)) score += 10;
  }
  if (template.functions.includes(profile.businessFunction)) score += 18;
  if (
    profile.industry === "E-commerce" &&
    (template.category === "Customer Experience" ||
      template.category === "Marketing")
  ) {
    score += 8;
  }
  if (
    profile.industry === "Healthcare" &&
    template.category === "Operations"
  ) {
    score += 6;
  }
  if (profile.industry === "SaaS" && template.category === "Sales") {
    score += 6;
  }
  return score;
}

export function generateDemoAnalysis(profile: BusinessProfile) {
  const ranked = TEMPLATES.map((template) => ({
    template,
    fit: scoreTemplate(template, profile),
  }))
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 7);

  const useCases: UseCase[] = ranked.map(({ template }, index) => {
    const opportunityScore = calculateOpportunityScore(template.scores);
    return {
      id: generateId("uc"),
      title: template.title,
      description: `${template.description} Tailored for ${profile.industry} ${profile.businessFunction.toLowerCase()} teams at a ${profile.companySize} company size.`,
      category: template.category,
      businessImpact: template.impact,
      implementationDifficulty: template.difficulty,
      priorityScore: Math.min(
        98,
        Math.round(opportunityScore.overall + (7 - index) * 1.5)
      ),
      opportunityScore,
      recommendedTools: template.tools,
    };
  });

  const topTitles = useCases.slice(0, 3).map((u) => u.title);
  const toolMap = new Map<
    string,
    {
      name: string;
      category: string;
      description: string;
      relevance: string;
      relatedUseCases: string[];
    }
  >();

  const toolMeta: Record<
    string,
    { category: string; description: string }
  > = {
    ChatGPT: {
      category: "Content Creation",
      description: "General-purpose LLM for drafting, analysis, and copilots.",
    },
    Claude: {
      category: "Content Creation",
      description: "Strong reasoning and long-context assistant for documents and analysis.",
    },
    Jasper: {
      category: "Content Creation",
      description: "Marketing-focused generative content platform.",
    },
    Zapier: {
      category: "Automation",
      description: "No-code automation connecting thousands of SaaS apps.",
    },
    Make: {
      category: "Automation",
      description: "Visual workflow automation for multi-step processes.",
    },
    n8n: {
      category: "Automation",
      description: "Flexible open-source workflow automation.",
    },
    "Power BI": {
      category: "Analytics",
      description: "Microsoft BI platform for dashboards and reporting.",
    },
    Tableau: {
      category: "Analytics",
      description: "Enterprise visualization and analytics suite.",
    },
    Looker: {
      category: "Analytics",
      description: "Governed semantic-layer analytics for teams.",
    },
    Intercom: {
      category: "Customer Support",
      description: "Conversational support and AI inbox for customer teams.",
    },
    "Zendesk AI": {
      category: "Customer Support",
      description: "AI-assisted ticketing, macros, and agent assist.",
    },
    "Freshdesk AI": {
      category: "Customer Support",
      description: "AI helpdesk automation and agent productivity tools.",
    },
    "HubSpot AI": {
      category: "Sales",
      description: "CRM-native AI for content, scoring, and outreach.",
    },
    "Salesforce Einstein": {
      category: "Sales",
      description: "Predictive CRM intelligence for pipeline and service.",
    },
    Clay: {
      category: "Sales",
      description: "Data enrichment and outbound research automation.",
    },
    "Notion AI": {
      category: "Content Creation",
      description: "Workspace AI for docs, wikis, and knowledge work.",
    },
    "Dynamic Yield": {
      category: "Customer Experience",
      description: "Personalization and experimentation platform.",
    },
    Segment: {
      category: "Analytics",
      description: "Customer data platform for unified event streams.",
    },
    Datadog: {
      category: "Operations",
      description: "Observability platform with alerting and monitoring.",
    },
  };

  for (const uc of useCases) {
    for (const tool of uc.recommendedTools) {
      const existing = toolMap.get(tool);
      if (existing) {
        existing.relatedUseCases.push(uc.title);
      } else {
        const meta = toolMeta[tool] ?? {
          category: "AI Tools",
          description: `${tool} supports AI-enabled workflows.`,
        };
        toolMap.set(tool, {
          name: tool,
          category: meta.category,
          description: meta.description,
          relevance: `Strong fit for ${profile.industry} ${profile.businessFunction.toLowerCase()} initiatives.`,
          relatedUseCases: [uc.title],
        });
      }
    }
  }

  const overall = Math.round(
    useCases.reduce((s, u) => s + u.opportunityScore.overall, 0) / useCases.length
  );

  return {
    summary: {
      overview: `Based on your ${profile.industry} profile focusing on ${profile.businessFunction}, there is a strong near-term opportunity to adopt AI across ${profile.challenges.slice(0, 2).join(" and ").toLowerCase()}. Priority should go to high-feasibility automations that directly support goals like ${profile.goals.slice(0, 2).join(" and ").toLowerCase()}.`,
      currentOpportunities: topTitles.map(
        (t) => `${t} aligned to ${profile.businessFunction}`
      ),
      keyAdoptionAreas: [
        ...new Set(useCases.slice(0, 4).map((u) => u.category)),
      ],
      estimatedBenefits: [
        "Recover 10–20 hours/week through automation of repetitive work",
        "Improve response quality and speed for customer-facing workflows",
        "Create a repeatable AI roadmap from quick wins to scalable systems",
      ],
      recommendedNextSteps: [
        "Pilot the top 2 quick-win use cases within 30 days",
        "Connect existing tools via lightweight automation before building custom models",
        "Define KPIs (time saved, conversion, cost/ticket) and review weekly",
        "Expand successful pilots into a cross-functional AI operating cadence",
      ],
      overallOpportunityScore: overall,
    },
    useCases,
    roadmap: [
      {
        phase: 1 as const,
        title: "Quick Wins",
        timeline: "0–30 Days",
        actions: [
          `Pilot ${useCases[0]?.title ?? "top use case"} with a small team`,
          "Map current workflows and identify high-volume manual steps",
          "Stand up basic automation and content copilots for daily work",
        ],
        expectedOutcomes: [
          "First measurable time savings",
          "Team confidence with AI tooling",
          "Validated use-case shortlist",
        ],
        recommendedTools: useCases[0]?.recommendedTools.slice(0, 3) ?? [
          "ChatGPT",
          "Zapier",
        ],
        estimatedEffort: "Low–Medium (1–2 people part-time)",
      },
      {
        phase: 2 as const,
        title: "Optimization",
        timeline: "1–3 Months",
        actions: [
          `Operationalize ${useCases[1]?.title ?? "second priority use case"}`,
          "Integrate CRM/helpdesk data for scoring and insights",
          "Establish prompt libraries, review checklists, and success metrics",
        ],
        expectedOutcomes: [
          "Consistent AI-assisted workflows",
          "Improved conversion or support KPIs",
          "Reduced manual reporting load",
        ],
        recommendedTools: [
          ...new Set(
            useCases
              .slice(0, 3)
              .flatMap((u) => u.recommendedTools)
              .slice(0, 4)
          ),
        ],
        estimatedEffort: "Medium (cross-functional ownership)",
      },
      {
        phase: 3 as const,
        title: "Scale",
        timeline: "3–12 Months",
        actions: [
          "Expand successful pilots across teams and regions",
          "Add forecasting, personalization, or advanced analytics layers",
          "Formalize AI governance, training, and vendor evaluation",
        ],
        expectedOutcomes: [
          "Org-wide productivity lift",
          "Compounding ROI from connected use cases",
          "Sustainable AI operating model",
        ],
        recommendedTools: Array.from(toolMap.keys()).slice(0, 5),
        estimatedEffort: "Medium–High (program-level investment)",
      },
    ],
    toolRecommendations: Array.from(toolMap.values()).slice(0, 8),
  };
}
