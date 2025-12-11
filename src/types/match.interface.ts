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
