import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Eye } from "lucide-react"
import { ITrip } from "@/types/trip.interface"
import { TripStatus } from "@/types/enum.interface"
import { formatDateOnly, formatDateTime } from "@/lib/allFormattors"


const TripsTable = ({ trips }: { trips: any }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 font-semibold text-foreground">Trip Title</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Destination</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Creator</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Budget</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Start Date</th>
            <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip: ITrip) => (
            <tr key={trip.id} className="border-b hover:bg-muted/30 transition-colors">
              <td className="py-4 px-4 font-medium">{trip.title}</td>
              <td className="py-4 px-4 text-muted-foreground">{trip.destination}</td>
              <td className="py-4 px-4">{trip.creator?.fullName}</td>
              <td className="py-4 px-4">{trip.budget}</td>
              <td className="py-4 px-4">
                <Badge
                  className={`${trip.status === TripStatus.COMPLETED
                      ? "bg-accent/20 text-accent"
                      : trip.status === TripStatus.CANCELLED
                        ? "bg-red-300 text-destructive"
                        : "bg-green-200 text-green-700"
                    }`}
                >
                  {trip.status}
                </Badge>
              </td>
              <td className="py-4 px-4 text-muted-foreground"> {formatDateOnly(formatDateTime(trip.startDate as Date))}</td>
              <td className="py-4 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="ghost" className="hover:text-accent">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TripsTable
