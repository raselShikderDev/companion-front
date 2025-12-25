
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import VerifyOtpForm from "@/components/auth/VerifyOtpForm"
import ResendOtpAction from "@/components/auth/ResendOtpAction"


interface PageProps {
  searchParams: {
    email?: string
  }
}
export default function VerifyOtpContent({ searchParams }: PageProps) {
  const email = searchParams.email ?? ""
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Verify OTP</CardTitle>
          <CardDescription className="text-base">
            We've sent a verification code to{" "}
            <span className="font-semibold text-foreground">{email || "your email"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
        <VerifyOtpForm/>
          <div className="space-y-3 pt-4 border-t">
            
            <ResendOtpAction/>
            <Link
              href="/forgot-password"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forgot Password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// export default function VerifyOtpPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
//       <VerifyOtpContent />
//     </Suspense>
//   )
// }
