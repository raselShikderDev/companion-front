/** biome-ignore-all assist/source/organizeImports: > */

import { Users, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface TripCardProps {
  image: string;
  destination: string;
  title: string;
  duration: string;
  price: string;
  rating: number;
  travelers: number;
  tags: string[];
}

export default function PublicTripCard({
  image,
  destination,
  title,
  duration,
  price,
  rating,
  travelers,
  tags,
}: TripCardProps) {

  return (
    <div className="rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 group cursor-pointer">
      <div className="relative h-48 overflow-hidden bg-card">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-5 bg-background">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-accent font-semibold">{destination}</p>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{duration}</p>

        <div className="flex gap-2 flex-wrap mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-border pt-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>{travelers} going</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-accent">{price}</p>
          <Button className="px-4 py-2 rounded bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-semibold transition-colors">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
