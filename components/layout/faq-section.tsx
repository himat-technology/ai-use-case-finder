import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Are these recommendations guaranteed to work for my company?",
    a: "No tooling guarantees outcomes. Recommendations are tailored heuristics and AI-generated guidance based on your inputs. Validate with a small pilot, clear KPIs, and domain expertise before scaling.",
  },
  {
    q: "What should I do next after generating use cases?",
    a: "Start with Phase 1 quick wins, pick 1–2 high-priority and high-feasibility use cases, define success metrics, and run a 2–4 week pilot using tools you already own where possible.",
  },
  {
    q: "Do I need an OpenAI API key?",
    a: "For live AI generation, set OPENAI_API_KEY in your environment. Without a key, the app runs in demo mode with a high-quality rule-based analysis engine so you can evaluate the full product experience locally.",
  },
  {
    q: "Where is scan history stored?",
    a: "History is stored in your browser’s local storage. Nothing is sent to a database by default, which keeps the local setup simple and private.",
  },
  {
    q: "Can I export results for stakeholders?",
    a: "Yes. Download PDF or Excel reports, copy an executive summary, or export the full JSON payload for downstream systems.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">FAQ</h2>
        <p className="mt-1 text-sm text-slate-600">
          Common questions about using the AI Use Case Finder.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="rounded-xl border border-fuchsia-100 bg-gradient-to-br from-white via-fuchsia-50/40 to-cyan-50/50 px-4 shadow-sm"
      >
        {FAQS.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
