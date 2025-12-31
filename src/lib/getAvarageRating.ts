
const getAvarageRating = (reviews: any) => {
    const validReviews =
        reviews?.filter((review: any) => typeof review.rating === "number") ?? [];

    const averageRating =
        validReviews.length > 0
            ? (
                validReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
                validReviews.length
            ).toFixed(1)
            : null
    return {averageRating, validReviews}
}

export default getAvarageRating
