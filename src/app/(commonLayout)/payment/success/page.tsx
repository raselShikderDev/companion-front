/** biome-ignore-all assist/source/organizeImports: > */


import PaymentSuccessContent from "@/components/payment/PaymentContent";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const trans = await searchParams;

 if (!trans?.tran_id) {
  notFound();
 }
// export default function PaymentSuccessPage(){
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
