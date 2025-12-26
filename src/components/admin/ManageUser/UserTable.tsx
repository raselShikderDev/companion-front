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
import { Role } from "@/types/enum.interface";

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
          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          )}

          {users.map((user) => (
            
            <TableRow
              key={user.id}
              className={`hover:bg-muted/40 transition-colors`}

            >
              {/* Name */}
              <TableCell className="font-medium">
                {user.explorer?.fullName || user.admin?.fullName}
              </TableCell>
              {/* EMAIL */}
              <TableCell className="font-medium">
                {user.email}
              </TableCell>

              {/* ROLE */}
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

              {/* STATUS */}
              <TableCell>
                <Badge
                  className={cn(
                    user.status === "ACTIVE" &&
                      "bg-emerald-100 text-emerald-700",
                    user.status === "BLOCKED" &&
                      "bg-red-100 text-red-700",
                    user.status === "SUSPENDED" &&
                      "bg-amber-100 text-amber-700"
                  )}
                >
                  {user.status}
                </Badge>
              </TableCell>

              {/* PLAN */}
              <TableCell>
                {user.explorer?.isPremium ? (
                  <Badge className="bg-primary/10 text-primary">
                    PREMIUM
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    FREE
                  </span>
                )}
              </TableCell>

              {/* CREATED */}
              <TableCell className="text-muted-foreground">
                {formatDateOnly(formatDateTime(user.createdAt as Date))}
              </TableCell>

              {/* ACTIONS */}
              <TableCell className={` text-right`}>
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


// import { IUser } from "@/types/user.interface";
// import UserRowActions from "./UserRowActions";
// import { formatDateTime } from "@/lib/allFormattors";

// export default function UserTable({ users }: { users: IUser[] }) {
//  console.log(users);
 
//     return (
//     <div className="overflow-x-auto border rounded-lg">
//       <table className="w-full text-sm">
//         <thead className="bg-muted">
//           <tr>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3">Role</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Plan</th>
//             <th className="p-3">Created</th>
//             <th className="p-3 text-right">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="border-t">
//               <td className="p-3">{user.email}</td>
//               <td className="p-3">{user.role}</td>
//               <td className="p-3">{user?.explorer?.isPremium ? ``:""}</td>
//               <td className="p-3">{user.status}</td>
//               <td className="p-3">
//                 {formatDateTime(user.createdAt as Date)}
//               </td>
//               <td className="p-3 text-right">
//                 <UserRowActions user={user} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


