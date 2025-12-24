/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
/** biome-ignore-all lint/correctness/noUnusedImports: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import {
  MapPin,
  Star,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getExplorerAnalysis } from "@/services/analysis/getExplorerAnalysis.service";

type ExplorerStats = {
  totalTrips: number;
  totalMatches: number;
  totalReviews: number;
  activeTrips: number;
  isPremium: boolean;
  activeSubscription: string | null;
  matchSuccessRate: number;
  completedTrips: number;
  averageRating: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<ExplorerStats | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getExplorerAnalysis();
      if (res.success) {
        setStats(res.data);
      }
    })();
  }, []);

  /* Skeleton loading */
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(8)].map((_, ind) => (
          <Card key={ind} className="h-28 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  const statsData = [
    // {
    //   title: "Total Trips",
    //   value: stats.totalTrips,
    //   icon: MapPin,
    //   color: "text-primary",
    // },
    {
      title: "Active Trips",
      value: stats.activeTrips,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Completed Trips",
      value: stats.completedTrips,
      icon: CheckCircle,
      color: "text-green-500",
    },
    // {
    //   title: "Total Matches",
    //   value: stats.totalMatches,
    //   icon: Users,
    //   color: "text-blue-500",
    // },
    // {
    //   title: "Match Success Rate",
    //   value: `${stats.matchSuccessRate}%`,
    //   icon: Users,
    //   color: "text-emerald-500",
    // },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: Star,
      color: "text-yellow-500",
    },
    // {
    //   title: "Average Rating",
    //   value: stats.averageRating.toFixed(1),
    //   icon: Star,
    //   color: "text-orange-500",
    // },
    {
      title: "Subscription",
      value: stats.isPremium ? "Premium" : "Free",
      icon: Zap,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="border-2 border-border hover:border-accent/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                <span>{stat.title}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
