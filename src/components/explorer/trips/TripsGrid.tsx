/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use client";

import { useState } from "react";
import TExplorerTripCard from "./TripCard";
import UpdateTripDialog from "./UpdateTripDialog";
import EmptyTripCard from "@/components/shared/EmptyTripCard";

export default function TripsGrid({ trips, currentExplorerId }: { trips: any[], currentExplorerId: string }) {
  const [editingTrip, setEditingTrip] = useState<any | null>(null);

  return (
    <div>
      {trips.length === 0 && <EmptyTripCard />}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TExplorerTripCard
            key={trip.id}
            trip={trip}
            onEdit={() => setEditingTrip(trip)}
            currentExplorerId={currentExplorerId as string}
          />
        ))}
      </div>

      <UpdateTripDialog
        open={!!editingTrip}
        onClose={() => setEditingTrip(null)}
        trip={editingTrip}
      />
    </div>
  );
}
