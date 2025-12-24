/** biome-ignore-all lint/suspicious/noExplicitAny: > */

export default async function getAverageRating(match: any) {
  const validReviews =
    match.reviews?.filter((review: any) => typeof review.rating === "number") ??
    [];

  const averageRating =
    validReviews.length > 0
      ? (
          validReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          validReviews.length
        ).toFixed(1)
      : null;
  return {averageRating, validReviews};
}
