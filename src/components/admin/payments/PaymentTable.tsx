// components/admin/payments/PaymentTable.tsx
import PaymentStatusBadge from "@/components/shared/PaymentStatusBadge";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/allFormattors";

export default function PaymentTable({ payments }: { payments: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {payments.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.explorer.fullName}</TableCell>
            <TableCell>{p.planName}</TableCell>
            <TableCell>
              {p.amount} {p.currency}
            </TableCell>
            <TableCell>
              <PaymentStatusBadge status={p.status} />
            </TableCell>
            <TableCell>{formatDateTime(p.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
