/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const createMatch = async (_state: any, formData: FormData) => {
  try {
    const tripId = formData.get("tripId");

    if (!tripId) {
      return {
        success: false,
        message: "Trip ID is required",
        wrongData: { tripId },
      };
    }

    const payload = { tripId };

    const res = await serverFetch.post(`/match/create-match`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to create match",
        wrongData: payload,
      };
    }

    return {
      success: true,
      message: data.message || "Match created successfully",
    };
  } catch (error: any) {
    console.error("Create Match Error:", error.message);

    return {
      success: false,
      message: "Server error while creating match",
    };
  }
};
