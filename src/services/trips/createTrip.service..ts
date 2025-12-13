/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTripZodSchema } from "@/zodSchemas/trip.zodValidation";

export const createTrip = async (_state: any, formData: FormData): Promise<any> => {
  try {
    const journeyType = formData.getAll("journeyType");
    const languages = formData.getAll("languages");

    const payload = {
      title: formData.get("title"),
      destination: formData.get("destination"),
      departureLocation: formData.get("departureLocation"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
      budget: formData.get("budget"),
      duration: formData.get("duration"),
      image: formData.get("image"), // NOW ALWAYS URL
      journeyType,
      languages,
    };

    const validated = zodValidator(payload, createTripZodSchema);

    if (!validated.success) return validated;

    const res = await serverFetch.post(`/trip/create-trip`, {
      body: JSON.stringify(validated.data),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Trip creation failed",
        wrongData: payload,
      };
    }

    return {
      success: true,
      message: "Trip created successfully!",
    };

  } catch (error: any) {
    console.error("Trip Create Error:", error.message);

    return {
      success: false,
      message: "Server error while creating trip",
    };
  }
};
