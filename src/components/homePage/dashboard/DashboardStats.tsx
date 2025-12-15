/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
"use client";
import { MapPin, Star, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getExplorerAnalysis } from "@/services/analysis/getExplorerAnalysis.service";

const statss = [
  { title: "Active Trips", value: "2", icon: MapPin, color: "text-accent" },
  { title: "Match Score", value: "94%", icon: Users, color: "text-green-500" },
  { title: "Reviews Left", value: "8", icon: Star, color: "text-yellow-500" },
  {
    title: "Subscribed Plan",
    value: "Premium",
    icon: Zap,
    color: "text-accent",
  },
];

const DashboardStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getExplorerAnalysis();
        setStats(res);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);
  console.log({ stats });

  const statsData = [
  { title: "Active Trips", value: "2", icon: MapPin, color: "text-accent" },
  { title: "Match Score", value: "94%", icon: Users, color: "text-green-500" },
  { title: "Reviews Left", value: "8", icon: Star, color: "text-yellow-500" },
  {
    title: "Subscribed Plan",
    value: "Premium",
    icon: Zap,
    color: "text-accent",
  },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statsData?.map((stat: any, index: any) => {
        const Icon = stat?.icon;
        return (
          <Card
            key={index}
            className="border-2 border-border hover:border-accent/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                <span>{stat?.title}</span>
                <Icon className={`w-5 h-5 ${stat?.color}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stat?.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
