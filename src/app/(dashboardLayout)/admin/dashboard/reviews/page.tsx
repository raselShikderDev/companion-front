
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import TripsTable from "@/components/admin/ManageTrips/TripsTable"
import Pagination from "@/components/shared/Paggination"
import ClearFiltersButton from "@/components/shared/ClearFilter"
import DateRangeFilter from "@/components/shared/DateRangeFilter"
import SelectFilter from "@/components/shared/SelectFilter"
import { ReviewStatus, TripStatus } from "@/types/enum.interface"
import { queryStringFormatter } from "@/lib/allFormattors"
import { getAllTrips } from "@/services/trips/allTrips.service"
import { getAllReviews } from "@/services/review/getAllReviews.services"
import ReviewsTable from "@/components/admin/manageReviews/ReviewsTable"
import { IReview } from "@/types/review.interface"

export default async function ManageTrips({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllReviews(queryString);
let reviews: IReview[] | [];
console.log({success:res.success});
if (res.success) {
  reviews = res.data.data
} else {
  reviews = []
}

  
  console.log({ reviews });

  const totalPages = Math.ceil(res?.data?.meta?.total / res?.data?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  // console.log({ totalpage: Math.ceil(res?.data?.meta?.total / res?.data?.meta?.limit) });
  // console.log({ currentpage: res?.data?.meta?.page });


  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Reviews</h1>
        <p className="text-muted-foreground">View and manage all reviews</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>Total: {res.meta?.total} Reviews available</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
              <div className="flex items-center gap-3">
        <SelectFilter
          paramName="status"
          placheholder="Review Status"
          defaultValue="All"
          options={[
            { label: ReviewStatus.APPROVED, value: "false" },
            { label: ReviewStatus.PENDING, value: "false" },
            { label: ReviewStatus.REJECTED, value: "false" },
          ]}
        />
        <DateRangeFilter />
        <ClearFiltersButton />
      </div>
          </div>
          <div className="space-y-3.5">
            <ReviewsTable reviews={reviews}/>
            <Pagination currentPages={currentpage} totalPages={totalPages} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
