/** @format */
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

interface MatchDetailsPageProps {
  params: Promise<{
    matchId: string;
  }>;
}

export default async function MatchDetailsPage({
  params,
}: MatchDetailsPageProps) {
  const matchId = await params;

  if (!matchId.matchId) {
    return <EmptyTripCard />;
  }


  const response = await getMatchById(matchId.matchId);

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
  console.log({ match });

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
            <CardTitle className="text-2xl">{match.trip.title}</CardTitle>

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
            Matched on {new Date(match.createdAt).toLocaleDateString()}
          </div>

          {/* Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requester */}
            <UserCard
              title="Requester"
              name={match.requester.fullName}
              avatar={match.requester.profilePicture}
            />

            {/* Recipient */}
            <UserCard
              title="Recipient"
              name={match.recipient.fullName}
              avatar={match.recipient.profilePicture}
            />
          </div>
        </CardContent>
      </Card>
      {/* Reviews */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Reviews</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Review Form */}
          {match.status === "COMPLETED" && (
            <CreateReviewForm matchId={match.id} />
          )}

          {/* Review List */}
          <ReviewsSection reviews={match?.reviews} matchId={match?.id} />
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Small Helper Component ---------------- */

function UserCard({
  title,
  name,
  avatar,
}: {
  title: string;
  name: string;
  avatar?: string;
}) {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
          {avatar && (
            <Image src={avatar} alt={name} fill className="object-cover" />
          )}
        </div>
        <div>
          <p className="font-medium">{name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
