import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

const RecentReviews = () => {
  return (
    <div>
       <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Your Reviews
            </CardTitle>
            <CardDescription>Reviews you've shared</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { trip: "Paris Adventure", rating: 5, date: "2 weeks ago" },
              { trip: "Barcelona Beach Trip", rating: 4, date: "1 month ago" },
            ].map((review, i) => (
              <div key={i} className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-foreground">{review.trip}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={`text-lg ${idx < review.rating ? "text-yellow-500" : "text-muted"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/explorer/reviews">
              <Button variant="outline" className="w-full bg-transparent">
                View All Reviews
              </Button>
            </Link>
          </CardContent>
        </Card>
    </div>
  )
}

export default RecentReviews
