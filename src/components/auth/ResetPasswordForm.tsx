"use client"
import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { resetPassword } from "@/services/auth/auth.services"
import { toast } from "react-toastify"


const ResetPasswordForm = () => {
    const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const email = searchParams.get("email") || ""

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(true)

  const [state, formAction, isPending] = useActionState(resetPassword, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state, router])

  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword)
    }
  }, [password, confirmPassword])

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(password) },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (password !== confirmPassword) {
      e.preventDefault()
      toast.error("Passwords do not match")
      setPasswordMatch(false)
      return
    }
  }
  return (
   <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="token" value={token} />

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  required
                  disabled={isPending}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10 border-primary/20 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {state?.errors?.newPassword && <p className="text-sm text-destructive">{state.errors.newPassword[0]}</p>}
            </div>

            {password && (
              <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground">Password Requirements:</p>
                <ul className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`w-3 h-3 ${req.met ? "text-green-500" : "text-muted-foreground/50"}`} />
                      <span className={req.met ? "text-foreground" : "text-muted-foreground"}>{req.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  required
                  disabled={isPending}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`h-11 pr-10 border-primary/20 focus:border-primary ${!passwordMatch && confirmPassword ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!passwordMatch && confirmPassword && <p className="text-sm text-destructive">Passwords do not match</p>}
            </div>

            {state?.success === false && !state?.errors && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {state?.success && (
              <Alert className="bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400">
                <AlertDescription>Password reset successful! Redirecting to login...</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isPending || !passwordMatch || password.length < 8}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Reset Password
                </>
              )}
            </Button>
          </form>
  )
}

export default ResetPasswordForm
