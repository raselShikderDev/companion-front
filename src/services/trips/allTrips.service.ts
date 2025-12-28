"use server";

import { serverFetch } from "@/lib/serverFetch";


// Only for admin
export async function getAllTrips(queryString?: string) {
  try {
    const res = await serverFetch.get(`/trip${queryString ? `?${queryString}` : ""}`, {
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Get Trips Error:", err);
    return [];
  }
}


//