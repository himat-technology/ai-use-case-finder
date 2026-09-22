"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { businessProfileSchema } from "@/lib/ai/schema";
import {
  BUSINESS_FUNCTIONS,
  CHALLENGES,
  COMPANY_SIZES,
  GOALS,
  INDUSTRIES,
  type BusinessProfile,
  type Challenge,
  type Goal,
} from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DiscoveryFormProps {
  onSubmit: (data: BusinessProfile) => Promise<void> | void;
  isLoading?: boolean;
}

export function DiscoveryForm({ onSubmit, isLoading }: DiscoveryFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BusinessProfile>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      industry: "E-commerce",
      companySize: "11-50",
      businessFunction: "Marketing",
      challenges: ["Lead generation issues", "Manual work"],
      goals: ["Increase revenue", "Increase efficiency"],
      currentTools: "",
      additionalContext: "",
    },
  });

  const challenges = watch("challenges") || [];
  const goals = watch("goals") || [];

  const toggleMulti = (
    field: "challenges" | "goals",
    value: Challenge | Goal,
    checked: boolean
  ) => {
    const current = field === "challenges" ? challenges : goals;
    const next = checked
      ? [...current, value]
      : current.filter((item) => item !== value);
    setValue(field, next as never, { shouldValidate: true });
  };

  return (
    <Card
      id="discovery-form"
      className="overflow-hidden border-cyan-200/70 shadow-[0_20px_50px_-24px_rgba(6,182,212,0.45)]"
    >
      <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400" />
      <CardHeader>
        <CardTitle className="font-display text-2xl text-slate-900">
          Discovery Form
        </CardTitle>
        <CardDescription>
          Tell us about your business. We&apos;ll generate prioritized AI use
          cases, impact scores, tool recommendations, and a phased roadmap.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-8"
          noValidate
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Controller
                control={control}
                name="industry"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="industry" aria-label="Industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && (
                <p className="text-xs text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Controller
                control={control}
                name="companySize"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="companySize" aria-label="Company size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessFunction">Business Function</Label>
              <Controller
                control={control}
                name="businessFunction"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="businessFunction"
                      aria-label="Business function"
                    >
                      <SelectValue placeholder="Select function" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_FUNCTIONS.map((fn) => (
                        <SelectItem key={fn} value={fn}>
                          {fn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-800">
              Primary Challenges
            </legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHALLENGES.map((challenge) => {
                const checked = challenges.includes(challenge);
                return (
                  <label
                    key={challenge}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-3 hover:border-teal-700/40"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleMulti("challenges", challenge, value === true)
                      }
                      aria-label={challenge}
                    />
                    <span className="text-sm text-slate-700">{challenge}</span>
                  </label>
                );
              })}
            </div>
            {errors.challenges && (
              <p className="text-xs text-red-600">
                {errors.challenges.message as string}
              </p>
            )}
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-800">Goals</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GOALS.map((goal) => {
                const checked = goals.includes(goal);
                return (
                  <label
                    key={goal}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-3 hover:border-teal-700/40"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleMulti("goals", goal, value === true)
                      }
                      aria-label={goal}
                    />
                    <span className="text-sm text-slate-700">{goal}</span>
                  </label>
                );
              })}
            </div>
            {errors.goals && (
              <p className="text-xs text-red-600">
                {errors.goals.message as string}
              </p>
            )}
          </fieldset>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentTools">Current Tools (optional)</Label>
              <Input
                id="currentTools"
                placeholder="e.g. HubSpot, Shopify, Zendesk, Excel"
                {...register("currentTools")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalContext">
                Additional Context (optional)
              </Label>
              <Textarea
                id="additionalContext"
                placeholder="Share workflows, constraints, or priorities..."
                {...register("additionalContext")}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-fuchsia-600 text-white shadow-lg shadow-cyan-500/25 hover:from-teal-500 hover:via-cyan-500 hover:to-fuchsia-500 sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing opportunities...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Find AI Use Cases
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
