import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPassword } from "@/services/auth/auth.services"
import { Loader2, Mail } from "lucide-react"
import InputFeildError from "@/lib/inputFeildError"

const ForgetPasswordForm = () => {
      const router = useRouter()
  const [state, formAction, isPending] = useActionState(forgotPassword, null)
  const [errorMessage, setErrorMesage] = useState<string>("")

  useEffect(() => {
    if (state?.success) {

      toast.success(state.message)
      // Redirect to verify OTP page with email
    //   router.push(`/auth/verify-otp?email=${encodeURIComponent(state.email)}`)
    } else if (state?.success === false) {
      setErrorMesage(state.message)
      toast.error(state.message)
    }
  }, [state, router])
console.log({state});
console.log({message:state?.message});

  return (
    <>
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
                required
                disabled={isPending}
                className="h-11 border-primary/20 focus:border-primary"
              />
              <InputFeildError feild="email" state={state} />
              {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
            </div>

            {/* {state?.success === false && !state?.errors && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )} */}

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
    </>
  )
}

export default ForgetPasswordForm
