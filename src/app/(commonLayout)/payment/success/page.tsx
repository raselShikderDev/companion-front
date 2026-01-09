/** biome-ignore-all assist/source/organizeImports: > */


import PaymentSuccessContent from "@/components/payment/PaymentContent";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { tran_id?: string };
}) {
  const tranId = searchParams.tran_id;

  // ❌ NO TRANSACTION → BLOCK PAGE
  if (!tranId) {
    notFound();
  }

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
