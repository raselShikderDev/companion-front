/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */

import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboard,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { getNewAccessToken } from "./services/auth/auth.services";
import { deleteCookie } from "./lib/tokenHandeler";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // HANDLE TOKEN REFRESH CALLBACK

  const hasTokenRefreshedParams =
    request.nextUrl.searchParams.has("tokenRefreshed");

  if (hasTokenRefreshedParams) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const tokenRefreshedResult = await getNewAccessToken();

  if (tokenRefreshedResult.tokenRefreshed) {
    const url = request.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  // READ ACCESS TOKEN

  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;

  // VERIFY JWT SAFELY (Handles expired token)

  if (accessToken) {
    try {
      const verifiedToken: JwtPayload | any = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      );

      // If token payload is string -> invalid token
      if (typeof verifiedToken === "string") {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        return NextResponse.redirect(new URL("/signin", request.url));
      }

      userRole = verifiedToken.role;
    } catch (err: any) {
      // TOKEN EXPIRED OR INVALID
      console.log(err);

      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");

      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set("expired", "true");

      return NextResponse.redirect(loginUrl);
    }
  }

  // DETERMINE ROUTE OWNER

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  // IF LOGGED IN BUT VISITING AUTH ROUTES → REDIRECT TO DASHBOARD

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboard(userRole as UserRole), request.url)
    );
  }

  // PUBLIC ROUTES → ALWAYS ALLOW

  if (routeOwner === null) {
    return NextResponse.next();
  }

  // NOT LOGGED IN → FORCE LOGIN

  if (!accessToken) {
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/reset-password") {
    return NextResponse.redirect(
      new URL(getDefaultDashboard(userRole as UserRole), request.url)
    );
  }

  // COMMON PROTECTED ROUTES

  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  //  ROLE-BASED ROUTE PROTECTION
  if (routeOwner === "ADMIN") {
    if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
      return NextResponse.redirect(
        new URL(getDefaultDashboard(userRole as UserRole), request.url)
      );
    }
    return NextResponse.next();
  }

  if (routeOwner === "EXPLORER") {
    if (userRole !== "EXPLORER") {
      return NextResponse.redirect(
        new URL(getDefaultDashboard(userRole as UserRole), request.url)
      );
    }
    return NextResponse.next();
  }

  // if (routeOwner === "ADMIN" || routeOwner === "EXPLORER" || routeOwner === Role.SUPER_ADMIN) {
  //   if (userRole !== routeOwner) {
  //     return NextResponse.redirect(
  //       new URL(getDefaultDashboard(userRole as UserRole), request.url)
  //     );
  //   }
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
