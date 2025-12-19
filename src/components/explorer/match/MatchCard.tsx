/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Match } from "@/types/match.interface";
import { formatDate } from "@/lib/formateDate";
import MatchActionButtons from "./UpdateMatchStatusButton";
import { MatchStatus } from "@/types/enum.interface";

export default function MatchCard({ match }: { match: Match }) {
  console.log({ status: match.status });

  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      {/* IMAGE */}
      {match.trip.image && (
        <div className="relative aspect-video bg-muted">
          <Image
            src={match.trip.image}
            alt={match.trip.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* HEADER */}
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{match.trip.title}</h3>

          <Badge
            className={`${
              match.status === "ACCEPTED"
                ? "bg-primary"
                : match.status === "COMPLETED"
                ? "bg-accent"
                : match.status === "REJECTED"
                ? "bg-red-500"
                : "secondary"
            }`}
            // variant={
            //   match.status === "ACCEPTED"
            //     ? "default"
            //     : match.status === "REJECTED"
            //     ? "destructive"
            //     : match.status === "PENDING"
            //     ? "secondary"
            //     : "outline"
            // }
          >
            {match.status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {match.trip.departureLocation} → {match.trip.destination}
        </p>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-4">
        {/* DATE */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          {formatDate(match.trip.startDate)} – {formatDate(match.trip.endDate)}
        </div>

        {/* USER */}
        <div className="text-sm text-muted-foreground">
          Matched with{" "}
          <span className="font-medium">{match.requester.fullName}</span>
        </div>

        <MatchActionButtons
          matchId={match.id}
          status={match.status as MatchStatus}
        />
      </CardContent>
    </Card>
  );
}
