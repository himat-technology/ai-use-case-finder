"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalysisResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0f766e", "#115e59", "#0d9488", "#14b8a6", "#5eead4", "#99f6e4"];

interface ChartsProps {
  result: AnalysisResponse;
}

export function OpportunityCharts({ result }: ChartsProps) {
  const scoreDistribution = result.useCases.map((uc) => ({
    name: uc.title.length > 18 ? `${uc.title.slice(0, 18)}...` : uc.title,
    score: uc.opportunityScore.overall,
  }));

  const categoryData = Object.entries(result.categoryBreakdown)
    .filter(([, count]) => count > 0)
    .map(([name, value]) => ({ name, value }));

  const roiData = result.useCases.map((uc) => ({
    name: uc.title.length > 16 ? `${uc.title.slice(0, 16)}...` : uc.title,
    roi: uc.opportunityScore.potentialRoi,
  }));

  const difficultyData = ["Easy", "Medium", "Advanced"].map((level) => ({
    name: level,
    count: result.useCases.filter((uc) => uc.implementationDifficulty === level)
      .length,
  }));

  return (
    <section id="analytics" className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-teal-950">Visual Analytics</h2>
        <p className="mt-1 text-sm text-slate-600">
          Compare opportunity scores, categories, ROI potential, and difficulty.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Opportunity Score Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="score" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">ROI Potential</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="roi" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Implementation Difficulty</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#115e59" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
