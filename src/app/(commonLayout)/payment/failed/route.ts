import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tranId = searchParams.get("tran_id");

  return NextResponse.redirect(
    new URL(`/payment/failed/view?tran_id=${tranId ?? ""}`, req.url)
  );
}

// Fallback for browser refresh / direct GET
export async function GET(req: NextRequest) {
  return POST(req);
}
