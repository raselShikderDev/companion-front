import z from "zod";

export const createAdminSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    admin: z.object({
        fullName: z.string().min(3, "Full name is too short"),
        phone: z.string().min(10, "Phone number is too short"),
        profilePicture: z.string().url("Profile picture must be a valid URL")
    })
});