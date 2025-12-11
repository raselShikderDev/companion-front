"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { signupExplorer } from "@/services/auth/createExplorer.service";
import InputFeildError from "@/lib/inputFeildError";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Lock } from "lucide-react";

const explorerForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(signupExplorer, null);

  // Initialize gender from wrongData OR fallback default
  const initialGender =
    state?.wrongData?.gender === "MALE" ||
    state?.wrongData?.gender === "FEMALE"
      ? state.wrongData.gender
      : "MALE";

  const [gender, setGender] = useState<"MALE" | "FEMALE">(initialGender);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message || "Something went wrong! SignUp failed");
    }
    if (state && state.success && state.message) {
      toast.success(state.message || "Account successfully created");
    }
  }, [state]);

  return (
    <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
      <form action={formAction} className="space-y-5">
        <FieldGroup className="space-y-4">

          {/* Full Name */}
          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              defaultValue={state?.wrongData?.fullName}
            />
            <InputFeildError feild="fullName" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={state?.wrongData?.email}
            />
            <InputFeildError feild="email" state={state} />
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="+8801912345678"
              defaultValue={state?.wrongData?.phone}
            />
            <InputFeildError feild="phone" state={state} />
          </Field>

          {/* Gender */}
          <Field>
            <FieldLabel>Gender</FieldLabel>

            {/* Hidden input to submit gender */}
            <Input type="hidden" name="gender" value={gender} />

            <Select
              value={gender}
              onValueChange={(value) =>
                setGender(value as "MALE" | "FEMALE")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>

            <InputFeildError feild="gender" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10"
                defaultValue={state?.wrongData?.password}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <InputFeildError feild="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmShowPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="pl-10"
                defaultValue={state?.wrongData?.confirmPassword}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setConfirmShowPassword((prev) => !prev)
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {confirmShowPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <InputFeildError feild="confirmPassword" state={state} />
          </Field>

          {/* Submit */}
          <FieldGroup>
            <Field>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
              >
                Create Account
              </Button>

              <FieldDescription className="text-center pt-2">
                Already have an account?{" "}
                <Link href="/login">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    </div>
  );
};

export default explorerForm;
