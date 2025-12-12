"use client";

import { useState } from "react";
import TExplorerTripCard from "./TripCard";
import UpdateTripDialog from "./UpdateTripDialog";

export default function TripsGrid({ trips }: { trips: any[] }) {
  const [editingTrip, setEditingTrip] = useState<any | null>(null);

  if (!trips || trips.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-10">
        No trips found.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TExplorerTripCard
            key={trip.id}
            trip={trip}
            onEdit={() => setEditingTrip(trip)}
          />
        ))}
      </div>

      <UpdateTripDialog
        open={!!editingTrip}
        onClose={() => setEditingTrip(null)}
        trip={editingTrip}
      />
    </>
  );
}
