/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/style/useImportType: > */

import { Match } from "@/types/match.interface";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import MatchCard from "./MatchCard";
import SelectFilter from "@/components/shared/SelectFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import SearchFilterMatches from "@/components/admin/matchs/SearchFilterMatches";

export function MyMatchesGrid({
  matches,
  currentExplorerId,
}: {
  matches: any;
  currentExplorerId: string;
}) {
  // console.log({ matches });

  if (matches?.length === 0) {
    return <EmptyTripCard />;
  }

  return (
    <div className="space-y-3.5">
      <SearchFilterMatches />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches?.data?.map((match: Match) => (
          <MatchCard
            key={match.id}
            match={match}
            currentExplorerId={currentExplorerId as string}
          />
        ))}
      </div>
    </div>
  );
}

// import MatchCard from "./MatchCard";
// import { getCookie } from "@/lib/tokenHandeler";
// import { verifyAccessToken } from "@/lib/jwtHandler";
// import { JwtPayload } from "jsonwebtoken";

// export default async function MyMatchesGrid({
//   matches,
// }: {
//   matches: any[];
// }) {
//   /* ---------- AUTH (RUN ONCE) ---------- */
//   const accessToken = await getCookie("accessToken");
//   let currentExplorerId: string | null = null;

//   if (accessToken) {
//     const verifiedToken = (await verifyAccessToken(
//       accessToken
//     )) as JwtPayload & { payload?: any };

//     currentExplorerId = verifiedToken?.payload?.userId ?? null;
//   }

//   /* ---------- RENDER ---------- */
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {matches.map((match) => {
//         const isMatchParticipant =
//           currentExplorerId === match.requesterId ||
//           currentExplorerId === match.recipientId;

//         const hasAlreadyReviewed = match.reviews?.some(
//           (review:any) => review.reviewerId === currentExplorerId
//         );

//         const canGiveReview =
//           match.status === "COMPLETED" &&
//           isMatchParticipant &&
//           !hasAlreadyReviewed;

//         return (
//           <MatchCard
//             key={match.id}
//             match={match}
//             canGiveReview={canGiveReview}
//           />
//         );
//       })}
//     </div>
//   );
// }
