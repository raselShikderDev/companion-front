/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import PasswordToggler from "./PasswordToggler";
import { toast } from "react-toastify";
import { loginSchema } from "@/zodSchemas/auth.zodValidation";



type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginTwoForm() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const responseData: {
        success: boolean;
        token?: string;
        message?: string;
      } = await response.json();

      if (!response.ok || !responseData.success) {
        toast.error(responseData.message || "Login failed");
        return;
      }

      router.push("/");
      toast.success("Successfully logged in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "A network error occurred.");
    }
  };

  return (
       <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <Input id="email" placeholder="Your email" {...register("email")} />
            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <PasswordToggler {...register("password")} />
            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            className="w-full mt-4 cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </div>
  );
}