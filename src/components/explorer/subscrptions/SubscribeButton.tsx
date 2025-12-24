/** biome-ignore-all lint/complexity/noUselessFragments: > */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { initiateSubscription } from "@/services/subscription/subscription.service"
import { SubscriptionPlan } from "@/types/enum.interface"

interface SubscribeButtonProps {
  plan: SubscriptionPlan
  isCurrentPlan: boolean
  isFree: boolean
}

export function SubscribeButton({ plan, isCurrentPlan, isFree }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      
      const result = await initiateSubscription(plan)

      if (!result.success) {
        toast.error(result.message || "Failed to initiate subscription")
      }
    } catch (error) {
      console.error("Subscribe error:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (isCurrentPlan) {
    return (
      <Button disabled className="w-full">
        Current Plan
      </Button>
    )
  }

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>{isFree ? "Activate Free Plan" : "Subscribe Now"}</>
      )}
    </Button>
  )
}
