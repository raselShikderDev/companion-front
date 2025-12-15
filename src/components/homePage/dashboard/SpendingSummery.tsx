import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

const SpendingSummery = () => {
  return (
   <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              Trip Spending
            </CardTitle>
            <CardDescription>Total spent on trips this year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">European Summer</span>
                <span className="font-semibold text-foreground">$2,450</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-accent h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Southeast Asia</span>
                <span className="font-semibold text-foreground">$1,820</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "48%" }}></div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Spent</span>
                <span className="text-lg font-bold text-accent">$4,270</span>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default SpendingSummery
