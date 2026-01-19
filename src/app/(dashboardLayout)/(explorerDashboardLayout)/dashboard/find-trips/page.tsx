/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
import MatchesGridSkeleton from "@/components/explorer/match/MatchesGridSkeleton";
import TripCardForBookGrid from "@/components/explorer/match/TripCardForBookGrid";
import Pagination from "@/components/shared/Paggination";
import { queryStringFormatter } from "@/lib/allFormattors";
import { getAvailableTrips } from "@/services/trips/getAvailableTrips.service";
import { Suspense } from "react";

export default async function AllAvailableTripsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAvailableTrips(queryString);
  let trips: any | [];
  if (res.success) {
    trips = res.data;
  } else {
    trips = [];
  }


  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Find Compatible Travelers</h1>
      <p className="text-muted-foreground mb-8">
        Our smart algorithm matches you with perfect travel companions
      </p>

      <div className="space-y-3.5">
        <Suspense fallback={<MatchesGridSkeleton />}>
          <TripCardForBookGrid trips={trips} />
        </Suspense>

        <Pagination
          currentPages={currentpage}
          totalPages={totalPages}
        />
      </div>

    </div>
  );
}
