import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}
