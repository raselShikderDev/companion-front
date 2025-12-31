"use client"

import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { forgotPassword } from "@/services/auth/auth.services"

const ResendOtpAction = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    const [resendState, resendAction, isResending] = useActionState(forgotPassword, null)

    console.log({ email });
    if (!email) {
        return null
    }

    useEffect(() => {
        if (resendState?.success) {
            toast.success("OTP resent successfully")
        } else if (resendState?.success === false) {
            toast.error(resendState.message)
        }
    }, [resendState])
    console.log({ resendState });

    return (
        <form action={resendAction} className="flex justify-center">
            <input type="hidden" name="email" value={email} />
            <Button
                type="submit"
                variant="ghost"
                size="sm"
                disabled={isResending}
                className="text-sm text-muted-foreground hover:text-primary"
            >
                {isResending ? (
                    <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Resending...
                    </>
                ) : (
                    "Didn't receive code? Resend"
                )}
            </Button>
        </form>
    )
}

export default ResendOtpAction
