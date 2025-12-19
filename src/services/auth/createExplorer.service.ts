/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { createExplorerZodSchema } from "@/zodSchemas/auth.zodValidation";
import { logInUser } from "./login";
import { Gender } from "@/types/enum.interface";

export const signupExplorer = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  console.log({ confirmPass: formData.get("confirmPassword") });

  try {
    const paylaod = {
      email: formData.get("email"),
      password: formData.get("password"),
      fullName: formData.get("fullName"),
      gender: formData.get("gender"),
      phone: formData.get("phone"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (zodValidator(paylaod, createExplorerZodSchema).success === false) {
      return zodValidator(paylaod, createExplorerZodSchema);
    }

    const validatedData: any = zodValidator(
      paylaod,
      createExplorerZodSchema
    ).data;

    const signUpData = {
      email: validatedData.email,
      password: validatedData.password,
      explorer: {
        fullName: validatedData.fullName,
        phone: validatedData.phone,
        gender: validatedData.gender as Gender,
      },
    };

    console.log({ signUpData });

    const res = await serverFetch.post(`/users/create-explorer`, {
      body: JSON.stringify(signUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      await logInUser(_currentState, formData);
    }
    return res;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "SignUp failed! Please try again."
      }`,
    };
  }
};
// /** biome-ignore-all lint/suspicious/noExplicitAny: > */
// /** biome-ignore-all assist/source/organizeImports: > */
// "use server";

// import { serverFetch } from "@/lib/serverFetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { createTripZodSchema } from "@/zodSchemas/trip.zodValidation";
// import { revalidatePath } from "next/cache";

// export const createTrip = async (_state: any, formData: FormData): Promise<any> => {
//   try {
//     const journeyType = formData.getAll("journeyType");
//     const Languages = formData.getAll("languages");

//     // normalize values: convert null/" " -> undefined, trim strings
//     const normalize = (v: FormDataEntryValue | null) =>
//       typeof v === "string" ? v.trim() || undefined : typeof v === "object" ? v : undefined;

//     const payload = {
//       title: normalize(formData.get("title")),
//       destination: normalize(formData.get("destination")),
//       departureLocation: normalize(formData.get("departureLocation")),
//       startDate: normalize(formData.get("startDate")),
//       endDate: normalize(formData.get("endDate")),
//       description: normalize(formData.get("description")),
//       budget: normalize(formData.get("budget")),
//       duration: normalize(formData.get("duration")),
//       image: normalize(formData.get("image")),
//       journeyType,
//       Languages,
//     };

//     const validated = zodValidator(payload, createTripZodSchema);

//     if (!validated.success) return { ...validated, wrongData: payload };

//     const res = await serverFetch.post(`/trip/create-trip`, {
//       body: JSON.stringify(validated.data),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();

//     if (!data.success) {
//       return {
//         success: false,
//         message: data.message || "Trip creation failed",
//         wrongData: payload,
//       };
//     }
//     revalidatePath("/all-explorer")
//     return {
//       success: true,
//       message: "Trip created successfully!",
//     };
//   } catch (error: any) {
//     console.error("Trip Create Error:", error?.message || error);
//     return {
//       success: false,
//       message: "Server error while creating trip",
//     };
//   }
// };
