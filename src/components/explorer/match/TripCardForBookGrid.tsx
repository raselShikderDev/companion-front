/** biome-ignore-all lint/style/useImportType: > */
import { IAvailableTrip } from "@/types/trip.interface"
import TripCardForBook from "./TripCardForBook"

const TripCardForBookGrid = (trips:IAvailableTrip[]) => {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip: IAvailableTrip) => (
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
  )
}

export default TripCardForBookGrid
