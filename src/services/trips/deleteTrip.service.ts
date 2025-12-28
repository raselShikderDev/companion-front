"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function deleteTrip(tripId: string) {
  const res = await serverFetch.delete(`/trip/${tripId}`);

  const data = await res.json();

  if (!res.ok || !data.success) {
    return { success: false, message: data.message };
  }

   revalidatePath("dashboard");
    revalidatePath("dashboard/my-trips");
    revalidatePath("dashboard/find-trips");
  return { success: true };
}
