// components/admin/subscriptions/SubscriptionTable.tsx
import SubscriptionStatusBadge from "@/components/shared/SubscriptionStatusBadge";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/allFormattors";

export default function SubscriptionTable({ subscriptions }: { subscriptions: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {subscriptions.map((sub) => (
          <TableRow key={sub.id}>
            <TableCell>{sub.explorer.fullName}</TableCell>
            <TableCell>{sub.planName}</TableCell>
            <TableCell>
              <SubscriptionStatusBadge active={sub.isActive} />
            </TableCell>
            <TableCell>{formatDateTime(sub.startDate)}</TableCell>
            <TableCell>{formatDateTime(sub.endDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
