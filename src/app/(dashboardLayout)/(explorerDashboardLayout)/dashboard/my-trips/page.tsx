/** biome-ignore-all assist/source/organizeImports: > */

import { getMyTrips } from "@/services/trips/getMyTrips.service";
import TripsGrid from "@/components/explorer/trips/TripsGrid";

export default async function MyTripsPage() {
  const res = await getMyTrips({ page: 1, limit: 30 });

  const trips = res.success ? res.data : [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h1 className="text-4xl font-bold">My Trips</h1>
      <p className="text-muted-foreground">Manage & update your active trips</p>

      <TripsGrid trips={trips} />
    </div>
  );
}
