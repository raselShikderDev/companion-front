/** biome-ignore-all assist/source/organizeImports: > */


import PaymentSuccessContent from "@/components/payment/PaymentContent";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
    </div>
  );
}
