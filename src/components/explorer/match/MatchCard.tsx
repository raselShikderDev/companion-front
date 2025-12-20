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
  console.log({ currentExplorerId });

  const isMatchParticipant =
    currentExplorerId === match.requesterId ||
    currentExplorerId === match.recipientId;

  const hasAlreadyReviewed = match.reviews?.some(
    (review: any) => review.reviewerId === currentExplorerId
  );

  const canGiveReview =
    match.status === "COMPLETED" && isMatchParticipant && !hasAlreadyReviewed;
  // console.log({canGiveReview});

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

  console.log({ match });

  console.log({ statrtDate: match.trip.startDate });
  console.log({ endDate: match.trip.endDate });

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
            className={`${
              match.status === "ACCEPTED"
                ? "bg-primary"
                : match.status === "COMPLETED"
                ? "bg-accent"
                : match.status === "REJECTED"
                ? "bg-red-500"
                : "secondary"
            }`}
            // variant={
            //   match.status === "ACCEPTED"
            //     ? "default"
            //     : match.status === "REJECTED"
            //     ? "destructive"
            //     : match.status === "PENDING"
            //     ? "secondary"
            //     : "outline"
            // }
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
        />
      </CardContent>
    </Card>
  );
}

// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Calendar, MapPin } from "lucide-react";
// import { Match } from "@/types/match.interface";
// import { formatDate } from "@/lib/formateDate";
// import MatchActionButtons from "./MatchActionButtons";
// import { MatchStatus } from "@/types/enum.interface";
// import { getCookie } from "@/lib/tokenHandeler";
// import { JwtPayload } from "jsonwebtoken";
// import { verifyAccessToken } from "@/lib/jwtHandler";

// export default async function MatchCard({ match, canGiveReview }: { match: Match; canGiveReview: boolean; }) {
//   const accessToken = await getCookie("accessToken");
//   let currentExplorerId: string | null = null;

//   if (accessToken) {
//     const verifiedToken = (await verifyAccessToken(
//       accessToken
//     )) as JwtPayload & { payload?: any };

//     currentExplorerId = verifiedToken?.payload?.userId ?? null;
//   }
//   console.log("matchCard user id", currentExplorerId);

//   return (
//     <Card className="overflow-hidden hover:shadow-md transition">
//       {/* IMAGE */}
//       {match.trip.image && (
//         <div className="relative aspect-video bg-muted">
//           <Image
//             src={match.trip.image}
//             alt={match.trip.title}
//             fill
//             className="object-cover"
//           />
//         </div>
//       )}

//       {/* HEADER */}
//       <CardHeader className="space-y-1">
//         <div className="flex items-center justify-between">
//           <h3 className="font-semibold">{match.trip.title}</h3>

//           <Badge
//             className={`${
//               match.status === "ACCEPTED"
//                 ? "bg-primary"
//                 : match.status === "COMPLETED"
//                 ? "bg-accent"
//                 : match.status === "REJECTED"
//                 ? "bg-red-500"
//                 : "secondary"
//             }`}
//             // variant={
//             //   match.status === "ACCEPTED"
//             //     ? "default"
//             //     : match.status === "REJECTED"
//             //     ? "destructive"
//             //     : match.status === "PENDING"
//             //     ? "secondary"
//             //     : "outline"
//             // }
//           >
//             {match.status}
//           </Badge>
//         </div>

//         <p className="text-sm text-muted-foreground flex items-center gap-2">
//           <MapPin className="h-4 w-4" />
//           {match.trip.departureLocation} → {match.trip.destination}
//         </p>
//       </CardHeader>

//       {/* CONTENT */}
//       <CardContent className="space-y-4">
//         {/* DATE */}
//         <div className="flex items-center gap-2 text-sm">
//           <Calendar className="h-4 w-4 text-primary" />
//           {formatDate(match.trip.startDate)} – {formatDate(match.trip.endDate)}
//         </div>

//         {/* USER */}
//         <div className="text-sm text-muted-foreground">
//           Matched with{" "}
//           <span className="font-medium">{match.requester.fullName}</span>
//         </div>

//         {/* <MatchActionButtons
//           matchId={match.id}
//           status={match.status as MatchStatus}
//         /> */}
//          <MatchActionButtons
//         matchId={match.id}
//         status={match.status}
//         canGiveReview={canGiveReview}
//       />
//       </CardContent>
//     </Card>
//   );
// }
