import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

const UpcomingTrips = () => {
  return (
    <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Your Upcoming Trips
            </CardTitle>
            <CardDescription>You have 2 upcoming trips scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "European Summer Adventure",
                dates: "Jun 1 - Jun 15, 2024",
                explorers: 4,
                status: "Confirmed",
              },
              {
                name: "Southeast Asia Explorer",
                dates: "Aug 20 - Sep 5, 2024",
                explorers: 3,
                status: "Planning",
              },
            ].map((trip, i) => (
              <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{trip.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {trip.dates}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {trip.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" /> {trip.explorers} explorers confirmed
                </p>
              </div>
            ))}
            <Link href="/explorer/create-trip">
              <Button variant="outline" className="w-full bg-transparent">
                Plan New Trip
              </Button>
            </Link>
          </CardContent>
        </Card>
  )
}

export default UpcomingTrips
