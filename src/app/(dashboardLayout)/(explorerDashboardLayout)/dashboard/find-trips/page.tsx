/** biome-ignore-all lint/suspicious/noExplicitAny: > */
import TripCardForBookGrid from "@/components/explorer/match/TripCardForBookGrid";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import Pagination from "@/components/shared/Paggination";
import { queryStringFormatter } from "@/lib/allFormattors";
import { getAvailableTrips } from "@/services/trips/getAvailableTrips.service";

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

  
  const meta = trips.meta;
  if (meta && !meta.total && !meta.limit && !meta.page) {
    console.log("meta not found");
  }
  console.log({meta});
  
  const totalPages = Math.ceil(meta?.total / meta?.limit) || 1;
  const currentpage = meta?.page || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Find Compatible Travelers</h1>
      <p className="text-muted-foreground mb-8">
        Our smart algorithm matches you with perfect travel companions
      </p>

      <div className="space-y-3.5">

      <TripCardForBookGrid trips={trips} />
       <Pagination
          currentPages={currentpage}
          totalPages={totalPages}
        />
      </div>

    </div>
  );
}
