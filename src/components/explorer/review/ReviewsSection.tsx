/** @format */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReviewsByMatchId } from "@/services/review/getReviewByMatchId";
import { IReview } from "@/types/review.interface";
import { Star } from "lucide-react";
import Image from "next/image";

export default async function ReviewsSection({
  matchId,
  reviews,
}: {
  matchId: string;
  reviews: IReview[];
}) {
  const response = await getReviewsByMatchId(matchId);
  console.log(response);
  console.log(reviews);

  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: IReview) => (
        <Card key={review.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
              {review?.reviewer?.profilePicture && (
                <Image
                  src={review?.reviewer?.profilePicture}
                  alt={review?.reviewer?.fullName}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div>
              <CardTitle className="text-sm">
                {review.reviewer?.fullName}
              </CardTitle>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: review?.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </CardHeader>

          {review.comment && (
            <CardContent className="text-sm text-muted-foreground">
              {review.comment}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
