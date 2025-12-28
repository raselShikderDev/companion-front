/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export default async function getAllMatches(queryString?: string) {
  try {

    const res = await serverFetch.get(
      `/match/all${queryString ? `?${queryString}` : ""}`
    );

    const data = await res.json();


    return data;
  } catch (error: any) {
    console.error("Get All Matches Error:", error.message);
    return {
      success: false,
      message: "Server error while fetching matches",
    };
  }
};
