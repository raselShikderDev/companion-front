/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getMyReviews = async (
  params?: { page?: number; limit?: number }
) => {
  try {
    const query = new URLSearchParams();

    if (params?.page) query.set("page", params.page.toString());
    if (params?.limit) query.set("limit", params.limit.toString());

    const res = await serverFetch.get(
      `/match/my-matches${query.toString() ? `?${query}` : ""}`
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
