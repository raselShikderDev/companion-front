/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateTripZodSchema } from "@/zodSchemas/trip.zodValidation";
import { revalidatePath } from "next/cache";

export const updateTrip = async (
  _state: any,
  formData: FormData
): Promise<any> => {
  try {
    const tripId = formData.get("tripId"); // hidden input

    if (!tripId) {
      return {
        success: false,
        message: "Trip ID is missing for update",
      };
    }

    const journeyType = formData.getAll("journeyType");
    const Languages = formData.getAll("languages");

    const payload = {
      title: formData.get("title"),
      destination: formData.get("destination"),
      departureLocation: formData.get("departureLocation"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
      budget: formData.get("budget"),
      requiredPerson: formData.get("requiredPerson"),
      duration: formData.get("duration"),
      journeyType,
      Languages,
    };

    // Validate using Zod
    const validated = zodValidator(payload, updateTripZodSchema);

    if (!validated.success) {
      return validated;
    }

    const res = await serverFetch.patch(`/trip/${tripId}`, {
      body: JSON.stringify(validated.data),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Trip update failed",
        wrongData: payload,
      };
    }
    revalidatePath("/dashboard");
    revalidatePath("dashboard/my-trips");
    revalidatePath("dashboard/find-trips");
    return {
      success: true,
      message: "Trip updated successfully!",
    };
  } catch (error: any) {
    console.error("Trip Update Error:", error.message);

    return {
      success: false,
      message: "Server error while updating trip",
    };
  }
};
