"use client";

import { IUser } from "@/types/user.interface";
import { UserStatus } from "@/types/enum.interface";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserStatus } from "@/services/admin/users/updateUserStatus.service";
import { deleteUser } from "@/services/admin/users/deleteUser.service";

export default function UserRowActions({ user }: { user: IUser }) {
  const changeStatus = async (status: UserStatus) => {
    const res = await updateUserStatus(user.id, status);
    if (res.success) toast.success("Status updated");
    else toast.error(res.message);
  };

  const removeUser = async () => {
    if (!confirm("Are you sure?")) return;
    const res = await deleteUser(user.id);
    if (res.success) toast.success("User deleted");
    else toast.error(res.message);
  };

  return (
    <div className="flex gap-2 justify-end">
      <select
        defaultValue={user.status}
        onChange={(e) =>
          changeStatus(e.target.value as UserStatus)
        }
        className="border rounded px-2 py-1"
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="BLOCKED">BLOCKED</option>
        <option value="SUSPENDED">SUSPENDED</option>
      </select>

      <Button
        variant="destructive"
        size="sm"
        onClick={removeUser}
      >
        Delete
      </Button>
    </div>
  );
}
