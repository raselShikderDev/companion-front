"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  const res = await serverFetch.delete(`/users/${userId}`);

  const data = await res.json();

  if (!res.ok || !data.success) {
    return { success: false, message: data.message };
  }

  revalidatePath("admin/dashboard/users");

  return { success: true };
}
