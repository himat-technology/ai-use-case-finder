"use client";

import dynamic from "next/dynamic";
import { DiscoveryForm } from "@/components/forms/discovery-form";
import { ExecutiveSummaryCard } from "@/components/dashboard/executive-summary";
import { OpportunityScoreDashboard } from "@/components/dashboard/score-dashboard";
import { ImplementationRoadmap } from "@/components/dashboard/roadmap";
import { ScanHistory } from "@/components/dashboard/scan-history";
import { AnalysisSkeleton } from "@/components/dashboard/analysis-skeleton";
import { UseCasesGrid } from "@/components/use-cases/use-cases-grid";
import { ToolRecommendations } from "@/components/use-cases/tool-recommendations";
import { HeroSection } from "@/components/layout/hero-section";
import { FaqSection } from "@/components/layout/faq-section";
import { CtaSection } from "@/components/layout/cta-section";
import { ErrorBoundary } from "@/components/error-boundary";
import { useAnalysis } from "@/hooks/use-analysis";
import { Skeleton } from "@/components/ui/skeleton";

const OpportunityCharts = dynamic(
  () =>
    import("@/components/charts/opportunity-charts").then(
      (mod) => mod.OpportunityCharts
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-72 w-full rounded-xl" />,
  }
);

const ExportActions = dynamic(
  () =>
    import("@/components/reports/export-actions").then(
      (mod) => mod.ExportActions
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-28 w-full rounded-xl" />,
  }
);

export default function HomePage() {
  const {
    isLoading,
    result,
    profile,
    history,
    analyze,
    handleClearHistory,
    handleRemoveHistory,
  } = useAnalysis();

  return (
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <HeroSection />
      <DiscoveryForm onSubmit={analyze} isLoading={isLoading} />

      {isLoading && <AnalysisSkeleton />}

      {result && profile && !isLoading && (
        <ErrorBoundary>
          <div className="space-y-16">
            <ExecutiveSummaryCard result={result} />
            <OpportunityScoreDashboard result={result} />
            <UseCasesGrid result={result} />
            <ToolRecommendations result={result} />
            <ImplementationRoadmap result={result} />
            <OpportunityCharts result={result} />
            <ExportActions profile={profile} result={result} />
          </div>
        </ErrorBoundary>
      )}

      <ScanHistory
        history={history}
        onClear={handleClearHistory}
        onRemove={handleRemoveHistory}
      />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
