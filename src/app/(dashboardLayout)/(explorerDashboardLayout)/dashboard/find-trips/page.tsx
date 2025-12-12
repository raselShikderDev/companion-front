/** biome-ignore-all lint/style/useTemplate: > */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */

import TripCardForBook from "@/components/explorer/match/TripCardForBook";
import { getAllTrips } from "@/services/trips/allTrips.service";

export default async function AllTripsPage() {
  const trips = await getAllTrips(); // SERVER EXECUTION

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">All Trips</h1>
      <p className="text-muted-foreground mb-8">
        Explore exciting trips and start your adventure
      </p>

      {trips.length === 0 && (
        <p className="text-muted-foreground">No trips available</p>
      )}

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
