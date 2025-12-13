/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */

import { useState } from "react";
import { MatchFilterTabs } from "./MatchFilterTabs";
import { Match } from "@/types/match.interface";
import { MatchCard } from "./MatchCard";

export function MyMatchesGrid({ matches }: { matches: Match[] }) {
  const [filter, setFilter] = useState("ALL");

  const filteredMatches =
    filter === "ALL"
      ? matches
      : matches.filter((m) => m.status === filter);

  if (filteredMatches.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-10">
        No matches found.
      </p>
    );
  }

  return (
    <>
      <MatchFilterTabs active={filter} onChange={setFilter} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
