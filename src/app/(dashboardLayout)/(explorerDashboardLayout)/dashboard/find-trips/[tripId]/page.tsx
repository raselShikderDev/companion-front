/** biome-ignore-all assist/source/organizeImports: > */

import Image from "next/image";
import Link from "next/link";
import { getTripById } from "@/services/trips/getTripById.service";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookMatchButton from "@/components/explorer/match/BookMatchButton";
import EmptyTripCard from "@/components/shared/EmptyTripCard";

interface TripDetailsPageProps {
  params: Promise<{
    tripId: string;
  }>;
}

export default async function BookTripDetailsPage({ params }: TripDetailsPageProps) {
  console.log("Received Params => ", params);

  const tripId = await params;

  if (!tripId) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">
          Invalid Trip ID (Missing in URL)
        </h2>

        <Link href="/dashboard/my-trips" className="text-blue-500 underline">
          Go Back
        </Link>
      </div>
    );
  }

  const response = await getTripById(tripId.tripId);

  if (!response?.success) {
    return (
      <EmptyTripCard/>
    );
  }

  const trip = response.data;
console.log({trip});

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="space-y-8">

        {/* COVER IMAGE */}
        {trip.image && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold">{trip.title}</h1>
          <Badge variant="secondary">{trip.status}</Badge>
        </div>

        {/* ROUTE */}
        <div className="flex items-center gap-3 text-muted-foreground text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          {trip.departureLocation} → {trip.destination}
        </div>

        {/* DESCRIPTION */}
        <p className="text-muted-foreground text-base leading-relaxed">
          {trip.description}
        </p>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span>
              {new Date(trip.startDate).toLocaleDateString()} →{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <span>{trip.duration}</span>
          </div>

          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-primary" />
            <span>${trip.budget}</span>
          </div>
        </div>

        {/* JOURNEY TYPE */}
        <div>
          <h3 className="font-medium text-lg mb-2">Journey Type</h3>
          <div className="flex flex-wrap gap-2">
            {trip.journeyType.map((type: string) => (
              <Badge key={type} variant="outline">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* LANGUAGES */}
        <div>
          <h3 className="font-medium text-lg mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {trip.Languages.map((l: string) => (
              <Badge key={l} variant="secondary">
                {l}
              </Badge>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4 pt-6">

          {/* MATCH / BOOK BUTTON */}
          <div className="w-full">
            <BookMatchButton tripId={trip.id} />
          </div>

         

          {/* BACK BUTTON */}
          <Link href="/dashboard/my-trips" className="w-full">
            <Button variant="outline" className="w-full">
              Back to My Trips
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
