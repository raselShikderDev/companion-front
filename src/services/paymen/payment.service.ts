"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function handlePaymentFailed(tranId: string) {
  if (!tranId) {
    return { success: false, message: "Transaction ID missing" };
  }

  const res = await serverFetch.post("/payment/fail", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tran_id: tranId }),
  });

  const data = await res.json();
  return data;
}

export async function handlePaymentCancel(tranId: string) {
  if (!tranId) {
    return { success: false, message: "Transaction ID missing" };
  }

  const res = await serverFetch.post("/payment/cancel", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tran_id: tranId }),
  });

  const data = await res.json();
  return data;
}
