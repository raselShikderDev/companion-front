/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/allFormattors";
import { Star } from "lucide-react";

export default function ReviewsSection({ match }: { match: any }) {
  const { reviews, requester, recipient } = match;

  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: any) => {
        const reviewer =
          review.reviewerId === requester.id
            ? requester
            : review.reviewerId === recipient.id
            ? recipient
            : null;

        if (!reviewer) return null;

        return (
          <Card key={review.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={reviewer.profilePicture || ""}
                  alt={reviewer.fullName}
                />
                <AvatarFallback className="text-sm">
                  {getInitials(reviewer.fullName)}
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="text-sm">
                  {reviewer.fullName}
                </CardTitle>

                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
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
        );
      })}
    </div>
  );
}
