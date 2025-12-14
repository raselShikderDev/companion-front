/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/style/useImportType: > */
"use client";

import { useState } from "react";
import { MatchFilterTabs } from "./MatchFilterTabs";
import { Match } from "@/types/match.interface";
import { MatchCard } from "./MatchCard";
import EmptyTripCard from "@/components/shared/EmptyTripCard";

export function MyMatchesGrid({ matches }: { matches: any }) {
  console.log({ matches });

  const [filter, setFilter] = useState("ALL");

  const filteredMatches =
    filter === "ALL"
      ? matches
      : matches.filter((m: { status: string }) => m.status === filter);

  console.log({ filteredMatches });

  if (filteredMatches?.data?.length === 0) {
    return <EmptyTripCard />;
  }

  return (
    <>
      <MatchFilterTabs active={filter} onChange={setFilter} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMatches?.data?.map((match: Match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
