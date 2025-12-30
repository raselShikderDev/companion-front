/** biome-ignore-all assist/source/organizeImports: > */
import ResetPasswordContent from "@/components/auth/ResetPasswordContent";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 h-80 rounded-xl bg-muted animate-pulse" />
    </div>
  );
}
