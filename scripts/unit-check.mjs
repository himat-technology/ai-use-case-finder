/**
 * Offline unit checks for scoring + demo analysis + PDF safety.
 */
import { PDFDocument, StandardFonts } from "pdf-lib";

function pdfSafe(text) {
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

let passed = 0;
let failed = 0;
function assert(cond, msg) {
  if (cond) {
    passed += 1;
    console.log(`  ✓ ${msg}`);
  } else {
    failed += 1;
    console.error(`  ✗ ${msg}`);
  }
}

async function testPdfEncoding() {
  console.log("\nPDF WinAnsi encoding");
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const dirty =
    "Savings 30–50% — experiments → ROI • Low–Medium · Hello…";
  const clean = pdfSafe(dirty);
  assert(!/[–—→•·…]/.test(clean), "pdfSafe strips unsafe glyphs");
  try {
    font.encodeText(clean);
    assert(true, "Helvetica encodes sanitized text");
  } catch (e) {
    assert(false, `Helvetica encode failed: ${e.message}`);
  }
  try {
    font.encodeText(dirty);
    assert(false, "raw unicode should fail encode");
  } catch {
    assert(true, "raw unicode correctly rejected by Helvetica");
  }
}

async function tryImport() {
  const { generateDemoAnalysis } = await import("../lib/ai/demo.ts");
  const {
    calculateOpportunityScore,
    aggregateScores,
    enrichUseCaseScores,
    buildCategoryBreakdown,
  } = await import("../lib/scoring/index.ts");
  const { businessProfileSchema, aiAnalysisSchema } = await import(
    "../lib/ai/schema.ts"
  );
  const { analyzeBusinessProfile } = await import("../lib/ai/analyze.ts");
  return {
    generateDemoAnalysis,
    calculateOpportunityScore,
    aggregateScores,
    enrichUseCaseScores,
    buildCategoryBreakdown,
    businessProfileSchema,
    aiAnalysisSchema,
    analyzeBusinessProfile,
  };
}

async function main() {
  console.log("Offline unit checks\n");
  await testPdfEncoding();

  let mods = null;
  try {
    mods = await tryImport();
  } catch (e) {
    console.log(`\n(Skipping TS module tests: ${e.message})`);
  }

  if (mods) {
    console.log("\nScoring + demo analysis");
    const profile = {
      industry: "E-commerce",
      companySize: "11-50",
      businessFunction: "Marketing",
      challenges: ["Lead generation issues", "Manual work"],
      goals: ["Increase revenue", "Increase efficiency"],
      currentTools: "",
      additionalContext: "",
    };

    const parsed = mods.businessProfileSchema.safeParse(profile);
    assert(parsed.success, "businessProfileSchema accepts valid profile");

    const score = mods.calculateOpportunityScore({
      potentialRoi: 80,
      easeOfImplementation: 70,
      strategicImpact: 90,
      timeToValue: 60,
    });
    assert(score.overall === 77, `weighted overall is 77 (got ${score.overall})`);

    const demo = mods.generateDemoAnalysis(profile);
    const validated = mods.aiAnalysisSchema.safeParse(demo);
    assert(validated.success, "demo payload matches aiAnalysisSchema");
    if (!validated.success) {
      console.error(validated.error.flatten());
    }

    const enriched = mods.enrichUseCaseScores(demo.useCases, profile);
    const agg = mods.aggregateScores(enriched);
    assert(agg.overall > 0 && agg.overall <= 100, "aggregate overall valid");
    const breakdown = mods.buildCategoryBreakdown(enriched);
    assert(Object.values(breakdown).some((n) => n > 0), "category breakdown non-empty");

    process.env.FORCE_DEMO_MODE = "true";
    const analysis = await mods.analyzeBusinessProfile(profile);
    assert(analysis.success === true, "analyzeBusinessProfile success");
    assert(analysis.meta.source === "demo", "analyze uses demo mode");
    assert(analysis.useCases.length >= 4, "analyze returns use cases");
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
