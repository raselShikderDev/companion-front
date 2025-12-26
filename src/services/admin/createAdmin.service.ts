"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAdminSchema } from "@/zodSchemas/admin.zodValidation";
import { revalidatePath } from "next/cache";

export async function createAdmin(
    _prevState: any,
    formData: FormData
) {
    try {

        const input = {
            email: formData.get("email"),
            password: formData.get("password"),
            admin: {
                fullName: formData.get("fullName"),
                phone: formData.get("phone"),
                profilePicture: formData.get("profilePicture") || undefined,
            },
        };
        console.log({ input });

        // basic validation
        if (!input.email || !input.password || !input.admin.fullName) {
            return {
                success: false,
                message: "Required fields are missing",
            };
        }



        if (zodValidator(input, createAdminSchema).success === false) {
            return zodValidator(input, createAdminSchema);
        }

        const validatedData: any = zodValidator(
            input,
            createAdminSchema
        ).data;
        console.log({ validatedData });

        const jsonData = {
            email: validatedData.email,
            password: validatedData.password,
            admin: {
                fullName: validatedData.admin.fullName,
                phone: validatedData.admin.phone,
                profilePicture: validatedData.admin.profilePicture,
            },
        };

        console.log({ jsonData });

        const res = await serverFetch.post("/users/create-explorer", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });

        const data = await res.json();

        console.log({data});
        

        revalidatePath("/users");

        return data
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}
