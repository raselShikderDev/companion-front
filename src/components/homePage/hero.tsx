/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import Image from "next/image"
import travelersExploringCityAdventureTogether from "../../../public/travelers-exploring-city-adventure-together.png"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-card/50 to-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              ✨ Travel Differently
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-balance mb-6 leading-tight">
            Connect with Travel Companions Around the World
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8">
            Discover curated trips, match with like-minded travelers, read authentic reviews, and book securely. Your
            next unforgettable adventure starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Explore Trips
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 gap-2 bg-transparent"
            >
              <PlayCircle className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold">5K+</p>
              <p className="text-muted-foreground text-sm">Active Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">250+</p>
              <p className="text-muted-foreground text-sm">Destinations</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.8★</p>
              <p className="text-muted-foreground text-sm">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="relative h-96 lg:h-full min-h-96">
          <Image
            src={travelersExploringCityAdventureTogether}
            alt="Travelers exploring together"
            className="rounded-lg object-cover w-full h-full shadow-2xl shadow-accent/20"
          />
          <div className="absolute inset-0 rounded-lg bg-linear-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
