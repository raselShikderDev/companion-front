import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tranId = searchParams.get("tran_id");

  // Optional: call backend API to verify/update payment
  // await verifyPayment(tranId);

  return NextResponse.redirect(
    new URL(`/payment/success/view?tran_id=${tranId}`, req.url)
  );
}

export async function GET(req: NextRequest) {
  // fallback safety
  return POST(req);
}
