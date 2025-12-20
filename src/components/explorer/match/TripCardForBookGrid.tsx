/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { IAvailableTrip } from "@/types/trip.interface"
import TripCardForBook from "./TripCardForBook"
import SearchFilter from "@/components/shared/SearchFilter"

const TripCardForBookGrid = ({trips}:{trips:IAvailableTrip[]}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip: IAvailableTrip) => (
          <TripCardForBook
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>
    </div>
  )
}

export default TripCardForBookGrid
