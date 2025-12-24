/** biome-ignore-all lint/style/useImportType: > */
import { ReviewStatus } from "./enum.interface";
import { IExplorer } from "./explorer.interface";
import { IMatch } from "./match.interface";

export interface IReview {
  id: string;
  matchId: string;
  reviewerId: string;
  rating: number;
  comment?: string | null;
  status: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;

  match?: IMatch;
  reviewer?: IExplorer;
}
