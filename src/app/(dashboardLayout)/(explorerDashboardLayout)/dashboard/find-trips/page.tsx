
import TripCardForBookGrid from "@/components/explorer/match/TripCardForBookGrid";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import { getAvailableTrips } from "@/services/trips/getAvailableTrips.service";

export default async function AllAvailableTripsPage() {
  const res = await getAvailableTrips({ page: 1, limit: 30 });
  let trips: [];
  if (res.success) {
    trips = res.data;
  } else {
    trips = [];
  }
  if (trips.length === 0) return  <EmptyTripCard/>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Find Compatible Travelers</h1>
      <p className="text-muted-foreground mb-8">
        Our smart algorithm matches you with perfect travel companions
      </p>

      {trips.length === 0 && <EmptyTripCard />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               <TripCardForBookGrid trips={trips} />

     
      </div>
    </div>
  );
}