import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import * as XLSX from "xlsx";
import type { AnalysisResponse, BusinessProfile } from "@/types";
import { downloadBlob } from "@/lib/utils";

/** Standard Helvetica only supports WinAnsi — strip/replace unsupported glyphs. */
function pdfSafe(text: string): string {
  return text
    .replace(/[\u2010-\u2015]/g, "-") // hyphens/dashes
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u2022/g, "-")
    .replace(/\u00B7/g, "-")
    .replace(/[\u2190-\u21FF]/g, "->") // arrows
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function wrapText(text: string, maxChars: number): string[] {
  const words = pdfSafe(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function exportPdfReport(
  profile: BusinessProfile,
  result: AnalysisResponse
) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const margin = 50;
  let page = doc.addPage([612, 792]);
  let y = 742;

  const ensureSpace = (needed: number) => {
    if (y - needed < 50) {
      page = doc.addPage([612, 792]);
      y = 742;
    }
  };

  const drawHeading = (text: string, size = 16) => {
    ensureSpace(size + 16);
    page.drawText(pdfSafe(text), {
      x: margin,
      y,
      size,
      font: bold,
      color: rgb(0.05, 0.25, 0.28),
    });
    y -= size + 12;
  };

  const drawParagraph = (text: string, size = 10) => {
    const lines = wrapText(text, 90);
    for (const line of lines) {
      ensureSpace(size + 4);
      page.drawText(line, {
        x: margin,
        y,
        size,
        font,
        color: rgb(0.15, 0.18, 0.2),
      });
      y -= size + 4;
    }
    y -= 4;
  };

  const drawBullet = (text: string) => {
    const lines = wrapText(`- ${text}`, 88);
    for (const line of lines) {
      ensureSpace(14);
      page.drawText(line, {
        x: margin,
        y,
        size: 10,
        font,
        color: rgb(0.15, 0.18, 0.2),
      });
      y -= 14;
    }
  };

  drawHeading("AI Use Case Finder Report", 20);
  drawParagraph(
    `${profile.industry} - ${profile.companySize} - ${profile.businessFunction}`
  );
  drawParagraph(`Overall Opportunity Score: ${result.scores.overall}/100`);
  y -= 6;

  drawHeading("Executive Summary");
  drawParagraph(result.summary.overview);
  drawParagraph("Current Opportunities:");
  result.summary.currentOpportunities.forEach(drawBullet);
  drawParagraph("Recommended Next Steps:");
  result.summary.recommendedNextSteps.forEach(drawBullet);

  drawHeading("Prioritized Use Cases");
  for (const uc of result.useCases) {
    ensureSpace(80);
    drawParagraph(
      `${uc.title} (${uc.category}) - Priority ${uc.priorityScore}`
    );
    drawParagraph(uc.description);
    drawParagraph(
      `Impact: ${uc.businessImpact.timeSavings} | Difficulty: ${uc.implementationDifficulty}`
    );
    y -= 4;
  }

  drawHeading("Implementation Roadmap");
  for (const phase of result.roadmap) {
    drawParagraph(
      `Phase ${phase.phase}: ${phase.title} (${phase.timeline}) - ${phase.estimatedEffort}`
    );
    phase.actions.forEach(drawBullet);
    y -= 4;
  }

  const bytes = await doc.save();
  const pdfBytes = new Uint8Array(bytes);
  downloadBlob(
    new Blob([pdfBytes], { type: "application/pdf" }),
    `ai-use-case-report-${Date.now()}.pdf`
  );
}

export function exportExcelReport(
  profile: BusinessProfile,
  result: AnalysisResponse
) {
  const wb = XLSX.utils.book_new();

  const summarySheet = XLSX.utils.aoa_to_sheet([
    ["AI Use Case Finder Report"],
    ["Industry", profile.industry],
    ["Company Size", profile.companySize],
    ["Business Function", profile.businessFunction],
    ["Overall Score", result.scores.overall],
    [],
    ["Executive Overview"],
    [result.summary.overview],
    [],
    ["Current Opportunities"],
    ...result.summary.currentOpportunities.map((o) => [o]),
    [],
    ["Estimated Benefits"],
    ...result.summary.estimatedBenefits.map((b) => [b]),
    [],
    ["Next Steps"],
    ...result.summary.recommendedNextSteps.map((s) => [s]),
  ]);
  XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");

  const useCaseRows = [
    [
      "Title",
      "Category",
      "Difficulty",
      "Priority",
      "ROI",
      "Ease",
      "Strategic",
      "Time to Value",
      "Overall",
      "Description",
      "Tools",
    ],
    ...result.useCases.map((uc) => [
      uc.title,
      uc.category,
      uc.implementationDifficulty,
      uc.priorityScore,
      uc.opportunityScore.potentialRoi,
      uc.opportunityScore.easeOfImplementation,
      uc.opportunityScore.strategicImpact,
      uc.opportunityScore.timeToValue,
      uc.opportunityScore.overall,
      uc.description,
      uc.recommendedTools.join(", "),
    ]),
  ];
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet(useCaseRows),
    "Use Cases"
  );

  const roadmapRows = [
    ["Phase", "Title", "Timeline", "Effort", "Actions", "Outcomes", "Tools"],
    ...result.roadmap.map((p) => [
      p.phase,
      p.title,
      p.timeline,
      p.estimatedEffort,
      p.actions.join(" | "),
      p.expectedOutcomes.join(" | "),
      p.recommendedTools.join(", "),
    ]),
  ];
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet(roadmapRows),
    "Roadmap"
  );

  const toolRows = [
    ["Name", "Category", "Description", "Relevance", "Related Use Cases"],
    ...result.toolRecommendations.map((t) => [
      t.name,
      t.category,
      t.description,
      t.relevance,
      t.relatedUseCases.join(", "),
    ]),
  ];
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet(toolRows),
    "Tools"
  );

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  downloadBlob(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `ai-use-case-report-${Date.now()}.xlsx`
  );
}

export function buildCopySummary(
  profile: BusinessProfile,
  result: AnalysisResponse
): string {
  const lines = [
    `AI Use Case Finder — ${profile.industry} / ${profile.businessFunction}`,
    `Overall Opportunity Score: ${result.scores.overall}/100`,
    "",
    "Executive Summary",
    result.summary.overview,
    "",
    "Top Use Cases",
    ...result.useCases
      .slice(0, 5)
      .map(
        (uc, i) =>
          `${i + 1}. ${uc.title} (${uc.category}) — Priority ${uc.priorityScore}`
      ),
    "",
    "Next Steps",
    ...result.summary.recommendedNextSteps.map((s, i) => `${i + 1}. ${s}`),
  ];
  return lines.join("\n");
}

export function exportJsonReport(
  profile: BusinessProfile,
  result: AnalysisResponse
) {
  const payload = { profile, result, exportedAt: new Date().toISOString() };
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    }),
    `ai-use-case-report-${Date.now()}.json`
  );
}
