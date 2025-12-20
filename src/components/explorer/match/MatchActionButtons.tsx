/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { updateMatchStatus } from "@/services/match/updateMatchStatus.service";
import { MatchStatus } from "@/types/enum.interface";
import Link from "next/link";
import { Eye } from "lucide-react";
import CreateReviewForm from "../review/CreateReviewForm";

interface Props {
  matchId: string;
  status: MatchStatus;
  canGiveReview: boolean;
}
export default function MatchActionButtons({
  matchId,
  status,
  canGiveReview,
}: Props) {
  const [loading, setLoading] = useState<null | MatchStatus>(null);
  console.log({ canGiveReview });

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
      <div className="space-y-3.5">
        <div className={`${status === MatchStatus.COMPLETED ? "mb-3.5" : ""}`}>
          <Link href={`/dashboard/matches/${matchId}`}>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 cursor-pointer"
            >
              <Eye className="h-4 w-4" /> View
            </Button>
          </Link>
        </div>
        {status === MatchStatus.COMPLETED && canGiveReview && (
          <CreateReviewForm matchId={matchId} />
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-2 space-y-3">
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

// /** biome-ignore-all assist/source/organizeImports: > */
// /** biome-ignore-all lint/suspicious/noExplicitAny: > */
// /** biome-ignore-all lint/style/useImportType: > */
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { updateMatchStatus } from "@/services/match/updateMatchStatus.service";
// import { MatchStatus } from "@/types/enum.interface";
// import Link from "next/link";
// import { Eye } from "lucide-react";
// import CreateReviewForm from "../review/CreateReviewForm";

// interface Props {
//   matchId: string;
//   status: MatchStatus;
//   canGiveReview: boolean;
// }

// export default function MatchActionButtons({
//   matchId,
//   status,
//   canGiveReview,
// }: Props) {
//   const [loading, setLoading] = useState<null | MatchStatus>(null);

//   const handleAction = async (nextStatus: MatchStatus) => {
//     setLoading(nextStatus);
//     try {
//       const res = await updateMatchStatus({ matchId, status: nextStatus });

//       if (!res.success) {
//         toast.error(res.message || "Failed to update match");
//         return;
//       }

//       toast.success(`Match ${nextStatus.toLowerCase()} successfully`);
//     } catch (err: any) {
//       toast.error(err?.message || "Something went wrong");
//     } finally {
//       setLoading(null);
//     }
//   };

//   /* ---------------- Non-pending ---------------- */
//   if (status !== MatchStatus.PENDING) {
//     return (
//       <div className="space-y-3.5">
//         <Link href={`/dashboard/matches/${matchId}`}>
//           <Button
//             size="sm"
//             variant="outline"
//             className="w-full gap-2"
//           >
//             <Eye className="h-4 w-4" />
//             View
//           </Button>
//         </Link>

//         {/* Review Form (STRICTLY CONTROLLED) */}
//         {canGiveReview && (
//           <CreateReviewForm matchId={matchId} />
//         )}
//       </div>
//     );
//   }

//   /* ---------------- Pending ---------------- */
//   return (
//     <div className="flex gap-2">
//       <Button
//         size="sm"
//         className="flex-1 bg-green-400"
//         disabled={!!loading}
//         onClick={() => handleAction(MatchStatus.ACCEPTED)}
//       >
//         {loading === MatchStatus.ACCEPTED ? "Accepting..." : "Accept"}
//       </Button>

//       <Button
//         size="sm"
//         variant="destructive"
//         className="flex-1"
//         disabled={!!loading}
//         onClick={() => handleAction(MatchStatus.REJECTED)}
//       >
//         {loading === MatchStatus.REJECTED ? "Rejecting..." : "Reject"}
//       </Button>
//     </div>
//   );
// }
