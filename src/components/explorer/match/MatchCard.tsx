/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { MatchStatus } from "@/types/enum.interface";
import MatchActionButtons from "./MatchActionButtons";
import RatingStars from "@/components/shared/StarRating";
import { formatDateTime } from "@/lib/allFormattors";

export default async function MatchCard({
  match,
  currentExplorerId,
}: {
  match: any;
  currentExplorerId: string;
}) {
  const isMatchParticipant =
    currentExplorerId === match.requesterId ||
    currentExplorerId === match.recipientId;

  const hasAlreadyReviewed = match.reviews?.some(
    (review: any) => review.reviewerId === currentExplorerId
  );
  const canGiveReview =
    match.status === "COMPLETED" && isMatchParticipant && !hasAlreadyReviewed;

  const validReviews =
    match.reviews?.filter((review: any) => typeof review.rating === "number") ??
    [];

  const averageRating =
    validReviews.length > 0
      ? (
          validReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          validReviews.length
        ).toFixed(1)
      : null;
  
  const isTripCreator = currentExplorerId === match?.trip?.creatorId;
  const isMatchCreator = currentExplorerId === match?.requesterId;

  const statusStyles: Record<string, string> = {
    ACCEPTED: "bg-emerald-500 hover:bg-emerald-600 text-white border-none",
    COMPLETED: "bg-blue-600 hover:bg-blue-700 text-white border-none",
    REJECTED: "bg-red-500 hover:bg-red-600 text-white border-none",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
    DEFAULT: "bg-slate-100 text-slate-600",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      {/* IMAGE */}
      {match.trip.image && (
        <div className="relative aspect-video bg-muted">
          <Image
            src={match.trip.image}
            alt={match.trip.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* HEADER */}
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{match.trip.title}</h3>

          <Badge
            variant="outline" // Base variant
            className={`px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm ${
              statusStyles[match.status] || statusStyles.DEFAULT
            }`}
          >
            {match.status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {match.trip.departureLocation} → {match.trip.destination}
        </p>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-4">
        {/* DATE */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          {formatDateTime(match.trip.startDate)} –{" "}
          {formatDateTime(match.trip.endDate)}
        </div>

        {/* USER */}
        <div className="text-sm text-muted-foreground">
          Matched with{" "}
          <span className="font-medium">{match.requester.fullName}</span>
        </div>
        <div className="text-sm">
          {averageRating ? (
            <div className="flex items-center gap-2">
              <RatingStars rating={Number(averageRating)} />
              <span className="text-xs text-muted-foreground">
                ({averageRating}/5 · {validReviews.length} reviews)
              </span>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <MatchActionButtons
          matchId={match.id}
          status={match.status as MatchStatus}
          canGiveReview={canGiveReview}
          isTripCreator={isTripCreator}
          isMatchCreator={isMatchCreator}
        />
      </CardContent>
    </Card>
  );
}
