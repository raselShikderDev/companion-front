/** biome-ignore-all assist/source/organizeImports: > */
import NotFoundContent from "@/components/shared/NotfoundContenet";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<NotFoundFallback />}>
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-48 w-48 rounded-full bg-muted animate-pulse" />
    </div>
  );
}
