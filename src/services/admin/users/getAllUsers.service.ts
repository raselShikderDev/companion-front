"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function getAllUsers(queryString?: string) {
  try {
    const res = await serverFetch.get(`/users${queryString ? `?${queryString}` : ""}`);

    const data = await res.json();

    return data
  } catch (error: any) {
    console.error("Get users error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Server error while fetching users",
      data: [],
    };
  }
}
