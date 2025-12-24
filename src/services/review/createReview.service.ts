/** @format */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export const createReview = async (_: any, formData: FormData) => {
  try {
    const payload = {
      matchId: formData.get("matchId"),
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
    };

    const res = await serverFetch.post("/review/create", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to submit review",
      };
    }

    revalidatePath(`/dashboard/my-matches/${payload.matchId}`);

    return {
      success: true,
      message: "Review submitted successfully",
    };
  } catch (error: any) {
    console.log(error);
    
    return {
      success: false,
      message: "Server error while submitting review",
    };
  }
};
