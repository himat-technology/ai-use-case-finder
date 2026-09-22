import type { AnalysisResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ExecutiveSummaryProps {
  result: AnalysisResponse;
}

export function ExecutiveSummaryCard({ result }: ExecutiveSummaryProps) {
  const { summary, scores, meta } = result;

  return (
    <section id="executive-summary" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-teal-950">
            Executive Summary
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Stakeholder-ready overview of AI adoption opportunities.
          </p>
        </div>
        {meta && (
          <Badge variant={meta.source === "openai" ? "success" : "warning"}>
            {meta.source === "openai" ? "OpenAI analysis" : "Demo analysis"}
          </Badge>
        )}
      </div>

      <Card className="overflow-hidden border-teal-900/10">
        <CardHeader className="bg-gradient-to-r from-cyan-700 via-teal-700 to-fuchsia-700 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-xl text-white">
              Opportunity Snapshot
            </CardTitle>
            <div className="rounded-lg bg-white/15 px-4 py-2 text-center backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-cyan-100">
                Overall Score
              </p>
              <p className="font-display text-3xl font-semibold text-amber-200">
                {scores.overall}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-slate-700 leading-relaxed">{summary.overview}</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Current Opportunities
              </h3>
              <ul className="space-y-2">
                {summary.currentOpportunities.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Key Adoption Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {summary.keyAdoptionAreas.map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
              <h3 className="mb-2 mt-5 text-sm font-semibold text-slate-900">
                Estimated Benefits
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {summary.estimatedBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Score Components
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Potential ROI", value: scores.averageRoi },
                { label: "Ease of Implementation", value: scores.averageEase },
                { label: "Strategic Impact", value: scores.averageStrategic },
                { label: "Time to Value", value: scores.averageTimeToValue },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-medium text-slate-900">
                      {item.value}
                    </span>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">
              Recommended Next Steps
            </h3>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
              {summary.recommendedNextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
