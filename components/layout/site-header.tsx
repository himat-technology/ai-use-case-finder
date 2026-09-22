"use client";

import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { HIMAT } from "@/lib/brand";
import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/75 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 text-sm font-bold text-white shadow-lg shadow-teal-500/30">
            HM
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-slate-900 group-hover:text-teal-800">
              {HIMAT.shortName}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-cyan-700">
              AI Use Case Finder
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          <a href="#discovery-form" className="hover:text-teal-700">
            Discover
          </a>
          <a href="#faq" className="hover:text-teal-700">
            FAQ
          </a>
          <a href="#contact" className="hover:text-teal-700">
            Contact
          </a>
          <a
            href={HIMAT.demoTool}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-fuchsia-700 hover:text-fuchsia-800"
          >
            Live demo
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <SocialLinks size="sm" className="hidden sm:flex" />
          <Button
            size="sm"
            className="bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white hover:from-fuchsia-500 hover:to-orange-400"
            asChild
          >
            <a href="#discovery-form">Try now</a>
          </Button>
        </div>
      </div>

      <div className="border-t border-cyan-100/80 bg-gradient-to-r from-cyan-50 via-fuchsia-50 to-amber-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs text-slate-600 sm:px-6 lg:px-8">
          <a
            href={`mailto:${HIMAT.email}`}
            className="inline-flex items-center gap-1.5 hover:text-teal-800"
          >
            <Mail className="h-3.5 w-3.5 text-cyan-600" />
            {HIMAT.email}
          </a>
          <a
            href={HIMAT.phoneHref}
            className="inline-flex items-center gap-1.5 hover:text-teal-800"
          >
            <Phone className="h-3.5 w-3.5 text-fuchsia-600" />
            {HIMAT.phoneDisplay}
          </a>
          <a
            href={HIMAT.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden hover:text-teal-800 sm:inline"
          >
            {HIMAT.website.replace("https://", "")}
          </a>
        </div>
      </div>
    </header>
  );
}
