"use client";

import { Button } from "@/components/ui/button";

const FILTERS = ["ALL", "PENDING", "REJECTED"] as const;

export function MatchFilterTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 mb-6">
      {FILTERS.map((f) => (
        <Button
          key={f}
          variant={active === f ? "default" : "outline"}
          onClick={() => onChange(f)}
        >
          {f}
        </Button>
      ))}
    </div>
  );
}
