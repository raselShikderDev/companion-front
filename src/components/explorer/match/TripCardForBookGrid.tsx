/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { IAvailableTrip } from "@/types/trip.interface";
import TripCardForBook from "./TripCardForBook";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import EmptyTripCard from "@/components/shared/EmptyTripCard";

const TripCardForBookGrid = ({ trips }: { trips: IAvailableTrip[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {/* <SearchFilter paramName="searchTerm" placeholder="Search Trips..." /> */}
        {/* <SelectFilter
          paramName="status"
          placheholder="Trip Status"
          defaultValue="All trips"
          options={[
            { label: "PLANNED", value: "false" },
            { label: "COMPLETED", value: "true" },
            { label: "CANCELLED", value: "true" },
          ]}
        /> */}
        <DateRangeFilter />
        <ClearFiltersButton />
      </div>
      {trips.length === 0 && <EmptyTripCard />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip: IAvailableTrip) => (
          <TripCardForBook key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default TripCardForBookGrid;
