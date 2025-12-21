/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IReview } from "@/types/review.interface";
import { getMyReviews } from "@/services/review/myReview.service";
import {
  formatDateTime,
  getInitials,
  queryStringFormatter,
} from "@/lib/allFormattors";
import Link from "next/link";
import RatingStars from "@/components/shared/StarRating";

export default async function Reviews({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getMyReviews(queryString);
  console.log({ res });

  let reviews: any | [];
  if (res.success) {
    reviews = res.data;
  } else {
    reviews = [];
  }

  // const reviews = [
  //   {
  //     id: 1,
  //     author: "John Smith",
  //     trip: "European Summer Adventure",
  //     rating: 5,
  //     date: "Jan 15, 2024",
  //     text: "Amazing trip! Had the best time exploring Europe with wonderful travel companions. Everything was perfectly organized.",
  //     avatar: "JS",
  //     helpful: 24,
  //   },
  //   {
  //     id: 2,
  //     author: "Sarah Johnson",
  //     trip: "Asian Adventure",
  //     rating: 4,
  //     date: "Jan 10, 2024",
  //     text: "Great experience overall. The itinerary was well-planned and the group was really fun. Would definitely go again!",
  //     avatar: "SJ",
  //     helpful: 18,
  //   },
  //   {
  //     id: 3,
  //     author: "Mike Davis",
  //     trip: "Caribbean Island Hopping",
  //     rating: 5,
  //     date: "Jan 5, 2024",
  //     text: "Perfect vacation! The beaches were stunning and the matched travelers were awesome to hang out with.",
  //     avatar: "MD",
  //     helpful: 32,
  //   },
  // ]

  console.log("Reviews fetched:", reviews);
  const validReviews =
    reviews?.filter((review: any) => typeof review.rating === "number") ?? [];

  const averageRating =
    validReviews.length > 0
      ? (
          validReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          validReviews.length
        ).toFixed(1)
      : null;
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Trip Reviews</h1>
        <p className="text-muted-foreground">
          Read and share real-time reviews from fellow travelers
        </p>
      </div>

      <div className="space-y-4">
        {reviews?.map((review: IReview) => (
          <Link key={review.id} href={`/dashboard/matches/${review.matchId}`}>
            <Card key={review.id}>
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
                            <RatingStars rating={Number(averageRating)} />
                            <span className="text-xs text-muted-foreground">
                              ({averageRating}/5 · {validReviews.length}{" "}
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
                      <Link href={`/dashboard/matches/${review.matchId}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                        >
                          View Match
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
