"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MatchCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <Skeleton className="aspect-video w-full" />

      <CardHeader className="space-y-2 px-4 py-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-5">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
