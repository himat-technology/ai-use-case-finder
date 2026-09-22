import type { AnalysisHistory, AnalysisResponse, BusinessProfile } from "@/types";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "ai-use-case-finder:history";
const MAX_ITEMS = 20;

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadHistory(): AnalysisHistory[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AnalysisHistory[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(
  profile: BusinessProfile,
  result: AnalysisResponse
): AnalysisHistory {
  const item: AnalysisHistory = {
    id: generateId("history"),
    industry: profile.industry,
    businessFunction: profile.businessFunction,
    createdAt: new Date().toISOString(),
    overallScore: result.scores.overall,
    summaryPreview: result.summary.overview.slice(0, 140),
  };

  if (!canUseStorage()) return item;

  const existing = loadHistory().filter((h) => h.id !== item.id);
  const next = [item, ...existing].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return item;
}

export function clearHistory() {
  if (!canUseStorage()) return;
  localStorage.removeItem(STORAGE_KEY);
}

export function removeHistoryItem(id: string) {
  if (!canUseStorage()) return;
  const next = loadHistory().filter((h) => h.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
