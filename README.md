# AI Use Case Finder by HiMat Technology

Production-ready web app that helps businesses, startups, agencies, and consultants discover practical AI opportunities — with scoring, roadmaps, tool recommendations, analytics, and exportable reports.

Live reference demo: **[himat.tech/free-tools/ai-use-case-finder](https://himat.tech/free-tools/ai-use-case-finder)**

---

## About HiMat Technology

| | |
|---|---|
| **Company** | [HiMat Technology](https://himat.co.in) |
| **Website** | [himat.co.in](https://himat.co.in) |
| **Email** | [info@himat.co.in](mailto:info@himat.co.in) |
| **Phone** | [+91 94452 34023](tel:+919445234023) |
| **Demo tool** | [AI Use Case Finder](https://himat.tech/free-tools/ai-use-case-finder) |

### Social

- [Facebook](https://www.facebook.com/people/Himat-technology/61593829197445/)
- [LinkedIn](https://www.linkedin.com/company/himat-technology)
- [Instagram](https://www.instagram.com/himat_technology)

---

## Features

- Discovery form (industry, size, function, challenges, goals)
- AI analysis via OpenAI (`POST /api/analyze`) with Zod JSON validation
- Demo engine when no API key is set — full UI still works
- Executive summary, prioritized use cases, opportunity scoring
- Category filters, tool recommendations, 3-phase roadmap
- Recharts visual analytics
- PDF, Excel, JSON, and clipboard exports
- Local storage scan history
- Colorful, responsive, accessible UI

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn-style UI
- React Hook Form + Zod
- OpenAI API
- Recharts, Sonner, Lucide React
- pdf-lib + xlsx

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | No* | Enables live OpenAI analysis |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini` |
| `FORCE_DEMO_MODE` | No | Force rule-based demo engine |

\*Without `OPENAI_API_KEY`, the app runs fully in demo mode.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # production server
npm run lint     # eslint
```

## API

### `POST /api/analyze`

**Request**

```json
{
  "industry": "E-commerce",
  "companySize": "11-50",
  "businessFunction": "Marketing",
  "challenges": ["Lead generation issues", "Manual work"],
  "goals": ["Increase revenue", "Increase efficiency"],
  "currentTools": "",
  "additionalContext": ""
}
```

**Response**

```json
{
  "success": true,
  "summary": {},
  "useCases": [],
  "roadmap": [],
  "toolRecommendations": [],
  "scores": {},
  "categoryBreakdown": {},
  "meta": { "source": "openai", "generatedAt": "..." }
}
```

## Project Structure

```text
app/                 # Next.js App Router + API
components/          # UI, forms, dashboard, charts, reports
lib/                 # AI, scoring, prompts, export, brand
hooks/ types/ styles/
```

## Scoring Model

Overall opportunity score =

- Potential ROI — 30%
- Ease of implementation — 20%
- Strategic impact — 30%
- Time to value — 20%

## Contact HiMat

Need help adopting AI in your business?

- **Web:** [himat.co.in](https://himat.co.in)
- **Email:** [info@himat.co.in](mailto:info@himat.co.in)
- **Call:** [+91 94452 34023](tel:+919445234023)
- **Try the live demo:** [AI Use Case Finder](https://himat.tech/free-tools/ai-use-case-finder)

## License

MIT
