/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { SubscriptionPlan } from "@/types/enum.interface";
import { redirect } from "next/navigation";

export async function initiateSubscription(plan: SubscriptionPlan) {
  const res = await serverFetch.post("/subscription/create", {
    body: JSON.stringify({ plan }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok || !data?.success) {
    return {
      success: false,
      message: data?.message || "Failed to initiate subscription",
    };
  }

  if (plan === "FREE") {
    redirect("/dashboard");
  }

  if (data?.data?.paymentUrl) {
    redirect(data.data.paymentUrl);
  }

  return {
    success: true,
    data: data.data,
  };
}

export async function getMySubscription() {
  try {
    const res = await serverFetch.get("/subscription/my-subscripion");
    const data = await res.json();

    if (!res.ok || !data?.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(" Get subscription error:", error);
    return null;
  }
}
