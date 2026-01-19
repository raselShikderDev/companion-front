/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use client";

import { demoAdminLogin, demoExplorerLogin } from "@/services/auth/login";
import { Button } from "@/components/ui/button";
import { ShieldCheck, User } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

export default function DemoLoginButtons() {
  const [loading, setLoading] = useState<"explorer" | "admin" | null>(null);

  const explorerLogin = async () => {
    try {
      setLoading("explorer");
      const res = await demoExplorerLogin();
      if (res?.success) {
        toast.success(res.message || "Demo Explorer logged in");
      }
    } catch (err: any) {
      toast.error(err.message || "Demo login failed");
    } finally {
      setLoading(null);
    }
  };

  const adminLogin = async () => {
    try {
      setLoading("admin");
      const res = await demoAdminLogin();
      if (res?.success) {
        toast.success(res.message || "Demo Admin logged in");
      }
    } catch (err: any) {
      toast.error(err.message || "Demo login failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Demo Explorer */}
      <Button
        type="button"
        variant="ghost"
        className="w-full h-11 justify-start gap-3"
        disabled={loading !== null}
        onClick={explorerLogin}
      >
        <User className="h-4 w-4 text-primary" />
        <span className="flex-1 text-left">
          <span className="block font-medium dark:hover:text-white">
            Login as Demo Explorer
          </span>
        </span>
        {loading === "explorer" && (
          <span className="text-xs text-muted-foreground">Loading…</span>
        )}
      </Button>

      {/* Demo Admin */}
      <Button
        type="button"
        variant="ghost"
        className="w-full h-11 justify-start gap-3"
        disabled={loading !== null}
        onClick={adminLogin}
      >
        <ShieldCheck className="h-4 w-4 text-destructive" />
        <span className="flex-1 text-left">
          <span className="block font-medium dark:hover:text-white">
            Login as Demo Admin
          </span>
        </span>
        {loading === "admin" && (
          <span className="text-xs text-muted-foreground">Loading…</span>
        )}
      </Button>
    </div>
  );
}
