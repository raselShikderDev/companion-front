/** biome-ignore-all lint/style/useImportType: > */
import { MatchStatus } from "./enum.interface";
import { IExplorer } from "./explorer.interface";
import { IReview } from "./review.interface";
import { ITrip } from "./trip.interface";

export interface IMatch {
  id: string;
  requesterId: string;
  recipientId: string;
  tripId: string;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;

  requester?: IExplorer;
  recipient?: IExplorer;
  trip?: ITrip;

  reviews?: IReview[];
}


// src/types/match.interface.ts
export interface Match {
  id: string;
  requesterId: string;
  recipientId: string;
  tripId: string;
  status: MatchStatus;
  createdAt: string;

  requester: {
    id: string;
    fullName: string;
    profilePicture: string | null;
  };

  recipient: {
    id: string;
    fullName: string;
    profilePicture: string | null;
  };

  trip: {
    id: string;
    title: string;
    image: string | null;
    destination: string;
    departureLocation: string;
    startDate: string;
    endDate: string;
    duration: string;
    budget: string;
    journeyType: string[];
    Languages: string[];
    status: string;
  };
}
