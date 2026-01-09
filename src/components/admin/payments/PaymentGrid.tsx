// components/admin/payments/PaymentGrid.tsx
import PaymentStatusBadge from "@/components/shared/PaymentStatusBadge";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentGrid({ payments }: { payments: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {payments.map((p) => (
        <Card key={p.id}>
          <CardContent className="pt-6 space-y-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">{p.explorer.fullName}</h3>
              <PaymentStatusBadge status={p.status} />
            </div>

            <p className="text-sm">
              {p.amount} {p.currency}
            </p>
            <p className="text-xs text-muted-foreground">
              {p.planName} • {p.gateway}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
