"use client";

import { useMemo, useState } from "react";
import type { AnalysisResponse, UseCaseCategory } from "@/types";
import { USE_CASE_CATEGORIES } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UseCasesGridProps {
  result: AnalysisResponse;
}

function difficultyVariant(level: string) {
  if (level === "Easy") return "success" as const;
  if (level === "Medium") return "warning" as const;
  return "secondary" as const;
}

export function UseCasesGrid({ result }: UseCasesGridProps) {
  const [category, setCategory] = useState<UseCaseCategory | "All">("All");

  const filtered = useMemo(() => {
    if (category === "All") return result.useCases;
    return result.useCases.filter((uc) => uc.category === category);
  }, [category, result.useCases]);

  return (
    <section id="use-cases" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">
          Prioritized AI Use Cases
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Filter by category to explore automation, CX, marketing, sales,
          operations, and analytics opportunities.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={category === "All" ? "default" : "outline"}
          onClick={() => setCategory("All")}
        >
          All
        </Button>
        {USE_CASE_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
          >
            {cat}
            {result.categoryBreakdown[cat]
              ? ` (${result.categoryBreakdown[cat]})`
              : ""}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((uc) => (
          <Card key={uc.id} className="flex flex-col">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{uc.category}</Badge>
                <Badge variant={difficultyVariant(uc.implementationDifficulty)}>
                  {uc.implementationDifficulty}
                </Badge>
                <Badge variant="outline">Priority {uc.priorityScore}</Badge>
              </div>
              <CardTitle className="text-lg leading-snug">{uc.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm leading-relaxed text-slate-600">
                {uc.description}
              </p>

              <div className="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm">
                <p>
                  <span className="font-medium text-slate-800">Time savings:</span>{" "}
                  {uc.businessImpact.timeSavings}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Cost reduction:</span>{" "}
                  {uc.businessImpact.costReduction}
                </p>
                <p>
                  <span className="font-medium text-slate-800">
                    Productivity:
                  </span>{" "}
                  {uc.businessImpact.productivityGains}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Revenue:</span>{" "}
                  {uc.businessImpact.revenueOpportunities}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Opportunity score</span>
                  <span className="font-medium">
                    {uc.opportunityScore.overall}/100
                  </span>
                </div>
                <Progress value={uc.opportunityScore.overall} />
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-4">
                  <span>ROI {uc.opportunityScore.potentialRoi}</span>
                  <span>Ease {uc.opportunityScore.easeOfImplementation}</span>
                  <span>Impact {uc.opportunityScore.strategicImpact}</span>
                  <span>TTV {uc.opportunityScore.timeToValue}</span>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {uc.recommendedTools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No use cases in this category.
        </p>
      )}
    </section>
  );
}
