import { Gender } from "@/types/enum.interface"
import z from "zod"

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),

})

export const createExplorerZodSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().regex(/^(?:\+?88)?01[3-9][ -]?\d{2}[ -]?\d{3}[ -]?\d{3}$/, "Invalid Bangladeshi phone number"),
    gender: z.enum(Gender, {
      error: "Gender must be male, female or other"
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

  export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})


export const verifyOtpSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().min(6, "OTP must be at least 6 characters").max(6, "OTP must be at most 6 characters"),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(10, "Invalid reset token"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a digit")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type SignupFormValues = z.infer<typeof createExplorerZodSchema>
export type LoginFormValues = z.infer<typeof loginSchema>