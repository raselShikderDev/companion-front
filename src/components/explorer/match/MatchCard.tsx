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
import { formatDateOnly, formatDateTime } from "@/lib/allFormattors";

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
    match.reviews?.filter((r: any) => typeof r.rating === "number") ?? [];

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
    ACCEPTED: "bg-emerald-600 text-white",
    COMPLETED: "bg-blue-600 text-white",
    REJECTED: "bg-red-600 text-white",
    PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
    DEFAULT: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="group flex flex-col overflow-hidden rounded-xl transition-all duration-200 hover:shadow-lg">
      {/* IMAGE */}
      {match.trip.image && (
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={match.trip.image}
            alt={match.trip.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* HEADER */}
      <CardHeader className="space-y-3 px-4 pt-4 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">
            {match.trip.title}
          </h3>

          <Badge
            className={`w-fit text-xs font-semibold ${
              statusStyles[match.status] || statusStyles.DEFAULT
            }`}
          >
            {match.status}
          </Badge>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="wrap-break-word">
            {match.trip.departureLocation} → {match.trip.destination}
          </span>
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col gap-4 px-4 pb-4 sm:px-5">
        {/* DATE */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary shrink-0" />
          <span>
            {formatDateOnly(formatDateTime(match.trip.startDate))} –{" "}
            {formatDateOnly(formatDateTime(match.trip.endDate))}
          </span>
        </div>

        {/* USER */}
        <p className="text-sm text-muted-foreground">
          Matched with{" "}
          <span className="font-medium text-foreground">
            {match.requester.fullName}
          </span>
        </p>

        {/* RATING */}
        {averageRating && (
          <div className="flex flex-wrap items-center gap-2">
            <RatingStars rating={Number(averageRating)} />
            <span className="text-xs text-muted-foreground">
              {averageRating}/5 · {validReviews.length} reviews
            </span>
          </div>
        )}

        {/* ACTIONS */}
        <div className="pt-3">
          <MatchActionButtons
            matchId={match.id}
            status={match.status as MatchStatus}
            canGiveReview={canGiveReview}
            isTripCreator={isTripCreator}
            isMatchCreator={isMatchCreator}
          />
        </div>
      </CardContent>
    </Card>
  );
}
