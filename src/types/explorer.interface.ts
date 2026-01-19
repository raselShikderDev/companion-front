/** biome-ignore-all lint/style/useImportType: > */
import { Gender } from "./enum.interface";
import { IMatch } from "./match.interface";
import { IPayment } from "./payment.interface";
import { IReview } from "./review.interface";
import { ISubscription } from "./subscription";
import { ITrip } from "./trip.interface";
import { IUser } from "./user.interface";

export interface IExplorer {
  id: string;
  userId: string;
  fullName: string;
  gender: Gender;
  age?: string | null;
  profilePicture?: string | null;
  address?: string | null;
  bio?: string | null;
  phone: string;
  travelStyleTags: string[];
  interests: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;

  user?: IUser;
  trips?: ITrip[];
  subscription?: ISubscription | null;

  outgoingMatches?: IMatch[];
  incomingMatches?: IMatch[];

  payments?: IPayment[];
  reviews?: IReview[];
}
