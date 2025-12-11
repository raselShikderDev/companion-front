import { TripStatus } from "./enum.interface";
import { IExplorer } from "./explorer.interface";
import { IMatch } from "./match.interface";

export interface ITrip {
  id: string;
  title: string;
  image?: string | null;
  creatorId: string;
  destination: string;
  departureLocation: string;
  startDate: Date;
  endDate: Date;
  description?: string | null;
  budget: string;
  journeyType: string[];
  matchCompleted: boolean;
  duration: string;
  Languages: string[];
  status: TripStatus;
  createdAt: Date;
  updatedAt: Date;

  creator?: IExplorer;
  matches?: IMatch[];
}
