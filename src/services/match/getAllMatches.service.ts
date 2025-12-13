/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAllMatches = async (
  params?: { page?: number; limit?: number }
): Promise<any> => {
  try {
    const query = new URLSearchParams();

    if (params?.page) query.set("page", params.page.toString());
    if (params?.limit) query.set("limit", params.limit.toString());

    const res = await serverFetch.get(
      `/match${query.toString() ? `?${query}` : ""}`
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
    console.error("Get All Matches Error:", error.message);
    return {
      success: false,
      message: "Server error while fetching matches",
    };
  }
};
