/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/correctness/noUnusedImports: > */
"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect, useState } from "react"
import Link from "next/link"
import { logInUser } from "@/services/auth/login";
import { toast } from "react-toastify";
import InputFeildError from "@/lib/inputFeildError";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { IInputErrorState } from "@/lib/getInputFeildError";
import { Alert, AlertDescription } from "../ui/alert";


export default function ({ redirect }: { redirect?: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formActoin, isPending] = useActionState(logInUser, null);

  useEffect(() => {
    if (!state) return;

    if ("message" in state && typeof state.message === "string") {
      toast.error(state.message === "fetch failed" ? "Unexpected Error occured! Try again" : state.message);
    }
  }, [state]);
  console.log({state});
  
  return (
    <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
      <form action={formActoin} className="space-y-4">
        {redirect && <Input type="hidden" name="redirect" value={redirect} />}
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email or Username
          </label>
          <Input
            id="email"
            name="email"
            className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none `}
            placeholder="you@example.com"
          />

          <InputFeildError feild="email" state={state as IInputErrorState} />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none pr-10 `}
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-poiner inset-y-0 right-0 px-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
          <InputFeildError feild="password" state={state as IInputErrorState} />
        </div>

        {/* Remember me & forgot password */}
        <div className="flex items-center justify-between text-sm">
          <Link href="/forget-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
   {state?.success === false && !state?.errors && (
        <Alert variant="destructive">
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      )}
        {/* Login button */}
        <Button
          type="submit"
          className="w-full cursor-pointer py-2 px-4  font-semibold rounded-lg shadow focus:outline-none focus:ring-2 bg-accent focus:ring-offset-1"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          {!isPending && "LogIn"}
        </Button>
      </form>
    </div>
  )
}


