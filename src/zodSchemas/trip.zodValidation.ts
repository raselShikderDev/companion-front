import { z } from "zod";

export const createTripZodSchema = z.object({
  title: z.string().min(2, "Title is required"),
  destination: z.string().min(2, "Destination is required"),
  departureLocation: z.string().min(2, "Departure location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.string().regex(/^\d+$/, "Budget must be a number"),
  image: z.url("Invalid image URL"), // required
  journeyType: z.array(z.string()).min(1, "Select at least one journey type"),
  duration: z.string().min(1, "Duration is required"), // allow "5" etc.
  Languages: z.array(z.string()).min(1, "Select at least one language"),
});



export const updateTripZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destination: z.string().min(1, "Destination is required"),
  departureLocation: z.string().min(1, "Departure location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().min(1, "Description is required"),
  budget: z.string().min(1, "Budget is required"),
  requiredPerson: z.string().min(1, "Required person is required"),
  duration: z.string().min(1, "Duration is required"),

  journeyType: z
    .array(z.string())
    .min(1, "Select at least one journey type"),

  Languages: z
    .array(z.string())
    .min(1, "Select at least one language"),

  image: z.url("Image URL is required").optional(),
});
