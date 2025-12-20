/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Wallet, Clock, Pencil, Eye } from "lucide-react";
import Link from "next/link";
import CompleteTripButton from "./CompleteTripButton";
import { formatDateTime } from "@/lib/allFormattors";

export default function ExplorerTripCard({ trip, onEdit, currentExplorerId }: any) {
 console.log({currentExplorerId});
 console.log({creatorId:trip?.creatorId});

 const isCreator = currentExplorerId === trip?.creatorId
 console.log({isCreator});
 
  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      {trip.image && (
        <div className="relative aspect-video w-full">
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex justify-between">
          {trip.title}
          <Badge variant="secondary">{trip.status}</Badge>
        </CardTitle>

        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {trip.departureLocation} → {trip.destination}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">{trip.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary" />
            {formatDateTime(trip.startDate)}
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {trip.duration} Days
          </div>

          <div className="flex items-center gap-1">
            <Wallet className="h-4 w-4 text-primary" />${trip.budget}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {trip.journeyType.map((type: string) => (
            <Badge key={type} variant="outline">
              {type}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {trip.Languages.map((lang: string) => (
            <Badge key={lang} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>
        <div>
          {trip.matchCompleted ? (
            <CompleteTripButton status={trip.status} tripId={trip.id} />
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 cursor-pointer"
              onClick={onEdit}
              disabled={trip.matchCompleted}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <div>
          <Link href={`/dashboard/my-trips/${trip.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 cursor-pointer"
            >
              <Eye className="h-4 w-4" /> View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
