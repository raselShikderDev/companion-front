/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/correctness/useParseIntRadix: > */
/** biome-ignore-all lint/complexity/useLiteralKeys: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { parse } from "cookie";
// import { resetPasswordSchema } from "@/zod/auth.validation";
import { deleteCookie, getCookie, setCookie } from "@/lib/tokenHandeler";
import { verifyAccessToken } from "@/lib/jwtHandler";
import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { ForgotPasswordInput, forgotPasswordSchema, ResetPasswordInput, resetPasswordSchema, VerifyOtpInput, verifyOtpSchema } from "@/zodSchemas/auth.zodValidation";


// Step 1: Request OTP for password reset
export async function forgotPassword(prevState: any, formData: FormData) {
  try {
    const input: ForgotPasswordInput = {
      email: formData.get("email") as string,
    }

    if (zodValidator(input, forgotPasswordSchema).success === false) {
      return zodValidator(input, forgotPasswordSchema);
    }

    const validatedData: any = zodValidator(
      input,
      forgotPasswordSchema
    ).data;



    const res = await serverFetch.post("/auth/forgot-password", {
      body: JSON.stringify({ email: validatedData.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log({ res });

    const data = await res.json()


    return {
      ...data,
      data: {
        email: validatedData.email,
      }
    }
  } catch (error: any) {
    console.error(" Forgot password error:", error)
    return {
      success: false,
      message: error.message || "Server error",
    }
  }
}

// Step 2: Verify OTP and get reset token
export async function verifyOtp(prevState: any, formData: FormData) {
  console.log("in server action");
  
  try {
    const input: VerifyOtpInput = {
      email: formData.get("email") as string,
      otp: formData.get("otp") as string,
    }

    console.log({ input });


    if (zodValidator(input, verifyOtpSchema).success === false) {
      return zodValidator(input, verifyOtpSchema);
    }

    const validatedData: any = zodValidator(
      input,
      verifyOtpSchema
    ).data;
    console.log({validatedData});
    console.log({otp: validatedData.otp});
    console.log({email: validatedData.email});

    const jsonData = JSON.stringify({ email: validatedData.email, otp: validatedData.otp })
console.log({jsonData});

    const res = await serverFetch.post("/auth/verify-otp", {
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    })
 

    const data = await res.json()


    return data
  } catch (error: any) {
    console.log(error);
    console.error(" Verify OTP error:", error)
    return {
      success: false,
      message: error.message || "Server error",
    }
  }
}

// Step 3: Reset password with token
export async function resetPassword(prevState: any, formData: FormData) {
  try {
    const input: ResetPasswordInput = {
      token: formData.get("token") as string,
      newPassword: formData.get("newPassword") as string,
    }

    console.log({ input });


    if (zodValidator(input, resetPasswordSchema).success === false) {
      return zodValidator(input, resetPasswordSchema);
    }

    const validatedData: any = zodValidator(
      input,
      resetPasswordSchema
    ).data;
    console.log(validatedData);
    
    const jsonData ={
      token:validatedData.token,
      newPassword:validatedData.newPassword,
    }

    const res = await serverFetch.post("/auth/reset-password", {
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    console.log(data);

    return data
  } catch (error: any) {
    
  }
}

// Logged in user chnages password
export async function changePassword(
  _prevState: any,
  formData: FormData
) {
  try {
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    const res = await serverFetch.patch("/auth/change-password", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Password change failed",
      };
    }

    

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // Case 2 : Access Token exist- and need to verify
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    //Case 3 : refresh Token is missing- user is logged out
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
    // This is the only case we need to call the API

    // Now we know: accessToken is invalid/missing AND refreshToken exists
    // Safe to call the API
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    console.log("access token refreshed!!");

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}



