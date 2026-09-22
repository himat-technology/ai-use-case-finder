"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-900">
            Application error
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-md bg-teal-800 px-4 py-2 text-sm text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
