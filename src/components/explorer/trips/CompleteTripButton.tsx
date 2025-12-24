/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { completeTrip } from "@/services/trips/completeTrip.service";
import { TripStatus } from "@/types/enum.interface";

export default function CompleteTripButton({
  tripId,
  status,
}: {
  tripId: string;
  status: TripStatus;
}) {
  const [state, formAction, isPending] = useActionState(completeTrip, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) toast.success(state.message);
    else if (!state.success && state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="tripId" value={tripId} />

      <Button
        type="submit"
        disabled={isPending || status === TripStatus.COMPLETED}
        className={`
          w-full 
          py-5 
          text-base 
          font-semibold 
          bg-primary 
          text-primary-foreground 
          hover:bg-primary/90 
          flex items-center justify-center gap-2
          ${status === TripStatus.COMPLETED ? "bg-primary/90" : ""}   `}
      >
        {isPending && <Loader2 className="h-5 w-5 animate-spin" />}
        {status === TripStatus.COMPLETED ? "Trip " : ""}
        {isPending ? "Completing..." : "Complete"}
        {status === TripStatus.COMPLETED ? "d" : ""}
      </Button>
    </form>
  );
}
