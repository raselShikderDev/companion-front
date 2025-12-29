
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import TripsTable from "@/components/admin/ManageTrips/TripsTable"
import Pagination from "@/components/shared/Paggination"

import { queryStringFormatter } from "@/lib/allFormattors"
import { getAllTrips } from "@/services/trips/allTrips.service"
import SearchFilterTrips from "@/components/admin/ManageTrips/SearchFilterTrips"

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
          <CardDescription>Total: {res.meta?.total} trips available</CardDescription>
        </CardHeader>

        <CardContent>
         <SearchFilterTrips/>
          <div className="space-y-3.5">
            <TripsTable trips={trips} />
            <Pagination currentPages={currentpage} totalPages={totalPages} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
