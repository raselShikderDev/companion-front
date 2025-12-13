/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Match } from "@/types/match.interface";

export function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      {match.trip.image && (
        <div className="relative aspect-video">
          <Image
            src={match.trip.image}
            alt={match.trip.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{match.trip.title}</h3>
          <Badge
            variant={
              match.status === "ACCEPTED"
                ? "default"
                : match.status === "REJECTED"
                ? "destructive"
                : "secondary"
            }
          >
            {match.status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {match.trip.departureLocation} → {match.trip.destination}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          {new Date(match.trip.startDate).toLocaleDateString()} –{" "}
          {new Date(match.trip.endDate).toLocaleDateString()}
        </div>

        <div className="text-sm text-muted-foreground">
          Matched with{" "}
          <span className="font-medium">
            {match.requester.fullName}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
