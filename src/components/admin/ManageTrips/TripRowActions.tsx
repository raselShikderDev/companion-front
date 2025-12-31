/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
"use client";

import { useState } from "react";
import { TripStatus, UserStatus } from "@/types/enum.interface";

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
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { ITrip } from "@/types/trip.interface";
import { updateTripStatus } from "@/services/trips/updateTrip.service";
import { deleteTrip } from "@/services/trips/deleteTrip.service";

export default function TripRowActions({ trip }: { trip: ITrip }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleStatusChange = async (status: TripStatus) => {
    if (status === trip.status) return;

    setIsUpdating(true);
    const res = await updateTripStatus(trip.id, status);
    setIsUpdating(false);
    if (!res.success) {
      toast.error(res.message);
    }
    toast.success(res.message);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteTrip(trip.id);
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
        defaultValue={trip.status}
        disabled={isUpdating || isDeleting}
        onValueChange={(value) => handleStatusChange(value as TripStatus)}
      >
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {
            ...Object.values(TripStatus).map((status) => {
              return <SelectItem key={status} className="cursor-pointer" value={status}>
                {status}
              </SelectItem>
            })
          }
        </SelectContent>
      </Select>

      {/* Actions Menu */}
      
          <div className="ml-2">
            <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive focus:text-destructive"
            disabled={isUpdating || isDeleting}
            onClick={() => setOpenDelete(true)}
          >
          <Trash2 className=" h-4 w-4" />
           
          </Button>
          </div>
       

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
