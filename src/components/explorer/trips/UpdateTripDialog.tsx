"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdateTripForm from "./TripUpdateForm";


export default function UpdateTripDialog({
  open,
  onClose,
  trip
}: {
  open: boolean;
  onClose: () => void;
  trip: any;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Trip: {trip?.title}</DialogTitle>
        </DialogHeader>

        {trip && <UpdateTripForm trip={trip} onSuccess={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
