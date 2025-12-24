/** biome-ignore-all assist/source/organizeImports: > */

import { getMyTrips } from "@/services/trips/getMyTrips.service";
import TripsGrid from "@/components/explorer/trips/TripsGrid";
import getUserVerifiedDetails from "@/lib/getUserVerifiedDetails";
import SelectFilter from "@/components/shared/SelectFilter";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import Pagination from "@/components/shared/Paggination";
import { queryStringFormatter } from "@/lib/allFormattors";

export default async function MyTripsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getMyTrips(queryString);

  const trips = res.success ? res.data : [];

  const { id } = await getUserVerifiedDetails();
  let currentExplorerId: string | null = null;

  if (!id) {
    console.error("No explorer id found");
  }

  currentExplorerId = id;

  console.log({ meta :res?.meta});

  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;
  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h1 className="text-4xl font-bold">My Trips</h1>
      <p className="text-muted-foreground">Manage & update your active trips</p>
      <div className="flex items-center gap-3">
        {/* <SearchFilter paramName="searchTerm" placeholder="Search Trips..." /> */}
        <SelectFilter
          paramName="status"
          placheholder="Trip Status"
          defaultValue="All trips"
          options={[
            { label: "PLANNED", value: "false" },
            { label: "COMPLETED", value: "true" },
            { label: "CANCELLED", value: "true" },
          ]}
        />
        <DateRangeFilter />
        <ClearFiltersButton />
      </div>
      <div className="space-y-3.5">
        <TripsGrid
          trips={trips}
          currentExplorerId={currentExplorerId as string}
        />
        <Pagination currentPages={currentpage} totalPages={totalPages} />
      </div>
    </div>
  );
}
