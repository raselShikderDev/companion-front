/** @format */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import { getMatchById } from "@/services/match/getMatchById.service";
import ReviewsSection from "@/components/explorer/review/ReviewsSection";
import CreateReviewForm from "@/components/explorer/review/CreateReviewForm";
import { getCookie } from "@/lib/tokenHandeler";
import { verifyAccessToken } from "@/lib/jwtHandler";
import { JwtPayload } from "jsonwebtoken";
import { UserCardWithProfileModal } from "@/components/shared/UserCardWithProfileModal";

interface MatchDetailsPageProps {
  params: Promise<{
    matchId: string;
  }>;
}

export default async function MatchDetailsPage({
  params,
}: MatchDetailsPageProps) {
  const { matchId } = await params;

  if (!matchId) {
    return <EmptyTripCard />;
  }

  const accessToken = await getCookie("accessToken");
  let currentExplorerId: string | null = null;

  if (accessToken) {
    const verifiedToken = (await verifyAccessToken(
      accessToken
    )) as JwtPayload & { payload?: any };

    currentExplorerId = verifiedToken?.payload?.userId ?? null;
  }

  const response = await getMatchById(matchId);

  if (!response?.success) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">Match not found</h2>
        <Link href="/dashboard/my-matches">
          <Button className="mt-4">Back to Matches</Button>
        </Link>
      </div>
    );
  }

  const match = response.data;

  /* ---------------- Review Logic ---------------- */
  const isMatchParticipant =
    currentExplorerId === match.requesterId ||
    currentExplorerId === match.recipientId;

  const hasAlreadyReviewed = match.reviews?.some(
    (review: any) => review.reviewerId === currentExplorerId
  );

  console.log("Reviews for this match:", match.reviews);

  const canGiveReview =
    match.status === "COMPLETED" &&
    isMatchParticipant &&
    !hasAlreadyReviewed;

  /* ---------------- UI ---------------- */
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      {/* Back */}
      <Link
        href="/dashboard/my-matches"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Matches
      </Link>

      {/* Trip Info */}
      <Card>
        {match.trip.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={match.trip.image}
              alt={match.trip.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl">
              {match.trip.title}
            </CardTitle>

            <Badge
              variant={
                match.status === "COMPLETED"
                  ? "default"
                  : match.status === "ACCEPTED"
                    ? "secondary"
                    : "outline"
              }
            >
              {match.status}
            </Badge>
          </div>

          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {match.trip.destination}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Match Dates */}
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            Matched on{" "}
            {new Date(match.createdAt).toLocaleDateString()}
          </div>

          {/* Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <UserCard
              title="Requester"
              name={match.requester.fullName}
              avatar={match.requester.profilePicture}
            /> */}
            <UserCardWithProfileModal
              title="Requester"
              explorer={match.requester}
            />
            <UserCardWithProfileModal
              title="Recipient"
              explorer={match.recipient}
            />
            {/* <UserCard
              title="Recipient"
              name={match.recipient.fullName}
              avatar={match.recipient.profilePicture}
            /> */}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Review Form */}
          {canGiveReview && (
            <CreateReviewForm matchId={match.id} />
          )}

          {/* Already Reviewed Message */}
          {isMatchParticipant && hasAlreadyReviewed && (
            <p className="text-sm text-muted-foreground">
              You have already submitted your review for this match.
            </p>
          )}

          {/* Review List */}
          <ReviewsSection

            match={match}
          />
        </CardContent>
      </Card>
    </div>
  );
}
