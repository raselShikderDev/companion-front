/** biome-ignore-all lint/correctness/useParseIntRadix: > */
/** biome-ignore-all lint/complexity/useLiteralKeys: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboard,
  isValidRedirectRoute,
  UserRole,
} from "@/lib/authUtils";
import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginSchema } from "@/zodSchemas/auth.zodValidation";
import { setCookie } from "@/lib/tokenHandeler";

export const logInUser = async (_currentState: any, formData: any) => {
  const redirectTo = formData.get("redirect");

  let accessTokenObject: any = null;
  let refreshTokenObject: any = null;

  const signInData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (zodValidator(signInData, loginSchema).success === false) {
    return zodValidator(signInData, loginSchema);
  }

  const validatedData = zodValidator(signInData, loginSchema).data;

  try {
    const res = await serverFetch.post("/auth/signin", {
      body: JSON.stringify(validatedData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log({ data });

    const setCookieHeader = res.headers.getSetCookie();

    if (!setCookieHeader || setCookieHeader.length === 0) {
      throw new Error("No cookies received from backend");
    }

    setCookieHeader.forEach((cookie: string) => {
      const parsed = parse(cookie);
      if (parsed.accessToken) accessTokenObject = parsed;
      if (parsed.refreshToken) refreshTokenObject = parsed;
    });

    if (!accessTokenObject || !refreshTokenObject) {
      throw new Error("Tokens missing");
    }

    // ACCESS TOKEN
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject['SameSite'] || "none",
    });
  

    // REFRESH TOKEN (FIXED BUG HERE)
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject['SameSite'] || "none",
    });
    // Decoded role
    const decoded: JwtPayload | any = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    const userRole = decoded.role as UserRole;

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    // Redirect logic (unchanged)
    if (redirectTo && data.data?.needPasswordChange) {
      redirect(`/reset-password?redirect=${redirectTo}`);
    }

    if (data.data?.needPasswordChange) {
      redirect("/reset-password");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectRoute(requestedPath, userRole as UserRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        // redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
        redirect(`/`);
      }
    } else {
      redirect(`/`);
    }
    return data
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to login",
    };
  }
};


// /** biome-ignore-all lint/correctness/useParseIntRadix: > */
// /** biome-ignore-all lint/complexity/useLiteralKeys: > */
// /** biome-ignore-all lint/suspicious/noExplicitAny: > */
// /** biome-ignore-all lint/style/useImportType: > */
// /** biome-ignore-all assist/source/organizeImports: > */
// "use server";

// import { parse } from "cookie";
// import { redirect } from "next/navigation";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import {
//   getDefaultDashboard,
//   isValidRedirectRoute,
//   UserRole,
// } from "@/lib/authUtils";
// import { serverFetch } from "@/lib/serverFetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { loginSchema } from "@/zodSchemas/auth.zodValidation";
// import { setCookie } from "@/lib/tokenHandeler";

// export const logInUser = async (_currentState: any, formData: any) => {
//   const redirectTo = formData.get("redirect");
//   console.log(`Redirect from ${redirectTo}`);

//   let accessTokenObject: null | any = null;
//   let refreshTokenObject: null | any = null;
//   const signInData = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   if (zodValidator(signInData, loginSchema).success === false) {
//     return zodValidator(signInData, loginSchema);
//   }

//   const validatedData = zodValidator(signInData, loginSchema).data;

//   try {
//     const res = await serverFetch.post(`/auth/signin`, {
//       body: JSON.stringify(validatedData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     // console.log("RAW HEADERS:", res.headers);
//     // console.log(res.headers);
//     // console.log(res.headers.get("set-cookie"));
//     // console.log(res.headers.getSetCookie?.());
//     const data = await res.json();
//     console.log({ data });

//     const setCookieHeader = res.headers.getSetCookie();
//     console.log({ setCookieHeader });

//     if (setCookieHeader && setCookieHeader.length > 0) {
//       setCookieHeader.forEach((cookie: string) => {
//         const parsedCookie = parse(cookie);

//         if (parsedCookie["accessToken"]) {
//           accessTokenObject = parsedCookie;
//         }
//         if (parsedCookie["refreshToken"]) {
//           refreshTokenObject = parsedCookie;
//         }
//       });
//     } else {
//       console.log("No set cookies found");
//       throw new Error(data?.message);
//     }

//     if (!accessTokenObject) {
//       console.log("No accessToken found");
//       throw new Error(data?.message);
//     }

//     if (!refreshTokenObject) {
//       console.log("No refreshToken found");
//       throw new Error(data?.message);
//     }

//     await setCookie("accessToken", accessTokenObject.accessToken, {
//       httpOnly: true,
//       secure: true,
//       path: accessTokenObject.path || "/",
//       maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
//       sameSite: accessTokenObject["SameSite"] || "none",
//       // expires:accessTokenObject.Expires,
//     });
//     await setCookie("refreshToken", refreshTokenObject.refreshToken, {
//       httpOnly: true,
//       secure: true,
//       path: refreshTokenObject.path || "/",
//       maxAge:
//         parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 30,
//       sameSite: refreshTokenObject["SameSite"] || "none",
//       // expires:refreshTokenObject.Expires,
//     });

//     let userRole: UserRole | null = null;
//     const verifiedToken: JwtPayload | any = jwt.verify(
//       accessTokenObject.accessToken,
//       process.env.JWT_ACCESS_SECRET as string
//     );

//     if (typeof verifiedToken === "string") {
//       throw new Error("Invalid token");
//     }
//     userRole = verifiedToken.role;

//     if (!data.success) {
//       throw new Error(data.message || "Login failed");
//     }

//     if (redirectTo && data.data.needPasswordChange) {
//       const requestedPath = redirectTo.toString();
//       if (isValidRedirectRoute(requestedPath, userRole as UserRole)) {
//         redirect(`/reset-password?redirect=${requestedPath}`);
//       } else {
//         redirect(`/reset-password`);
//       }
//     }

//     if (data.data.needPasswordChange) {
//       redirect("/reset-password");
//     }

//     if (redirectTo) {
//       const requestedPath = redirectTo.toString();
//       if (isValidRedirectRoute(requestedPath, userRole as UserRole)) {
//         redirect(`${requestedPath}?loggedIn=true`);
//       } else {
//         redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
//       }
//     } else {
//       redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
//     }
//     return data
//   } catch (error: any) {
//     if (error?.digest?.startsWith("NEXT_REDIRECT")) {
//       throw error;
//     }
//     console.error(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Failed to login! you might have entered wrong credentials"
//       }`,
//     };
//   }
// };
