/** biome-ignore-all assist/source/organizeImports: <> */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CreateTripForm from "@/components/explorer/trips/CreateTripForm"

export default function CreateTripPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create a New Trip</h1>
        <p className="text-muted-foreground">Plan your adventure and find compatible travelers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
          <CardDescription>Fill in the information about your planned trip</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateTripForm/>
        </CardContent>
      </Card>
    </div>
  )
}
