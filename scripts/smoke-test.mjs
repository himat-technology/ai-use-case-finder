/**
 * Smoke tests for AI Use Case Finder API + response shape.
 * Usage: node scripts/smoke-test.mjs [baseUrl]
 */
const BASE = process.argv[2] || "http://localhost:3010";

const validPayload = {
  industry: "E-commerce",
  companySize: "11-50",
  businessFunction: "Marketing",
  challenges: ["Lead generation issues", "Manual work"],
  goals: ["Increase revenue", "Increase efficiency"],
  currentTools: "HubSpot, Shopify",
  additionalContext: "Focus on mid-funnel conversion",
};

const profiles = [
  {
    name: "Healthcare Ops",
    payload: {
      ...validPayload,
      industry: "Healthcare",
      businessFunction: "Operations",
      challenges: ["Manual work", "Reporting inefficiencies", "Data analysis"],
      goals: ["Reduce costs", "Improve decision making"],
    },
  },
  {
    name: "SaaS Sales",
    payload: {
      ...validPayload,
      industry: "SaaS",
      businessFunction: "Sales",
      companySize: "51-200",
      challenges: ["Lead generation issues", "Slow response times"],
      goals: ["Increase revenue", "Scale operations"],
    },
  },
  {
    name: "Solo Agency",
    payload: {
      ...validPayload,
      industry: "Marketing Agency",
      companySize: "Solo",
      businessFunction: "Marketing",
      challenges: ["Content production", "Employee productivity"],
      goals: ["Automate repetitive tasks", "Increase efficiency"],
    },
  },
];

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

async function post(path, body, raw = false) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: raw ? {} : { "Content-Type": "application/json" },
    body: raw ? body : JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* ignore */
  }
  return { res, json, text };
}

function validateShape(data, label) {
  assert(data.success === true, `${label}: success true`);
  assert(!!data.summary?.overview, `${label}: summary.overview`);
  assert(Array.isArray(data.useCases) && data.useCases.length >= 4, `${label}: useCases (>=4)`);
  assert(Array.isArray(data.roadmap) && data.roadmap.length === 3, `${label}: roadmap (3)`);
  assert(
    Array.isArray(data.toolRecommendations) && data.toolRecommendations.length >= 3,
    `${label}: tools (>=3)`
  );
  assert(typeof data.scores?.overall === "number", `${label}: scores.overall`);
  assert(data.scores.overall >= 0 && data.scores.overall <= 100, `${label}: score in 0-100`);
  assert(!!data.meta?.source, `${label}: meta.source`);

  for (const uc of data.useCases) {
    assert(!!uc.title && !!uc.description && !!uc.category, `${label}: use case fields`);
    assert(
      uc.opportunityScore &&
        typeof uc.opportunityScore.overall === "number",
      `${label}: opportunityScore`
    );
    assert(
      ["Easy", "Medium", "Advanced"].includes(uc.implementationDifficulty),
      `${label}: difficulty enum`
    );
  }

  const phases = data.roadmap.map((p) => p.phase).sort().join(",");
  assert(phases === "1,2,3", `${label}: roadmap phases 1-2-3`);
}

async function main() {
  console.log(`\nSmoke testing ${BASE}\n`);

  // Health: homepage
  {
    console.log("1) Homepage");
    const res = await fetch(BASE);
    const html = await res.text();
    assert(res.ok, `GET / status ${res.status}`);
    assert(html.includes("AI Use Case Finder"), "page contains title");
    assert(html.includes("HiMat") || html.includes("himat"), "page contains HiMat branding");
    assert(html.includes("info@himat.co.in"), "page contains email");
    assert(html.includes("94452"), "page contains phone");
  }

  // Valid analyze
  {
    console.log("\n2) Valid analyze");
    const { res, json } = await post("/api/analyze", validPayload);
    assert(res.status === 200, `status 200 (got ${res.status})`);
    validateShape(json, "valid");
  }

  // Multiple industries
  {
    console.log("\n3) Multi-profile analyze");
    for (const p of profiles) {
      const { res, json } = await post("/api/analyze", p.payload);
      assert(res.status === 200, `${p.name}: status 200`);
      validateShape(json, p.name);
    }
  }

  // Invalid payloads
  {
    console.log("\n4) Validation errors");
    const bad = [
      { name: "missing challenges", body: { ...validPayload, challenges: [] } },
      { name: "missing goals", body: { ...validPayload, goals: [] } },
      { name: "bad industry", body: { ...validPayload, industry: "Spaceships" } },
      { name: "bad size", body: { ...validPayload, companySize: "999" } },
    ];
    for (const item of bad) {
      const { res, json } = await post("/api/analyze", item.body);
      assert(res.status === 400, `${item.name}: status 400 (got ${res.status})`);
      assert(json?.success === false, `${item.name}: success false`);
    }
  }

  // Invalid JSON
  {
    console.log("\n5) Invalid JSON body");
    const { res, json } = await post("/api/analyze", "{not-json", true);
    // Content-Type may still parse fail
    assert(res.status === 400 || res.status === 500, `bad json status ${res.status}`);
    assert(json?.success === false || !json?.success, "bad json not success");
  }

  // Method not allowed-ish: GET should not crash app
  {
    console.log("\n6) GET /api/analyze");
    const res = await fetch(`${BASE}/api/analyze`);
    assert(res.status === 405 || res.status === 400 || res.status === 500, `GET handled (${res.status})`);
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
