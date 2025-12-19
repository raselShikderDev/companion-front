/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { TripStatus } from "@/types/enum.interface";
import { revalidatePath } from "next/cache";



export async function completeTrip({
  tripId,
  status,
}: {
   tripId: string,
  status: TripStatus,
}) {
      const res = await serverFetch.post(`/trip/complete/${tripId}`, {
       body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("dashboard/matches");
  return res.json();
}

