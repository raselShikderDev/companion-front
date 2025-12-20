/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

type RecentMatchesProps = {
  matches: {
    data: any[];
  };
  currentExplorerId: string;
};

const RecentMatches = ({ matches, currentExplorerId }: RecentMatchesProps) => {
  const recentMatches = matches.data.slice(0, 5);

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          Recent Matches
        </CardTitle>
        <CardDescription>Your most recent matches</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {recentMatches.length === 0 && (
          <p className="text-sm text-muted-foreground">No matches yet</p>
        )}

        {recentMatches.map((match) => {
          const otherExplorer =
            match.requester.id === currentExplorerId
              ? match.recipient
              : match.requester;

          return (
            <div
              key={match.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {otherExplorer.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {match.trip?.title} • {match.trip?.destination}
                </p>
              </div>

              <Link href={`/dashboard/matches/${match.id}`}>
                <Button size="sm" variant="outline" className="bg-transparent">
                  View
                </Button>
              </Link>
            </div>
          );
        })}

        <Link href="/explorer/matches">
          <Button variant="outline" className="w-full bg-transparent">
            View All Matches
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecentMatches;
