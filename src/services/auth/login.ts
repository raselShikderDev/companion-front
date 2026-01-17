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
      throw new Error(data?.message);
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
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    // REFRESH TOKEN (FIXED BUG HERE)
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
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
        redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
        // redirect(`/`);
      }
    } else {
      redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
      // redirect(`/`);
    }
    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    return {
      success: false,
      message: error.message || "Failed to login",
    };
  }
};



export async function demoAdminLogin() {
  try {
    // 🔑 DEMO ADMIN CREDENTIALS
    const credentials = {
      email: "demo.admin@test.com",
      password: "DemoAdmin123!",
    };

    const res = await serverFetch.post("/auth/signin", {
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    const cookies = res.headers.getSetCookie();
    if (!cookies || cookies.length === 0) {
      throw new Error("No cookies returned");
    }

    let accessToken: any = null;
    let refreshToken: any = null;

    cookies.forEach((c) => {
      const parsed = parse(c);
      if (parsed.accessToken) accessToken = parsed;
      if (parsed.refreshToken) refreshToken = parsed;
    });

    if (!accessToken || !refreshToken) {
      throw new Error("Missing auth tokens");
    }

    await setCookie("accessToken", accessToken.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: Number(accessToken["Max-Age"]) || 60 * 60,
    });

    await setCookie("refreshToken", refreshToken.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: Number(refreshToken["Max-Age"]) || 60 * 60 * 24 * 30,
    });

    const decoded = jwt.verify(
      accessToken.accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    redirect(getDefaultDashboard(decoded.role as UserRole));
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Demo admin login failed",
    };
  }
}


export async function demoExplorerLogin() {
  try {
    // 🔑 DEMO CREDENTIALS
    const credentials = {
      email: "explorer2@test.com",
      password: "SecurePass123!",
    };

    const res = await serverFetch.post("/auth/signin", {
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    const cookies = res.headers.getSetCookie();
    if (!cookies || cookies.length === 0) {
      throw new Error("No cookies returned");
    }

    let accessToken: any = null;
    let refreshToken: any = null;

    cookies.forEach((c) => {
      const parsed = parse(c);
      if (parsed.accessToken) accessToken = parsed;
      if (parsed.refreshToken) refreshToken = parsed;
    });

    if (!accessToken || !refreshToken) {
      throw new Error("Missing auth tokens");
    }

    // ✅ Set cookies in Next.js
    await setCookie("accessToken", accessToken.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: Number(accessToken["Max-Age"]) || 60 * 60,
    });

    await setCookie("refreshToken", refreshToken.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: Number(refreshToken["Max-Age"]) || 60 * 60 * 24 * 30,
    });

    // Decode role
    const decoded = jwt.verify(
      accessToken.accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    redirect(getDefaultDashboard(decoded.role as UserRole));
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Demo explorer login failed",
    };
  }
}