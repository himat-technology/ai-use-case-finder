/**
 * End-to-end PDF generation from demo analysis (no browser).
 */
import { PDFDocument, StandardFonts } from "pdf-lib";
import { writeFileSync } from "node:fs";
import { generateDemoAnalysis } from "../lib/ai/demo";
import { enrichUseCaseScores, aggregateScores } from "../lib/scoring";

function pdfSafe(text: string): string {
  return text
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u2022/g, "-")
    .replace(/\u00B7/g, "-")
    .replace(/[\u2190-\u21FF]/g, "->")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

async function main() {
  const profile = {
    industry: "E-commerce" as const,
    companySize: "11-50" as const,
    businessFunction: "Marketing" as const,
    challenges: ["Lead generation issues", "Manual work"] as [
      "Lead generation issues",
      "Manual work",
    ],
    goals: ["Increase revenue", "Increase efficiency"] as [
      "Increase revenue",
      "Increase efficiency",
    ],
    currentTools: "HubSpot",
    additionalContext: "Unicode test: 30–50% — → • …",
  };

  const demo = generateDemoAnalysis(profile);
  const useCases = enrichUseCaseScores(demo.useCases, profile);
  const scores = aggregateScores(useCases);

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([612, 792]);
  let y = 750;

  const lines = [
    "AI Use Case Finder Report",
    `${profile.industry} - ${profile.companySize}`,
    `Score: ${scores.overall}`,
    demo.summary.overview,
    ...useCases.map((u) => `${u.title}: ${u.businessImpact.timeSavings}`),
    ...demo.roadmap.map((p) => `${p.title} ${p.timeline} ${p.estimatedEffort}`),
  ];

  for (const line of lines) {
    const safe = pdfSafe(line).slice(0, 95);
    page.drawText(safe || "-", { x: 40, y, size: 10, font });
    y -= 14;
    if (y < 40) break;
  }

  const bytes = await doc.save();
  writeFileSync("scripts/.pdf-smoke-output.pdf", bytes);
  console.log(
    `PDF OK: ${bytes.length} bytes, score=${scores.overall}, useCases=${useCases.length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
