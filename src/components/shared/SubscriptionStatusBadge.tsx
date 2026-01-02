// components/admin/subscriptions/SubscriptionStatusBadge.tsx
import { Badge } from "@/components/ui/badge";

export default function SubscriptionStatusBadge({ active }: { active: boolean }) {
  return (
    <Badge variant={active ? "default" : "destructive"}>
      {active ? "Active" : "Expired"}
    </Badge>
  );
}
