"use client";

import { History, Trash2 } from "lucide-react";
import type { AnalysisHistory } from "@/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScanHistoryProps {
  history: AnalysisHistory[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

export function ScanHistory({ history, onClear, onRemove }: ScanHistoryProps) {
  if (history.length === 0) return null;

  return (
    <section id="history" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-teal-950">Scan History</h2>
          <p className="mt-1 text-sm text-slate-600">
            Previous analyses stored locally in your browser.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onClear}>
          <Trash2 className="h-4 w-4" />
          Clear all
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {history.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <History className="h-4 w-4 text-teal-700" />
                  {item.industry}
                </CardTitle>
                <p className="text-xs text-slate-500">
                  {item.businessFunction} · {formatDate(item.createdAt)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Remove history item"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium text-teal-900">
                Score {item.overallScore}/100
              </p>
              <p className="line-clamp-2 text-slate-600">{item.summaryPreview}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
