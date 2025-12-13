/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function getAvailableTrips({
  page = 1,
  limit = 10,
  search = "",
  filters = {},
}: {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Record<string, any>;
}) {
  // Build search params dynamically
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search) params.set("search", search);

  // Append dynamic filters (your backend supports them)
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  // ?page=${page}&limit=${limit}
  try {
    const res = await serverFetch.get(`/trip/available?page=${page}&limit=${limit}`, {
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
