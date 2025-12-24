/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { deleteCookie } from "@/lib/tokenHandeler";
import { NextResponse } from "next/server";

export async function handleExpiredToken(request: Request) {
  // Delete both cookies
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");

  // Redirect user back to login
  const loginUrl = new URL("/signin", request.url);
  loginUrl.searchParams.set("expired", "true");

  return NextResponse.redirect(loginUrl);
}