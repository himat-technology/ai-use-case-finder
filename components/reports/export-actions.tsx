"use client";

import { toast } from "sonner";
import {
  Copy,
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import type { AnalysisResponse, BusinessProfile } from "@/types";
import {
  buildCopySummary,
  exportExcelReport,
  exportJsonReport,
  exportPdfReport,
} from "@/lib/export/reports";
import { copyToClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExportActionsProps {
  profile: BusinessProfile;
  result: AnalysisResponse;
}

export function ExportActions({ profile, result }: ExportActionsProps) {
  const handleCopy = async () => {
    const ok = await copyToClipboard(buildCopySummary(profile, result));
    if (ok) toast.success("Summary copied to clipboard");
    else toast.error("Unable to copy summary");
  };

  const handlePdf = async () => {
    try {
      await exportPdfReport(profile, result);
      toast.success("PDF report downloaded");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  const handleExcel = () => {
    try {
      exportExcelReport(profile, result);
      toast.success("Excel report downloaded");
    } catch {
      toast.error("Failed to generate Excel file");
    }
  };

  const handleJson = () => {
    exportJsonReport(profile, result);
    toast.success("JSON export downloaded");
  };

  return (
    <section id="export" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">Export Actions</h2>
        <p className="mt-1 text-sm text-slate-600">
          Share results with stakeholders as PDF, Excel, JSON, or plain text.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Download & share</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={handlePdf}>
            <FileText className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="secondary" onClick={handleExcel}>
            <FileSpreadsheet className="h-4 w-4" />
            Download Excel
          </Button>
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            Copy Summary
          </Button>
          <Button variant="outline" onClick={handleJson}>
            <FileJson className="h-4 w-4" />
            Export JSON
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              document
                .getElementById("executive-summary")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Download className="h-4 w-4" />
            Jump to summary
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
