/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server"

import { serverFetch } from "@/lib/serverFetch"
import { SubscriptionPlan } from "@/types/enum.interface"
import { redirect } from "next/navigation"

export async function initiateSubscription(plan: SubscriptionPlan) {
  try {
    const res = await serverFetch.post("/subscription/create", {
      body: JSON.stringify({ planName: plan }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    console.log({data});
    
    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Failed to initiate subscription",
      }
    }

    // If FREE plan, redirect to dashboard
    if (plan === "FREE") {
      redirect("/dashboard")
    }

    // For paid plans, redirect to payment gateway
    if (data.data?.sslPayload?.GatewayPageURL) {
      redirect(data.data.sslPayload.GatewayPageURL)
    }

    return {
      success: true,
      message: "Subscription initiated",
      data: data.data,
    }
  } catch (error: any) {
    console.error(" Subscription error:", error)
    return {
      success: false,
      message: error.message || "Server error",
    }
  }
}

export async function getMySubscription() {
  try {
    const res = await serverFetch.get("/subscription/my-subscripion")
    const data = await res.json()

    if (!res.ok || !data?.success) {
      return null
    }

    return data.data
  } catch (error) {
    console.error("[v0] Get subscription error:", error)
    return null
  }
}
