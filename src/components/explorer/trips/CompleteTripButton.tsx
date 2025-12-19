/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { completeTrip } from "@/services/trips/completeTrip.service";

export default function CompleteTripButton({ tripId }: { tripId: string }) {
  const [state, formAction, isPending] = useActionState(completeTrip, null);

  // Handle toast notifications only when state changes
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
        disabled={isPending}
        className="
          w-full 
          py-5 
          text-base 
          font-semibold 
          bg-primary 
          text-primary-foreground 
          hover:bg-primary/90 
          flex items-center justify-center gap-2
        "
      >
        {isPending && <Loader2 className="h-5 w-5 animate-spin" />}
        {isPending ? "Completing..." : "Completed"}
      </Button>
    </form>
  );
}



// /** biome-ignore-all assist/source/organizeImports: > */
// "use client";

// import { useActionState } from "react";
// import { createMatch } from "@/services/match/createMatch.service";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { toast } from "react-toastify";

// export default function BookMatchButton({ tripId }: { tripId: string }) {
//   const [state, formAction, isPending] = useActionState(createMatch, null);

//   // Handle toast notifications
//   if (state?.success) toast.success(state.message);
//   if (state && !state.success && state.message) toast.error(state.message);

//   return (
//     <form action={formAction}>
//       <input type="hidden" name="tripId" value={tripId} />

//       <Button
//         type="submit"
//         disabled={isPending}
//         className="px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
//       >
//         {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
//         {isPending ? "Matching..." : "Match Now"}
//       </Button>
//     </form>
//   );
// }
