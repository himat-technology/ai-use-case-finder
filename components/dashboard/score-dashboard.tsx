import type { AnalysisResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreDashboardProps {
  result: AnalysisResponse;
}

export function OpportunityScoreDashboard({ result }: ScoreDashboardProps) {
  const { scores } = result;

  const cards = [
    {
      title: "Overall Opportunity",
      value: scores.overall,
      hint: "Weighted across ROI, ease, impact, and speed",
    },
    {
      title: "Potential ROI",
      value: scores.averageRoi,
      hint: "Expected business return potential",
    },
    {
      title: "Ease of Implementation",
      value: scores.averageEase,
      hint: "Feasibility for your company size",
    },
    {
      title: "Strategic Impact",
      value: scores.averageStrategic,
      hint: "Alignment with goals and growth",
    },
    {
      title: "Time to Value",
      value: scores.averageTimeToValue,
      hint: "How quickly benefits can appear",
    },
  ];

  return (
    <section id="scores" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">
          Opportunity Score Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Composite scoring based on impact, feasibility, and speed to value.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-display text-3xl font-semibold text-teal-900">
                {card.value}
              </p>
              <Progress value={card.value} />
              <p className="text-xs text-slate-500">{card.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
