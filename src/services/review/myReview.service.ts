/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getMyReviews = async (queryString?: string) => {
  try {
 
    const res = await serverFetch.get(
      `/review/my-review${queryString ? `?${queryString}` : ""}`
    );

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to fetch matches",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Get My Matches Error:", error.message);
    return {
      success: false,
      message: "Server error while fetching matches",
    };
  }
};
