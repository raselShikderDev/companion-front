/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { updateMatchStatus } from "@/services/match/updateMatchStatus.service";
import { MatchStatus } from "@/types/enum.interface";

interface Props {
  matchId: string;
  status: MatchStatus;
}

export default function MatchActionButtons({ matchId, status }: Props) {
  const [loading, setLoading] = useState<null | MatchStatus>(null);

  const handleAction = async (nextStatus: MatchStatus) => {
    setLoading(nextStatus);
    try {
      const res = await updateMatchStatus({ matchId, status: nextStatus });

      if (!res.success) {
        toast.error(res.message || "Failed to update match");
        return;
      }

      toast.success(`Match ${nextStatus.toLowerCase()} successfully`);
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  // If already decided → show disabled state
  if (status !== MatchStatus.PENDING) {
    return (
      <Button size="sm" className="w-full" disabled>
        {status}
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        className="flex-1 bg-green-400"
        disabled={!!loading}
        onClick={() => handleAction(MatchStatus.ACCEPTED)}
      >
        {loading === "ACCEPTED" ? "Accepting..." : "Accept"}
      </Button>

      <Button
        size="sm"
        variant="destructive"
        className="flex-1"
        disabled={!!loading}
        onClick={() => handleAction(MatchStatus.REJECTED)}
      >
        {loading === "REJECTED" ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
}
