/** biome-ignore-all lint/style/useImportType: > */
import { IUser } from "../user.interface";

export interface IAdmin {
  id: string;
  userId: string;
  fullName: string;
  profilePicture?: string | null;
  address?: string | null;
  bio?: string | null;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  user?: IUser;
}
