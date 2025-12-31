/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
"use client";

import { useState } from "react";
import { IUser } from "@/types/user.interface";
import { UserStatus } from "@/types/enum.interface";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";

import { updateUserStatus } from "@/services/admin/users/updateUserStatus.service";
import { deleteUser } from "@/services/admin/users/deleteUser.service";
import { toast } from "react-toastify";

export default function UserRowActions({ user }: { user: IUser }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleStatusChange = async (status: UserStatus) => {
    if (status === user.status) return;

    setIsUpdating(true);
    const res = await updateUserStatus(user.id, status);
    setIsUpdating(false);
    if (!res.success) {
      toast.error(res.message);
    }
    toast.success(res.message);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteUser(user.id);
    setIsDeleting(false);
    setOpenDelete(false);

    if (!res.success) {
      toast.error(res.message);
    }
    toast.success(res.message || "User deleted successfully");
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Status Select */}
      <Select
        defaultValue={user.status}
        disabled={isUpdating || isDeleting}
        onValueChange={(value) => handleStatusChange(value as UserStatus)}
      >
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="cursor-pointer" value={UserStatus.ACTIVE}>
            Active
          </SelectItem>
          <SelectItem className="cursor-pointer" value={UserStatus.BLOCKED}>
            Blocked
          </SelectItem>
          <SelectItem className="cursor-pointer" value={UserStatus.SUSPENDED}>
            Suspended
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            disabled={isUpdating || isDeleting}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setOpenDelete(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
