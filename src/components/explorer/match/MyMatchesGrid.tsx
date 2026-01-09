/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/style/useImportType: > */

import { Match } from "@/types/match.interface";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import MatchCard from "./MatchCard";
import SearchFilterMatches from "@/components/admin/matchs/SearchFilterMatches";

export function MyMatchesGrid({
  matches,
  currentExplorerId,
}: {
  matches: any;
  currentExplorerId: string;
}) {
  if (!matches?.data || matches.data.length === 0) {
    return <EmptyTripCard />;
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <SearchFilterMatches />

      <div
        className="
    columns-1
    sm:columns-2
    lg:columns-3
    xl:columns-4
    2xl:columns-5
    gap-4
  "
      >
        {matches.data.map((match: Match) => (
          <div key={match.id} className="mb-4 break-inside-avoid">
            <MatchCard
              match={match}
              currentExplorerId={currentExplorerId}
            />
          </div>
        ))}
      </div>

    </section>
  );
}
