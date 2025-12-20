/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { MyMatchesGrid } from "@/components/explorer/match/MyMatchesGrid";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import { getMyMatches } from "@/services/match/myMatches.service";
import { Match } from "@/types/match.interface";
import { getCookie } from "@/lib/tokenHandeler";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "@/lib/jwtHandler";

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

   const accessToken = await getCookie("accessToken");
  let currentExplorerId: string | null = null;

  if (accessToken) {
    const verifiedToken = (await verifyAccessToken(
      accessToken
    )) as JwtPayload & { payload?: any };

    currentExplorerId = verifiedToken?.payload?.userId ?? null;
  }
  console.log("matchCard user id", currentExplorerId);

 if (!currentExplorerId) {
  console.error("No explorer id found")
 }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Matches</h1>
      <p className="text-muted-foreground mb-6">
        View accepted, rejected, and pending match requests
      </p>

      {/* <MyMatchesGrid matches={matches} /> */}
      <MyMatchesGrid currentExplorerId={currentExplorerId as string} matches={matches} />
    </div>
  );
}
