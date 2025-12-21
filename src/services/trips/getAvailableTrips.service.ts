/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function getAvailableTrips(queryString?: string) {
  
  try {
    const res = await serverFetch.get(`/trip/available${queryString ? `?${queryString}` : ""}`, {
      cache: "no-store",
    });

    const data = await res.json();
    console.log("my trips", data);

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to fetch trips",
        meta: null,
        data: [],
      };
    }

    return {
      success: true,
      message: data.message,
      meta: data.meta,
      data: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error occurred",
      meta: null,
      data: [],
    };
  }
}
