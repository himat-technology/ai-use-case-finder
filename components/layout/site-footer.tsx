import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { HIMAT } from "@/lib/brand";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/20 bg-gradient-to-br from-slate-950 via-teal-950 to-fuchsia-950 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.35), transparent 30%), radial-gradient(circle at 85% 15%, rgba(244,114,182,0.3), transparent 28%), radial-gradient(circle at 60% 90%, rgba(251,191,36,0.2), transparent 30%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 text-sm font-bold text-slate-950 shadow-lg">
              HM
            </span>
            <div>
              <p className="font-display text-xl">{HIMAT.name}</p>
              <p className="text-sm text-cyan-100/80">{HIMAT.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-200/90">
            Discover practical AI use cases for your industry, then turn them
            into a scored roadmap your team can execute.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Contact
          </p>
          <a
            href={`mailto:${HIMAT.email}`}
            className="flex items-center gap-2 text-slate-100 hover:text-cyan-200"
          >
            <Mail className="h-4 w-4 text-cyan-300" />
            {HIMAT.email}
          </a>
          <a
            href={HIMAT.phoneHref}
            className="flex items-center gap-2 text-slate-100 hover:text-cyan-200"
          >
            <Phone className="h-4 w-4 text-fuchsia-300" />
            {HIMAT.phoneDisplay}
          </a>
          <p className="flex items-start gap-2 text-slate-200">
            <MapPin className="mt-0.5 h-4 w-4 text-amber-300" />
            {HIMAT.location}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Links
          </p>
          <a
            href={HIMAT.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-100 hover:text-cyan-200"
          >
            Website — himat.co.in
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={HIMAT.demoTool}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-100 hover:text-cyan-200"
          >
            Live demo tool
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a href="#discovery-form" className="block text-slate-100 hover:text-cyan-200">
            Start discovery
          </a>
          <a href="#faq" className="block text-slate-100 hover:text-cyan-200">
            FAQ
          </a>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {HIMAT.name}. All rights reserved.</p>
          <p>Built with Next.js · TypeScript · OpenAI</p>
        </div>
      </div>
    </footer>
  );
}
