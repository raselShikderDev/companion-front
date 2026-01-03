/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */

import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";
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

  // const hasTokenRefreshedParams =
  //   request.nextUrl.searchParams.has("tokenRefreshed");

  // if (hasTokenRefreshedParams) {
  //   const url = request.nextUrl.clone();
  //   url.searchParams.delete("tokenRefreshed");
  //   return NextResponse.redirect(url);
  // }

  // const tokenRefreshedResult = await getNewAccessToken();

  // if (tokenRefreshedResult.tokenRefreshed) {
  //   const url = request.nextUrl.clone();
  //   url.searchParams.set("tokenRefreshed", "true");
  //   return NextResponse.redirect(url);
  // }

  // READ ACCESS TOKEN

  const accessToken =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    null;

  let userRole: UserRole | null = null;

  // VERIFY JWT SAFELY (Handles expired token)
  console.log({ accessToken });
  if (!accessToken) {
    console.log("no access token");
  }
  // const secret = new TextEncoder().encode(
  //   process.env.JWT_ACCESS_SECRET as string
  // );

  // const payload = await jwtVerify(accessToken as string, secret);
  // console.log("decoded in middleware:", payload);
  // if (!payload?.payload?.role) {
  //   throw new Error("no role");
  // }
  // userRole = payload?.payload?.role as UserRole;

  if (accessToken) {
    try {
      console.log("verifying token...");

      const verifiedToken: JwtPayload | any = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      );
      console.log( verifiedToken );

      userRole = verifiedToken.role as UserRole;
    } catch (err: any) {
      // TOKEN EXPIRED OR INVALID
      console.log("verification token is failed");

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
    console.log("token not found");

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

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Read cookies (Edge-safe)
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const role = request.cookies.get("role")?.value as UserRole | undefined;

//   const routeOwner = getRouteOwner(pathname);
//   const isAuth = isAuthRoute(pathname);

//   /**
//    * 1. Logged-in user visiting auth pages → redirect to dashboard
//    */
//   if (accessToken && role && isAuth) {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboard(role), request.url)
//     );
//   }

//   /**
//    * 2. Public routes → allow
//    */
//   if (routeOwner === null) {
//     return NextResponse.next();
//   }

//   /**
//    * 3. Protected routes → must be logged in
//    */
//   if (!accessToken || !role) {
//     const loginUrl = new URL("/signin", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   /**
//    * 4. Common protected routes → allow any logged-in user
//    */
//   if (routeOwner === "COMMON") {
//     return NextResponse.next();
//   }

//   /**
//    * 5. Admin-only routes
//    */
//   if (routeOwner === "ADMIN") {
//     if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
//       return NextResponse.redirect(
//         new URL(getDefaultDashboard(role), request.url)
//       );
//     }
//   }

//   /**
//    * 6. Explorer-only routes
//    */
//   if (routeOwner === "EXPLORER") {
//     if (role !== "EXPLORER") {
//       return NextResponse.redirect(
//         new URL(getDefaultDashboard(role), request.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export async function proxy(request: NextRequest) {
//  const token =
//     request.cookies.get("accessToken")?.value ||
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value;

//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/dashboard") && !token) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   if (token) {
//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET as string);
//       const { payload } = await jwtVerify(token, secret);
//       console.log("decoded in middleware:", payload);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       if (error.code === "ERR_JWT_EXPIRED") {
//         console.log("Token expired, fetching new token from API...");

//         const res = await getNewAccessToken()
//         const data = await res.json();
//         console.log("New token data:", data);
//         if (res.ok) {
//           return NextResponse.next();
//         } else {
//           return NextResponse.redirect(new URL("/signin", request.url));
//         }
//       } else {
//         console.log("JWT verification error:", error);
//         return NextResponse.redirect(new URL("/signin", request.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
