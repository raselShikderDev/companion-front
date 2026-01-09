/** biome-ignore-all assist/source/organizeImports: > */

import {
  Users,
  Compass,
  MapPin,
  GitMerge,
  DollarSign,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminStatsCardsProps {
  stats: {
    totalUsers: number;
    totalExplorers: number;
    totalTrips: number;
    totalMatches: number;
    totalRevenue: number;
    tripCompletionRate: number;
    userGrowth: number;
  };
}

export default function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users },
    { label: "Explorers", value: stats.totalExplorers, icon: Compass },
    { label: "Trips Created", value: stats.totalTrips, icon: MapPin },
    { label: "Total Matches", value: stats.totalMatches, icon: GitMerge },
    { label: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign },
    {
      label: "Trip Completion",
      value: `${stats.tripCompletionRate}%`,
      icon: CheckCircle,
    },
    { label: "User Growth", value: `+${stats.userGrowth}%`, icon: TrendingUp },
  ];

  return (
    <div className="p-8 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Platform overview & management center
        </p>
      </div>

      {/* ================= STATS GRID ================= */}
      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.label}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold mt-1">{item.value}</p>
                </div>

                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ================= MANAGEMENT ACTIONS ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-accent/30 hover:border-accent transition-colors bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Manage Users</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage user accounts
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Go to Users
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/30 hover:border-accent transition-colors bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Manage Trips</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor and manage all trips
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Go to Trips
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/30 hover:border-accent transition-colors bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Manage Matches</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Review and control matches
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Go to Matches
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
