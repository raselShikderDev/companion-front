"use client";

/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { changePassword } from "@/services/auth/auth.services";
import { Button } from "../ui/button";
import { IInputErrorState } from "@/lib/getInputFeildError";
import InputFeildError from "@/lib/inputFeildError";

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [sameAsOld, setSameAsOld] = useState(false);

  const [state, formAction, isPending] = useActionState(changePassword, null);

  useEffect(() => {
    if (confirmNewPassword) {
      setPasswordMatch(newPassword === confirmNewPassword);
    }
    setSameAsOld(oldPassword !== "" && newPassword === oldPassword);
  }, [oldPassword, newPassword, confirmNewPassword]);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  const passwordRequirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "One lowercase letter", met: /[a-z]/.test(newPassword) },
    { label: "One number", met: /[0-9]/.test(newPassword) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (sameAsOld) {
      e.preventDefault();
      toast.error("New password must be different from old password");
      return;
    }

    if (!passwordMatch) {
      e.preventDefault();
      toast.error("Passwords do not match");
      return;
    }
  };
console.log({
  oldPassword,
  newPassword, 
  confirmNewPassword
});

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5">

      {/* OLD PASSWORD */}
      <div>
        <label className="block text-sm font-medium">Current Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)} // ✅ FIX
            className="pr-10"
          />
          <Button type="button" variant="ghost" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0">
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        <InputFeildError feild="oldPassword" state={state as IInputErrorState} />
      </div>

      {/* NEW PASSWORD */}
      <div>
        <label className="block text-sm font-medium">New Password</label>
        <div className="relative">
          <Input
            type={showNewPassword ? "text" : "password"} // ✅ FIX
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // ✅ FIX
            className="pr-10"
          />
          <Button type="button" variant="ghost" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-0 top-0">
            {showNewPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        <InputFeildError feild="newPassword" state={state as IInputErrorState} />
      </div>

      {/* PASSWORD RULES */}
      {newPassword && (
        <div className="p-3 bg-muted/50 rounded-lg space-y-1">
          {passwordRequirements.map((req, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <CheckCircle2 className={req.met ? "text-green-500" : "text-muted-foreground"} />
              {req.label}
            </div>
          ))}
        </div>
      )}

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="block text-sm font-medium">Confirm Password</label>
        <div className="relative">
          <Input
            type={showConfirmNewPassword ? "text" : "password"} // ✅ FIX
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)} // ✅ FIX
            className="pr-10"
          />
          <Button type="button" variant="ghost" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute right-0 top-0">
            {showConfirmNewPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        <InputFeildError feild="confirmNewPassword" state={state as IInputErrorState} />
      </div>

      {state?.success === false && !state?.errors && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isPending || !passwordMatch || sameAsOld} className="w-full">
        {isPending ? <Loader2 className="animate-spin" /> : <Lock />}
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
