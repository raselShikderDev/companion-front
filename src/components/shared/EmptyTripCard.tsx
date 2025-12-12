/** biome-ignore-all assist/source/organizeImports: > */
import { MapPin } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"

const EmptyTripCard = () => {
  return (
    <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-2">
              No  trips found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Create a new trip to start finding travel companions
            </p>
            <Button asChild>
              <Link href="/dashboard/create-trip">Create Trip</Link>
            </Button>
          </CardContent>
        </Card>
  )
}

export default EmptyTripCard
