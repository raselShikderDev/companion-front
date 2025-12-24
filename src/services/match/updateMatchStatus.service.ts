/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { MatchStatus } from "@/types/enum.interface";
import { revalidatePath } from "next/cache";

export async function updateMatchStatus({
  matchId,
  status,
}: {
  matchId: string;
  status: MatchStatus;
}) {
  const res = await serverFetch.patch(`/match/update-status/${matchId}`, {
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("dashboard/matches");
  return res.json();
}
