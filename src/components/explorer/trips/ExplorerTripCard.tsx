/** biome-ignore-all assist/source/organizeImports: <explanation> */


import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Calendar, MapPin, Wallet, Clock, Pencil, Trash2 } from "lucide-react";


interface Trip {
  id: string;
  title: string;
  image: string | null;
  destination: string;
  departureLocation: string;
  startDate: string;
  endDate: string;
  description: string;
  budget: string;
  journeyType: string[];
  matchCompleted: boolean;
  duration: string;
  Languages: string[];
  status: string;
}

interface TripCardProps {
  trip: Trip;
  onEdit: () => void;
  onDelete: () => void;
}

export function TExplorerTripCard({ trip, onEdit, onDelete }: TripCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {trip.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={trip.image || "/placeholder.svg"}
            alt={trip.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl text-balance">{trip.title}</CardTitle>

          <Badge variant="secondary" className="shrink-0">
            {trip.status}
          </Badge>
        </div>

        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {trip.departureLocation} → {trip.destination}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {trip.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {new Date(trip.startDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{trip.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">${trip.budget}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {trip.journeyType.map((type: string) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {trip.Languages.map((lang: string) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 bg-transparent"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex-1 gap-2"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
