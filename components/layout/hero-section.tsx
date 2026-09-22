import { ArrowRight, ExternalLink, Gauge, Map, Sparkles } from "lucide-react";
import { HIMAT } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-white/50 bg-gradient-to-br from-cyan-600 via-teal-600 to-fuchsia-700 px-6 py-16 text-white shadow-[0_25px_80px_-20px_rgba(13,148,136,0.55)] sm:px-10 lg:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.28), transparent 28%), radial-gradient(circle at 88% 12%, rgba(251,191,36,0.35), transparent 24%), radial-gradient(circle at 70% 85%, rgba(244,114,182,0.35), transparent 30%), radial-gradient(circle at 30% 75%, rgba(34,211,238,0.25), transparent 26%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-amber-300/30 blur-2xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-6 h-36 w-36 rounded-full bg-cyan-200/25 blur-2xl animate-float-delayed"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
          {HIMAT.name}
        </div>
        <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block text-white">AI Use Case Finder</span>
          <span className="mt-2 block bg-gradient-to-r from-amber-200 via-white to-cyan-100 bg-clip-text text-transparent">
            Discover practical AI for your business
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          Describe your industry, challenges, and goals — get prioritized use
          cases, impact scores, tool picks, and a phased roadmap your team can
          act on.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/30 hover:bg-amber-200"
            asChild
          >
            <a href="#discovery-form">
              Start discovery
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 text-white hover:bg-white/20"
            asChild
          >
            <a
              href={HIMAT.demoTool}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live demo
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Tailored use cases",
              text: "Mapped to your industry and workflows",
              tone: "from-cyan-400/30 to-teal-400/10",
            },
            {
              icon: Gauge,
              title: "Opportunity scoring",
              text: "ROI, feasibility, impact, and time-to-value",
              tone: "from-amber-400/30 to-orange-400/10",
            },
            {
              icon: Map,
              title: "Actionable roadmap",
              text: "Quick wins to a 12-month scale plan",
              tone: "from-fuchsia-400/30 to-pink-400/10",
            },
          ].map((item) => (
            <li
              key={item.title}
              className={`rounded-2xl border border-white/20 bg-gradient-to-br ${item.tone} p-4 backdrop-blur-md transition-transform hover:-translate-y-1`}
            >
              <item.icon className="mb-3 h-5 w-5 text-amber-200" />
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
