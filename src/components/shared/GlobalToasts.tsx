/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { Suspense } from "react";
import { ToastProvider } from "@/components/shared/toastContainer";
import SuccessLoggedInToast from "@/components/shared/successLoginToaster";
import SuccessLogoutToast from "@/components/shared/successLogoutToast";

export default function GlobalToasts() {
  return (
    <>
      <ToastProvider />

      <Suspense fallback={null}>
        <SuccessLoggedInToast />
        <SuccessLogoutToast />
      </Suspense>
    </>
  );
}
