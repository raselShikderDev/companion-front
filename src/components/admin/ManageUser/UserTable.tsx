/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/user.interface";
import UserRowActions from "./UserRowActions";
import { formatDateOnly, formatDateTime } from "@/lib/allFormattors";
import { cn } from "@/lib/utils";

export default function UserTable({ users }: { users: IUser[] }) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.filter((user) => user.role !== "SUPER_ADMIN").length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          )}

          {users
            .filter((user) => user.role !== "SUPER_ADMIN")
            .map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/40 transition-colors border"
              >
                {/* Name */}
                <TableCell className="font-medium">
                  {user.explorer?.fullName || user.admin?.fullName}
                </TableCell>

                {/* Email */}
                <TableCell className="font-medium">{user.email}</TableCell>

                {/* Role */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      user.role === "ADMIN" && "border-blue-500 text-blue-600",
                      user.role === "EXPLORER" &&
                        "border-emerald-500 text-emerald-600"
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    className={cn(
                      user.status === "ACTIVE" &&
                        "bg-emerald-100 text-emerald-700",
                      user.status === "BLOCKED" && "bg-red-100 text-red-700",
                      user.status === "SUSPENDED" &&
                        "bg-amber-100 text-amber-700"
                    )}
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                {/* Plan */}
                <TableCell>
                  {user.explorer?.isPremium ? (
                    <Badge className="bg-primary/10 text-primary">
                      PREMIUM
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">FREE</span>
                  )}
                </TableCell>

                {/* Created */}
                <TableCell className="text-muted-foreground">
                  {formatDateOnly(formatDateTime(user.createdAt as Date))}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <UserRowActions user={user} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
// ${user.role === Role.SUPER_ADMIN || user.email === "super@mail.com" ? "hidden" : "block"}
