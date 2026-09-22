"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  AnalysisHistory,
  AnalysisResponse,
  BusinessProfile,
} from "@/types";
import {
  clearHistory,
  loadHistory,
  removeHistoryItem,
  saveHistoryItem,
} from "@/lib/storage/history";

export function useAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const analyze = useCallback(async (data: BusinessProfile) => {
    setIsLoading(true);
    setProfile(data);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as AnalysisResponse & {
        error?: string;
      };

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Analysis failed");
      }

      setResult(payload);
      const item = saveHistoryItem(data, payload);
      setHistory((prev) => [item, ...prev.filter((h) => h.id !== item.id)].slice(0, 20));
      toast.success("AI use cases generated");

      requestAnimationFrame(() => {
        document
          .getElementById("executive-summary")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to analyze profile";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
    toast.success("History cleared");
  }, []);

  const handleRemoveHistory = useCallback((id: string) => {
    removeHistoryItem(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    isLoading,
    result,
    profile,
    history,
    analyze,
    handleClearHistory,
    handleRemoveHistory,
  };
}
