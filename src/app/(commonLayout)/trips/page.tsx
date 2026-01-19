/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
import MatchesGridSkeleton from "@/components/explorer/match/MatchesGridSkeleton";
import TripCardForBook from "@/components/explorer/match/TripCardForBook";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import { Button } from "@/components/ui/button";
import { getAllTrips } from "@/services/trips/allTrips.service";
import { IAvailableTrip } from "@/types/trip.interface";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function PublicTripsPage() {
  const res = await getAllTrips();
  let trips: any | [];
  if (res.success) {
    trips = res.data;
  } else {
    trips = [];
  }
  console.log({ trips });

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
          {trips.length === 0 && <EmptyTripCard />}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip: IAvailableTrip) => (
              <TripCardForBook key={trip.id} trip={trip} />
            ))}
          </div>
        </Suspense>
      </div>
      <div className="mt-5 text-center">
        <Link href={"/dashboard/find-trips"}>
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            View All Trips <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
