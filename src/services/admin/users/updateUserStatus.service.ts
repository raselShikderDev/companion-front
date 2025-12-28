/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";
import { UserStatus } from "@/types/enum.interface";

export async function updateUserStatus(
  userId: string,
  status: UserStatus
) {
  const res = await serverFetch.patch(`/users/status/${userId}`, {
    body: JSON.stringify({ status }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return { success: false, message: data.message };
  }

  revalidatePath("/admin/dashboard/users");

  return { success: true };
}
