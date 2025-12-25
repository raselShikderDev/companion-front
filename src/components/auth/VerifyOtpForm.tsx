"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useActionState, useEffect, useRef, useState } from "react"
import { verifyOtp } from "@/services/auth/auth.services"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { Loader2, ShieldCheck } from "lucide-react"

const VerifyOtpForm = () => {
    const [state, formAction, isPending] = useActionState(verifyOtp, null)
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""


    useEffect(() => {


        if (state?.success) {
            toast.success(state.message)
            // Redirect to reset password page with token
            router.push(`/reset-password?token=${state.resetToken}&email=${encodeURIComponent(state.email)}`)
        } else if (state?.success === false) {
            toast.error(state.message)
        }
    }, [state, router])
console.log({state});

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0]
        }

        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return

        const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""))
        setOtp(newOtp)

        const nextEmptyIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextEmptyIndex]?.focus()
    }
    return (
        <form action={formAction} className="space-y-5">
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="otp" value={otp.join("")} />

            <div className="space-y-2">
                <Label className="text-sm font-medium">Enter 6-Digit Code</Label>
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={isPending}
                            className="w-12 h-14 text-center text-xl font-bold border-primary/20 focus:border-primary"
                        />
                    ))}
                </div>
                {state?.errors?.otp && <p className="text-sm text-destructive text-center">{state.errors.otp[0]}</p>}
            </div>

            {state?.success === false && !state?.errors && (
                <Alert variant="destructive">
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={isPending || otp.join("").length < 4}
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    <>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Verify Code
                    </>
                )}
            </Button>
        </form>

    )
}

export default VerifyOtpForm
