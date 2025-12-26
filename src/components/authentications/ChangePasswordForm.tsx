/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { changePassword } from "@/services/auth/auth.services";
import { Button } from "../ui/button";

const ChangePasswordForm = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (state?.success) toast.success(state.message || "Password successfully changed");
    if (state?.success === false) toast.error(state.message || "Unsuccessfull Password change ");
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
    }
  };
console.log({state, oldPassword, newPassword, confirmNewPassword});

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
      {/* Old Password */}
      <div className="space-y-2">
        <Label>Current Password</Label>
        <div className="relative">
          <Input
            name="oldPassword"
            type={showOld ? "text" : "password"}
            required
            disabled={isPending}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="h-11 pr-10"
          />
          <Button
            variant={"ghost"}
            onClick={() => setShowOld(!showOld)}
            className="eye-btn"
          >
            {showOld ? <EyeOff /> : <Eye />}
          </Button>
        </div>
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label>New Password</Label>
        <div className="relative">
          <Input
            name="newPassword"
            type={showNew ? "text" : "password"}
            required
            disabled={isPending}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`h-11 pr-10 ${sameAsOld ? "border-destructive" : ""}`}
          />
          <Button
            variant={"ghost"}
            onClick={() => setShowNew(!showNew)}
            className="eye-btn"
          >
            {showNew ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {sameAsOld && (
          <p className="text-sm text-destructive">
            New password cannot be same as current password
          </p>
        )}
      </div>

      {/* Password rules */}
      {newPassword && (
        <div className="p-3 bg-muted/50 rounded-lg space-y-1">
          {passwordRequirements.map((req, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <CheckCircle2
                className={`w-3 h-3 ${
                  req.met ? "text-green-500" : "text-muted-foreground/50"
                }`}
              />
              <span>{req.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label>Confirm New Password</Label>
        <div className="relative">
          <Input
            name="confirmNewPassword"
            type={showConfirm ? "text" : "password"}
            required
            disabled={isPending}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={`h-11 pr-10 ${
              !passwordMatch ? "border-destructive" : ""
            }`}
          />
          <Button
            variant={"ghost"}
            onClick={() => setShowConfirm(!showConfirm)}
            className="eye-btn"
          >
            {showConfirm ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {!passwordMatch && (
          <p className="text-sm text-destructive">Passwords do not match</p>
        )}
      </div>

      {/* Server error */}
      {state?.success === false && !state?.errors && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isPending || !passwordMatch || sameAsOld}
        className="w-full h-11"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </>
        )}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
