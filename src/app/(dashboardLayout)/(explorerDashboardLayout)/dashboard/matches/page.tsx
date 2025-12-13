import { MyMatchesGrid } from "@/components/explorer/match/MyMatchesGrid";
import { getMyMatches } from "@/services/match/myMatches.service";

export default async function MyMatchesPage() {
  const res = await getMyMatches({ page: 1, limit: 20 });

  if (!res?.success) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500">
        Failed to load matches
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Matches</h1>
      <p className="text-muted-foreground mb-6">
        View accepted, rejected, and pending match requests
      </p>

      <MyMatchesGrid matches={res.data} />
    </div>
  );
}
