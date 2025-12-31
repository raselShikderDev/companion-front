"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPassword } from "@/services/auth/auth.services"
import { Loader2, Mail } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"

const ForgetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // normalize email from URL
  const rawEmail = searchParams.get("email")
  const email =
    rawEmail && rawEmail !== "undefined" && rawEmail !== "null"
      ? rawEmail
      : ""

  const [state, formAction, isPending] = useActionState(forgotPassword, null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (state?.success || state?.message === "OTP sent to your email") {
      toast.success(state.message)
      router.push(
        `/verify-otp?email=${encodeURIComponent(state.data.email)}`
      )
    } else if (state?.success === false) {
      setErrorMessage(state.message)
      toast.error(state.message)
    }
  }, [state, router])
console.log({email});

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="explorer@example.com"
          defaultValue={email}
          required
          disabled={isPending}
          className="h-11 border-primary/20 focus:border-primary"
        />

        {email && (<p className="text-sm text-destructive">Invaild reset password request! Try again </p>)}

        {errorMessage && (
          <p
            className={`text-sm ${
              errorMessage === "OTP sent to your email"
                ? "text-green-300"
                : "text-destructive"
            }`}
          >
            {errorMessage}
          </p>
        )}
      </div>

      {state?.success === false && !state?.errors && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending OTP...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Verification Code
          </>
        )}
      </Button>
    </form>
  )
}

export default ForgetPasswordForm
