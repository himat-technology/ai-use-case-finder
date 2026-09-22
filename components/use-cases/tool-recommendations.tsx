import type { AnalysisResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolRecommendationsProps {
  result: AnalysisResponse;
}

export function ToolRecommendations({ result }: ToolRecommendationsProps) {
  return (
    <section id="tools" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">
          Recommended Tools
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Suggested platforms mapped to your highest-priority use cases.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.toolRecommendations.map((tool) => (
          <Card key={tool.name}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{tool.name}</CardTitle>
                <Badge variant="outline">{tool.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>{tool.description}</p>
              <p>
                <span className="font-medium text-slate-800">Relevance:</span>{" "}
                {tool.relevance}
              </p>
              {tool.relatedUseCases.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tool.relatedUseCases.map((uc) => (
                    <Badge key={uc} variant="secondary">
                      {uc}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
