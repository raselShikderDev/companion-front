/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/correctness/useParseIntRadix: > */
/** biome-ignore-all lint/complexity/useLiteralKeys: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { parse } from "cookie";
import { revalidateTag } from "next/cache";
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
    console.log({ input });

    // Validate input
    // const validation = zodValidator(input, forgotPasswordSchema)
    // if (!validation.success) {
    //   return {
    //     success: false,
    //     message: "Invalid email address",
    //     errors: validation.errors,
    //   }
    // }

    if (zodValidator(input, forgotPasswordSchema).success === false) {
      return zodValidator(input, forgotPasswordSchema);
    }

    const validatedData: any = zodValidator(
      input,
      forgotPasswordSchema
    ).data;
     console.log({validatedData});

  
    console.log({ email:validatedData.email});

    const res = await serverFetch.post("/auth/forgot-password", {
      body: JSON.stringify({ email:validatedData.email}),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    console.log(data);

    if (!res.ok || !data?.ok) {
      return {
        success: false,
        message: data?.message || "Failed to send OTP",
      }
    }

    return data
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
  try {
    const input: VerifyOtpInput = {
      email: formData.get("email") as string,
      otp: formData.get("otp") as string,
    }

    console.log({input});
    

    // Validate input
    // const validation = zodValidator(input, verifyOtpSchema)
    // if (!validation.success) {
    //   return {
    //     success: false,
    //     message: "Invalid input",
    //     errors: validation.errors,
    //   }
    // }

    if (zodValidator(input, verifyOtpSchema).success === false) {
      return zodValidator(input, verifyOtpSchema);
    }

    const validatedData: any = zodValidator(
      input,
      verifyOtpSchema
    ).data;
    console.log(validatedData);


    const res = await serverFetch.post("/auth/verify-otp", {
      body: JSON.stringify(validatedData.data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
console.log({data});


    return data
  } catch (error: any) {
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


    // Validate input
    // const validation = zodValidator(input, resetPasswordSchema)
    // if (!validation.success) {
    //   return {
    //     success: false,
    //     message: "Invalid input",
    //     errors: validation.errors,
    //   }
    // }

    if (zodValidator(input, resetPasswordSchema).success === false) {
      return zodValidator(input, resetPasswordSchema);
    }

    const validatedData: any = zodValidator(
      input,
      resetPasswordSchema
    ).data;
    console.log(validatedData);

    const res = await serverFetch.post("/auth/reset-password", {
      body: JSON.stringify(validatedData.data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    console.log(data);

   return data
  } catch (error: any) {
    console.error(" Reset password error:", error)
    return {
      success: false,
      message: error.message || "Server error",
    }
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



// export async function updateMyProfile(_: any, formData: FormData) {
//   console.log("RAW FORM DATA:");
//   for (const [k, v] of formData.entries()) {
//     console.log(k, v);
//   }
//   try {
//     const data: Record<string, any> = {};


//     const fields = [
//       "fullName",
//       "gender",
//       "age",
//       "address",
//       "bio",
//       "phone",
//     ];

//     // fields.forEach((field) => {
//     //   const value = formData.get(field);
//     //   if (value !== null && value !== "") {
//     //     data[field] = value;
//     //   }
//     // });
//     formData.forEach((value, key) => {
//       if (key === "file") return;

//       if (value === null || value === "") return;

//       data[key] = value;
//     });


//     const travelStyleTags = formData.get("travelStyleTags");
//     if (travelStyleTags) {
//       data.travelStyleTags = String(travelStyleTags)
//         .split(",")
//         .map(v => v.trim())
//         .filter(Boolean);
//     }

//     const interests = formData.get("interests");
//     if (interests) {
//       data.interests = String(interests)
//         .split(",")
//         .map(v => v.trim())
//         .filter(Boolean);
//     }

//     // ❗ No email / password / role sent (correct)

//     const uploadFormData = new FormData();
//     uploadFormData.append("data", JSON.stringify(data));

//     const file = formData.get("file");
//     if (file instanceof File && file.size > 0) {
//       uploadFormData.append("file", file);
//     }

//     const res = await serverFetch.patch("/user/update-my-profile", {
//       body: uploadFormData,
//     });

//     const result = await res.json();
//     console.log({ result });

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message: result.message || "Update failed",
//       };
//     }

//     revalidateTag("/setting", { expire: 0 });
//     return {
//       success: true,
//       message: "Profile updated successfully",
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong",
//     };
//   }
// }


