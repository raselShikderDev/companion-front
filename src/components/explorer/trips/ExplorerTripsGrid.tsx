import { TExplorerTripCard } from "./ExplorerTripCard";

interface Trip {
  id: string;
  title: string;
  image: string | null;
  destination: string;
  departureLocation: string;
  startDate: string;
  endDate: string;
  description: string;
  budget: string;
  journeyType: string[];
  matchCompleted: boolean;
  duration: string;
  Languages: string[];
  status: string;
}


interface TripsGridProps {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (id: string) => void;
}

export function ExplorerTripsGrid({ trips, onEdit, onDelete }: TripsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TExplorerTripCard
          key={trip.id}
          trip={trip}
          onEdit={() => onEdit(trip)}
          onDelete={() => onDelete(trip.id)}
        />
      ))}
    </div>
  );
}
