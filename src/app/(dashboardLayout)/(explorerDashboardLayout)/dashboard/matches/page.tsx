/** biome-ignore-all lint/style/useImportType: > */
import { MyMatchesGrid } from "@/components/explorer/match/MyMatchesGrid";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import { getMyMatches } from "@/services/match/myMatches.service";
import { Match } from "@/types/match.interface";

export default async function MyMatchesPage() {
  const res = await getMyMatches({ page: 1, limit: 20 });
  let matches: Match[] | [];
  if (res.success) {
    matches = res.data;
  } else {
    matches = [];
  }

  if (!res?.success) {
    return (
      <EmptyTripCard/>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Matches</h1>
      <p className="text-muted-foreground mb-6">
        View accepted, rejected, and pending match requests
      </p>

      <MyMatchesGrid matches={matches} />
    </div>
  );
}
