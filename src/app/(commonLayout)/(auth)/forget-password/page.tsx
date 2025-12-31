/** biome-ignore-all assist/source/organizeImports: > */
import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Forgot Password?</CardTitle>
          <CardDescription className="text-base">
            No worries! Enter your email and we'll send you a verification code
            to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Suspense fallback={<ForgotPasswordFallback />}>
            <ForgetPasswordForm />
          </Suspense>
          <div className="pt-4 border-t">
            <Link
              href="/signin"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ForgotPasswordFallback() {
  return (
    <div className="space-y-4">
      <div className="h-11 w-full bg-muted animate-pulse rounded" />
      <div className="h-11 w-full bg-muted animate-pulse rounded" />
      <div className="h-11 w-full bg-muted animate-pulse rounded" />
    </div>
  );
}
