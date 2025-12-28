
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import RefreshButton from "@/components/shared/RefreshButton"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import TripsTable from "@/components/admin/ManageTrips/TripsTable"
import Pagination from "@/components/shared/Paggination"
import ClearFiltersButton from "@/components/shared/ClearFilter"
import DateRangeFilter from "@/components/shared/DateRangeFilter"
import SelectFilter from "@/components/shared/SelectFilter"
import { TripStatus } from "@/types/enum.interface"
import { queryStringFormatter } from "@/lib/allFormattors"
import { getAllTrips } from "@/services/trips/allTrips.service"

export default async function ManageTrips({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllTrips(queryString);
  console.log({ res });

  const trips = res.success ? res.data : [];
  console.log({ trips });

  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });


  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Trips</h1>
        <p className="text-muted-foreground">View and manage all curated trips</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Trips</CardTitle>
          <CardDescription>Total: {trips.length} trips available</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
              <div className="flex items-center gap-3">
        <SelectFilter
          paramName="status"
          placheholder="Trip Status"
          defaultValue="All Trips"
          options={[
            { label: TripStatus.COMPLETED, value: "false" },
            { label: TripStatus.PLANNED, value: "false" },
            { label: TripStatus.CANCELLED, value: "false" },
          ]}
        />
        <DateRangeFilter />
        <ClearFiltersButton />
      </div>
          </div>
          <div className="space-y-3.5">
            <TripsTable trips={trips}/>
            <Pagination currentPages={currentpage} totalPages={totalPages} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
