import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);

  // Preserve query params like tran_id
  return NextResponse.redirect(
    `${url.pathname}?${url.searchParams.toString()}`,
    { status: 302 }
  );
}
