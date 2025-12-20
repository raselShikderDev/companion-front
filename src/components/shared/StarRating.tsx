/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < Math.round(rating)
              ? "text-yellow-500"
              : "text-muted-foreground"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
