"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h2 className="font-display text-2xl text-teal-950">Something went wrong</h2>
      <p className="mt-2 text-sm text-slate-600">
        {error.message || "Please try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-teal-800 px-4 py-2 text-sm text-white hover:bg-teal-900"
      >
        Retry
      </button>
    </div>
  );
}
