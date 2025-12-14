/** biome-ignore-all lint/style/useImportType: > */
import { IAvailableTrip } from "@/types/trip.interface"
import TripCardForBook from "./TripCardForBook"

const TripCardForBookGrid = ({trips}:{trips:IAvailableTrip[]}) => {
  return (
    <div>
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
