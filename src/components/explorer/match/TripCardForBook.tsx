/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookMatchButton from "./BookMatchButton";
import Link from "next/link";
import { IAvailableTrip } from "@/types/trip.interface";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwtHandler";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/allFormattors";

export default async function TripCardForBook({
  trip,
}: {
  trip: IAvailableTrip;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || "";

  const { payload } = await verifyAccessToken(token);
  console.log("trip.creatorId: ", trip.creatorId);
  // biome-ignore lint/complexity/useOptionalChain: >
  console.log("payload && payload.userId: ", payload && payload.userId);

  return (
    <div className="rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 group cursor-pointer bg-white/90 dark:bg-slate-900/80">
      <div className="relative h-48 overflow-hidden bg-card">
        <Image
          src={trip?.image || "/placeholder.svg"}
          alt={trip?.title}
          width={500}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-5 bg-background">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-accent font-semibold">
              {trip?.destination}
            </p>
            <h3 className="text-lg font-bold text-foreground">{trip?.title}</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {trip.duration} Days
          </div>
        </p>
        <div className="flex items-center gap-1 mb-4">
          <Calendar className="h-4 w-4 text-primary" />
          Starting at {formatDateTime(trip.startDate)}
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {trip?.journeyType.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {trip?.Languages.map((lang) => (
            <Badge key={lang} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>

        {/* <div className="border-t border-border pt-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-semibold">{trip.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>{trip.} going</span>
            </div>
          </div>
        </div> */}

        <div className="flex items-center justify-between gap-2">
          <p className="text-2xl font-bold text-accent">${trip.budget}</p>

          <div className="flex items-center gap-2">
            <div>
              <Link href={`/dashboard/find-trips/${trip.id}`}>
                <Button className="px-4 py-2 rounded bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-semibold">
                  View Details
                </Button>
              </Link>
            </div>

            {/* create Match Button */}
            {payload && trip.creatorId !== payload.userId && (
              <BookMatchButton tripId={trip.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
