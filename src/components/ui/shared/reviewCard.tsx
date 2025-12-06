/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  author: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  avatar: string;
}

export default function ReviewCard({
  author,
  location,
  rating,
  date,
  review,
  avatar,
}: ReviewCardProps) {
  return (
    <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={avatar || "/placeholder.svg"}
          width={50}
          height={50}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating)
                  ? "fill-accent text-accent"
                  : "text-muted/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>

      <p className="text-foreground leading-relaxed">{review}</p>
    </div>
  );
}
