/** biome-ignore-all lint/style/useTemplate: > */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */

import TripCardForBook from "@/components/explorer/match/TripCardForBook";
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
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Find Compatible Travelers</h1>
      <p className="text-muted-foreground mb-8">
        Our smart algorithm matches you with perfect travel companions
      </p>

      {trips.length === 0 && <EmptyTripCard />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip: any) => (
          <TripCardForBook
            key={trip.id}
            tripId={trip.id}
            image={trip.image}
            destination={trip.destination}
            title={trip.title}
            duration={trip.duration}
            price={"$" + trip.budget}
            rating={4.5}
            travelers={trip.requiredPerson}
            tags={trip.journeyType}
          />
        ))}
      </div>
    </div>
  );
}
