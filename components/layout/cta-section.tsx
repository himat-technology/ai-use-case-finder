import { ArrowRight, Mail, Phone } from "lucide-react";
import { HIMAT } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/layout/social-links";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-fuchsia-200/60 bg-gradient-to-br from-amber-100 via-fuchsia-50 to-cyan-100 px-6 py-12 text-center shadow-lg sm:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-fuchsia-300/40 blur-3xl"
      />
      <div className="relative">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-700">
          Work with {HIMAT.name}
        </p>
        <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
          Ready to turn AI ideas into an execution plan?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Run another analysis, export a stakeholder report, or talk to the
          HiMat team about implementing AI in your business.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-500 hover:to-cyan-500"
            asChild
          >
            <a href="#discovery-form">
              Run another discovery
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-fuchsia-300 bg-white/70 text-fuchsia-800 hover:bg-white"
            asChild
          >
            <a href={`mailto:${HIMAT.email}`}>
              <Mail className="h-4 w-4" />
              {HIMAT.email}
            </a>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-slate-800"
            asChild
          >
            <a href={HIMAT.phoneHref}>
              <Phone className="h-4 w-4" />
              {HIMAT.phoneDisplay}
            </a>
          </Button>
        </div>
        <div className="mt-6 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
