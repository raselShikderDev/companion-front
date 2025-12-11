import { PaymentStatus, SubscriptionPlan } from "./enum.interface";
import { IExplorer } from "./explorer.interface";
import { ISubscription } from "./subscription";

export interface IPayment {
  id: string;
  explorerId: string;
  planName: SubscriptionPlan;
  amount: number;
  currency: string;
  gateway: string;
  transactionId?: string | null;
  status: PaymentStatus;
  rawResponse?: any | null;
  createdAt: Date;
  updatedAt: Date;

  explorer?: IExplorer;
  subscription?: ISubscription | null;
}
