import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HIMAT } from "@/lib/brand";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `AI Use Case Finder | ${HIMAT.name}`,
  description:
    "Discover practical AI opportunities for your business with HiMat Technology — prioritized use cases, opportunity scores, tool recommendations, and implementation roadmaps.",
  keywords: [
    "HiMat Technology",
    "AI use cases",
    "AI adoption",
    "automation opportunities",
    "AI roadmap",
    "business AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${fraunces.variable} min-h-screen font-sans antialiased`}
      >
        <div className="page-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
