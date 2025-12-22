/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { TripStatus } from "@/types/enum.interface";
import { revalidatePath } from "next/cache";

export async function completeTrip(
  _prevState: any,
  formData: FormData
) {
  const tripId = formData.get("tripId");

  if (!tripId || typeof tripId !== "string") {
    return {
      success: false,
      message: "Trip ID is missing",
    };
  }

  const res = await serverFetch.patch(
    `/trip/complete/${tripId}`,
    {
      body: JSON.stringify({ status: TripStatus.COMPLETED }),
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();

  revalidatePath("/dashboard/matches");

  return data;
}
