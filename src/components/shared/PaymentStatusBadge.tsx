// components/admin/payments/PaymentStatusBadge.tsx
import { Badge } from "@/components/ui/badge";

export default function PaymentStatusBadge({ status }: { status: string }) {
  const map: any = {
    SUCCESS: "default",
    FAILED: "destructive",
    PENDING: "secondary",
  };

  return <Badge variant={map[status] || "outline"}>{status}</Badge>;
}
