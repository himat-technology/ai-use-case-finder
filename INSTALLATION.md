# Installation Guide

## Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

## Install

```bash
npm install
```

## Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini
FORCE_DEMO_MODE=false
```

If `OPENAI_API_KEY` is omitted, the app automatically uses the built-in demo analysis engine. You can still explore the full UI, scoring, charts, exports, and history.

## Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Verify the API

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "industry": "E-commerce",
    "companySize": "11-50",
    "businessFunction": "Marketing",
    "challenges": ["Lead generation issues", "Manual work"],
    "goals": ["Increase revenue", "Increase efficiency"],
    "currentTools": "",
    "additionalContext": ""
  }'
```

## Troubleshooting

| Issue | Fix |
|---|---|
| Port 3000 in use | `npx next dev -p 3001` |
| OpenAI errors | Check API key/billing, or set `FORCE_DEMO_MODE=true` |
| Empty history | History uses browser localStorage; private mode may clear it |
| Export fails | Allow downloads in the browser; try JSON/copy first |

## Contact HiMat

- **Web:** [himat.co.in](https://himat.co.in)
- **Email:** [info@himat.co.in](mailto:info@himat.co.in)
- **Call:** [+91 94452 34023](tel:+919445234023)
- **Live demo:** [AI Use Case Finder](https://himat.tech/free-tools/ai-use-case-finder)
- **Facebook:** [HiMat Technology](https://www.facebook.com/people/Himat-technology/61593829197445/)
- **LinkedIn:** [himat-technology](https://www.linkedin.com/company/himat-technology)
- **Instagram:** [@himat_technology](https://www.instagram.com/himat_technology)

## Next steps

1. Submit the discovery form
2. Review executive summary and scored use cases
3. Export PDF/Excel for stakeholders
4. Add `OPENAI_API_KEY` for live AI generation
