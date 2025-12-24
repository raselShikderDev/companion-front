/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAdminAnalysis = async (): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> => {
  try {
    const res = await serverFetch.get("/analysis/admin");

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Failed to load admin analysis",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error: any) {
    console.error("Admin Analysis Error:", error.message);
    return {
      success: false,
      message: "Server error while loading admin analysis",
    };
  }
};
