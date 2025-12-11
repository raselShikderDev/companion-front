import { IAdmin } from "./admin/admin.interface";
import { Role, UserStatus } from "./enum.interface";
import { IExplorer } from "./explorer.interface";

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
  isDeleted: boolean;
  emailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;

  admin?: IAdmin | null;      
  explorer?: IExplorer | null; 
}
