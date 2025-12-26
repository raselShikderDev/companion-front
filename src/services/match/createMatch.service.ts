/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export const createMatch = async (
  _state: any,
  formData: FormData
): Promise<any> => {
  try {
    const payload = {
      tripId: formData.get("tripId"),
    };

    if (!payload.tripId) {
      return {
        success: false,
        message: "Trip ID is required",
      };
    }

    const res = await serverFetch.post("/match/create", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Match creation failed",
        wrongData: payload,
      };
    }
     revalidatePath("/dashboard");
    revalidatePath("/dashboard/matches");
    revalidatePath("/dashboard/trips");
    revalidatePath("/dashboard/find-trips");
    return {
      success: true,
      message: "Match request sent successfully",
    };
  } catch (error: any) {
    console.error("Create Match Error:", error.message);
    return {
      success: false,
      message: "Server error while creating match",
    };
  }
};

// /** biome-ignore-all lint/suspicious/noExplicitAny: > */
// "use server";

// import { serverFetch } from "@/lib/serverFetch";

// export const createMatch = async (_state: any, formData: FormData) => {
//   try {
//     const tripId = formData.get("tripId");

//     if (!tripId) {
//       return {
//         success: false,
//         message: "Trip ID is required",
//         wrongData: { tripId },
//       };
//     }

//     const payload = { tripId };

//     const res = await serverFetch.post(`/match/create-match`, {
//       body: JSON.stringify(payload),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();

//     if (!data.success) {
//       return {
//         success: false,
//         message: data.message || "Failed to create match",
//         wrongData: payload,
//       };
//     }

//     return {
//       success: true,
//       message: data.message || "Match created successfully",
//     };
//   } catch (error: any) {
//     console.error("Create Match Error:", error.message);

//     return {
//       success: false,
//       message: "Server error while creating match",
//     };
//   }
// };
