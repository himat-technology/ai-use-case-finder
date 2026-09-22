import { clamp } from "@/lib/utils";
import type {
  BusinessProfile,
  OpportunityScore,
  UseCase,
  UseCaseCategory,
} from "@/types";

const SIZE_FEASIBILITY: Record<BusinessProfile["companySize"], number> = {
  Solo: 88,
  "2-10": 82,
  "11-50": 75,
  "51-200": 68,
  "200+": 60,
};

const DIFFICULTY_EASE: Record<string, number> = {
  Easy: 90,
  Medium: 65,
  Advanced: 40,
};

export function calculateOpportunityScore(input: {
  potentialRoi: number;
  easeOfImplementation: number;
  strategicImpact: number;
  timeToValue: number;
}): OpportunityScore {
  const potentialRoi = clamp(input.potentialRoi);
  const easeOfImplementation = clamp(input.easeOfImplementation);
  const strategicImpact = clamp(input.strategicImpact);
  const timeToValue = clamp(input.timeToValue);

  const overall = clamp(
    potentialRoi * 0.3 +
      easeOfImplementation * 0.2 +
      strategicImpact * 0.3 +
      timeToValue * 0.2
  );

  return {
    potentialRoi,
    easeOfImplementation,
    strategicImpact,
    timeToValue,
    overall,
  };
}

export function enrichUseCaseScores(
  useCases: UseCase[],
  profile: BusinessProfile
): UseCase[] {
  const sizeBoost = SIZE_FEASIBILITY[profile.companySize] ?? 70;

  return useCases.map((useCase) => {
    const baseEase =
      useCase.opportunityScore?.easeOfImplementation ??
      DIFFICULTY_EASE[useCase.implementationDifficulty] ??
      65;

    const easeOfImplementation = clamp(baseEase * 0.7 + sizeBoost * 0.3);
    const potentialRoi = clamp(useCase.opportunityScore?.potentialRoi ?? 70);
    const strategicImpact = clamp(
      useCase.opportunityScore?.strategicImpact ?? useCase.priorityScore ?? 70
    );
    const timeToValue = clamp(
      useCase.opportunityScore?.timeToValue ??
        (useCase.implementationDifficulty === "Easy"
          ? 85
          : useCase.implementationDifficulty === "Medium"
            ? 65
            : 45)
    );

    const opportunityScore = calculateOpportunityScore({
      potentialRoi,
      easeOfImplementation,
      strategicImpact,
      timeToValue,
    });

    const priorityScore = clamp(
      opportunityScore.overall * 0.7 + (useCase.priorityScore || 70) * 0.3
    );

    return {
      ...useCase,
      opportunityScore,
      priorityScore,
    };
  });
}

export function aggregateScores(useCases: UseCase[]) {
  if (useCases.length === 0) {
    return {
      averageRoi: 0,
      averageEase: 0,
      averageStrategic: 0,
      averageTimeToValue: 0,
      overall: 0,
    };
  }

  const totals = useCases.reduce(
    (acc, uc) => {
      acc.roi += uc.opportunityScore.potentialRoi;
      acc.ease += uc.opportunityScore.easeOfImplementation;
      acc.strategic += uc.opportunityScore.strategicImpact;
      acc.ttv += uc.opportunityScore.timeToValue;
      acc.overall += uc.opportunityScore.overall;
      return acc;
    },
    { roi: 0, ease: 0, strategic: 0, ttv: 0, overall: 0 }
  );

  const n = useCases.length;
  return {
    averageRoi: clamp(totals.roi / n),
    averageEase: clamp(totals.ease / n),
    averageStrategic: clamp(totals.strategic / n),
    averageTimeToValue: clamp(totals.ttv / n),
    overall: clamp(totals.overall / n),
  };
}

export function buildCategoryBreakdown(
  useCases: UseCase[]
): Record<UseCaseCategory, number> {
  const breakdown: Record<UseCaseCategory, number> = {
    Automation: 0,
    "Customer Experience": 0,
    Marketing: 0,
    Sales: 0,
    Operations: 0,
    Analytics: 0,
  };

  for (const uc of useCases) {
    if (uc.category in breakdown) {
      breakdown[uc.category] += 1;
    }
  }

  return breakdown;
}
