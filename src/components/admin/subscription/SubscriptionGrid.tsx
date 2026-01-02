// components/admin/subscriptions/SubscriptionGrid.tsx
import SubscriptionStatusBadge from "@/components/shared/SubscriptionStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/allFormattors";
import SubscriptionTable from "./SubscriptionTable";

export default function SubscriptionGrid({ subscriptions }: { subscriptions: any[] }) {
  return (
    <div>
      {subscriptions.map((sub) => (
        <Card key={sub.id}>
          <CardContent className="pt-6 space-y-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">{sub.explorer.fullName}</h3>
              <SubscriptionStatusBadge active={sub.isActive} />
            </div>

            <p className="text-sm text-muted-foreground">
              Plan: {sub.planName}
            </p>

            <p className="text-xs">
              {formatDateTime(sub.startDate)} → {formatDateTime(sub.endDate)}
            </p>
          </CardContent>
        </Card>
      ))}
      {/* <SubscriptionTable subscriptions={subscriptions}/> */}
    </div>
  );
}
