/** biome-ignore-all assist/source/organizeImports: > */
import { ChevronRight } from "lucide-react"
import TripCard from "../ui/shared/tripCard"
import { Button } from "../ui/button"

const TripsSection = () => {
  return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Explore Destinations
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
              Curated Trips for Every Traveler
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Handpicked experiences designed by travel experts, matching your
              style and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TripCard
              image="/tropical-beach-island-getaway.png"
              destination="Bali, Indonesia"
              title="Tropical Paradise Escape"
              duration="7 days"
              price="$1,299"
              rating={4.8}
              travelers={24}
              tags={["Beach", "Adventure", "Culture"]}
            />

            <TripCard
              image="/alpine-mountain-hiking-adventure.png"
              destination="Swiss Alps"
              title="Alpine Mountain Expedition"
              duration="5 days"
              price="$1,599"
              rating={4.9}
              travelers={18}
              tags={["Hiking", "Nature", "Photography"]}
            />

            <TripCard
              image="/ancient-temple-historic-city-tour.png"
              destination="Kyoto, Japan"
              title="Ancient Temple Discovery"
              duration="6 days"
              price="$1,199"
              rating={4.7}
              travelers={32}
              tags={["Culture", "History", "Food"]}
            />

            <TripCard
              image="/safari-wildlife-savanna-africa.png"
              destination="Serengeti, Tanzania"
              title="Wildlife Safari Adventure"
              duration="8 days"
              price="$2,099"
              rating={4.9}
              travelers={12}
              tags={["Safari", "Wildlife", "Photography"]}
            />

            <TripCard
              image="/colorful-street-art-urban-exploration.png"
              destination="Buenos Aires, Argentina"
              title="Urban Culture Immersion"
              duration="4 days"
              price="$899"
              rating={4.6}
              travelers={28}
              tags={["Culture", "Food", "Nightlife"]}
            />

            <TripCard
              image="/northern-lights-iceland-aurora.png"
              destination="Iceland"
              title="Northern Lights Quest"
              duration="5 days"
              price="$1,799"
              rating={5.0}
              travelers={16}
              tags={["Adventure", "Nature", "Photography"]}
            />
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              View All Trips <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
  )
}

export default TripsSection
