

/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTripZodSchema } from "@/zodSchemas/trip.zodValidation";

export const createTrip = async (
  _state: any,
  formData: FormData
): Promise<any> => {
  try {

    // FIX: remove empty strings coming from form
const journeyType = formData
  .getAll("journeyType")
  .filter(Boolean) as string[];

const Languages = formData
  .getAll("languages")
  .filter(Boolean) as string[];


    // Build payload exactly as backend expects
    const payload = {
      title: formData.get("title"),
      destination: formData.get("destination"),
      departureLocation: formData.get("departureLocation"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
      budget: formData.get("budget"),
      duration: formData.get("duration"),
      image: formData.get("image"),
      journeyType,
      Languages,
    };

    // Zod validation
    const validated = zodValidator(payload, createTripZodSchema);

    if (!validated.success) {
      return validated; // contains errors + wrongData
    }

    // API call
    const res = await serverFetch.post("/trip/create-trip", {
      body: JSON.stringify(validated.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Trip creation failed",
        wrongData: payload,
      };
    }

    return {
      success: true,
      message: "Trip created successfully!",
    };
  } catch (error: any) {
    console.error("Create Trip Error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Server error while creating trip",
    };
  }
};
