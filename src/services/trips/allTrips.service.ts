"use server";

import { serverFetch } from "@/lib/serverFetch";


// Only for admin
export async function getAllTrips() {
  try {
    const res = await serverFetch.get(`/trip`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      return [];
    }

    return data.data;
  } catch (err) {
    console.error("Get Trips Error:", err);
    return [];
  }
}


//