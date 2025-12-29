import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IReview } from "@/types/review.interface";
import {
  formatDateTime,
  getInitials
} from "@/lib/allFormattors";
import Link from "next/link";
import RatingStars from "@/components/shared/StarRating";
import getAvarageRating from "@/lib/getAvarageRating";

const ExplorerRevewsTable = ({ reviews }: { reviews: any }) => {
  const rating = getAvarageRating(reviews)
  return (
    <div className="space-y-4">
      {reviews?.map((review: IReview) => (
        <Link className="" key={review.id} href={`/dashboard/matches/${review.matchId}`}>
          <Card className="mb-5" key={review.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review?.reviewer?.profilePicture || ""}
                    alt={review?.reviewer?.fullName}
                  />
                  <AvatarFallback className="text-sm">
                    {getInitials(review?.reviewer?.fullName as string)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">
                        {review.match?.trip?.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {review.match?.trip?.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 justify-end mb-1">
                        <div className="flex flex-col items-center gap-2">
                          <RatingStars rating={Number(rating.averageRating)} />
                          <span className="text-xs text-muted-foreground">
                            ({rating.averageRating}/5 · {rating.validReviews.length}{" "}
                            reviews)
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-3">{review.comment}</p>
                  <div className="flex items-center gap-4 mt-4">
                    {/* <Link href={`/dashboard/matches/${review.matchId}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                        >
                          View Match
                        </Button>
                      </Link> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default ExplorerRevewsTable
