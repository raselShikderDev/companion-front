import { SubscriptionPlan } from "./enum.interface";
import { IExplorer } from "./explorer.interface";
import { IPayment } from "./payment.interface";

export interface ISubscription {
  id: string;
  explorerId: string;
  planName: SubscriptionPlan;
  paymentId?: string | null;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  explorer?: IExplorer;
  payment?: IPayment | null;
}
