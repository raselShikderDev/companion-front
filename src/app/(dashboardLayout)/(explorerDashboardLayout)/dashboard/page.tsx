/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */

import DashboardStats from "@/components/homePage/dashboard/DashboardStats";
import DashboardQuickLinks from "@/components/homePage/dashboard/DashboardQuickLinks";
import { getMyMatches } from "@/services/match/myMatches.service";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import RecentMatchs from "@/components/homePage/dashboard/RecentMatchs";
import { MatchStatus, TripStatus } from "@/types/enum.interface";
import { queryStringFormatter } from "@/lib/allFormattors";
import { getUserInfo } from "@/services/auth/getUserInfo";

export interface IMyMatches {
  id: string;
  requesterId: string;
  recipientId: string;
  tripId: string;
  status: MatchStatus;
  createdAt: string;
  updatedAt: string;
  reviews: any[];
  trip: {
    id: string;
    title: string;
    destination: string;
    image: string;
    status: TripStatus;
  };
  requester: { id: string; fullName: string; profilePicture: string };
  recipient: { id: string; fullName: string; profilePicture: string };
}

export default async function ExplorerDashboard() {

  const queryString = queryStringFormatter({});
  const res = await getMyMatches(queryString);
  const { explorer } = await getUserInfo();
  let matches: any ;
  if (res.success) {
    matches = res.data;
  } else {
    matches = [];
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome Back, {explorer?.fullName || "Traveler"}! 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          New matches and upcoming trips are waiting for you{" "}
        </p>
      </div>

      <div>
        <DashboardStats />
      </div>
      <DashboardQuickLinks />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* <UpcomingTrips/> */}
        {matches.length === 0 ? (
          <EmptyTripCard />
        ) : (
          <RecentMatchs currentExplorerId={explorer?.id || ""} matches={matches} />
        )}
      </div>

      {/* <div className="grid md:grid-cols-2 gap-6">
     
        <SpendingSummery/>

      
       <RecentReviews/>
      </div> */}
    </div>
  );
}
