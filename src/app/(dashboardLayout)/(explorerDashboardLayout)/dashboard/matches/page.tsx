/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { MyMatchesGrid } from "@/components/explorer/match/MyMatchesGrid";
import { getMyMatches } from "@/services/match/myMatches.service";
import getUserVerifiedDetails from "@/lib/getUserVerifiedDetails";
import { queryStringFormatter } from "@/lib/allFormattors";
import Pagination from "@/components/shared/Paggination";
import { Suspense } from "react";
import MatchesGridSkeleton from "@/components/explorer/match/MatchesGridSkeleton";

export default async function MyMatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getMyMatches(queryString);
  let matches: any | [];

  if (res.success) {
    matches = res.data;
  } else {
    matches = [];
  }



  const { id } = await getUserVerifiedDetails();
  let currentExplorerId: string | null = null;

  if (!id) {
    console.error("No explorer id found");
  }

  currentExplorerId = id;
  console.log({ matches });

  const meta = matches.meta;
  if (meta && !meta.total && !meta.limit && !meta.page) {
    console.log("meta not found");
  }
  const totalPages = Math.ceil(meta?.total / meta?.limit) || 1;
  const currentpage = meta?.page || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Matches</h1>
      <p className="text-muted-foreground mb-6">
        View accepted, rejected, and pending match requests
      </p>

      <div className="space-y-3.5">
        <Suspense fallback={<MatchesGridSkeleton />}>
          <MyMatchesGrid
            currentExplorerId={currentExplorerId as string}
            matches={matches}
          />
        </Suspense>

        <Pagination
          currentPages={currentpage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
