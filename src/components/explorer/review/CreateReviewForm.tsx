/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { createReview } from "@/services/review/createReview.service";

export default function CreateReviewForm({ matchId }: { matchId: string }) {
  const [state, formAction, isPending] = useActionState(createReview, null);
  console.log({ matchId });

  if (state?.success) {
    toast.success(state.message);
  }

  if (state && !state.success) {
    toast.error(state.message);
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="matchId" value={matchId} />

      <select name="rating" required className="w-full border rounded-md p-2">
        <option value="">Rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <Textarea name="comment" placeholder="Write your review (optional)" />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
