import type { AnalysisResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RoadmapProps {
  result: AnalysisResponse;
}

export function ImplementationRoadmap({ result }: RoadmapProps) {
  return (
    <section id="roadmap" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">
          Implementation Roadmap
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          A phased plan from quick wins to scaled AI adoption.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {result.roadmap.map((phase) => (
          <Card key={phase.phase} className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-teal-700" />
            <CardHeader>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge>Phase {phase.phase}</Badge>
                <Badge variant="secondary">{phase.timeline}</Badge>
              </div>
              <CardTitle className="text-lg">{phase.title}</CardTitle>
              <p className="text-xs text-slate-500">{phase.estimatedEffort}</p>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="mb-1 font-medium text-slate-900">Actions</h4>
                <ul className="list-disc space-y-1 pl-4 text-slate-600">
                  {phase.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-1 font-medium text-slate-900">
                  Expected Outcomes
                </h4>
                <ul className="list-disc space-y-1 pl-4 text-slate-600">
                  {phase.expectedOutcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {phase.recommendedTools.map((tool) => (
                  <Badge key={tool} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
