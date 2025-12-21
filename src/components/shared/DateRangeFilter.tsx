/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

export default function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const [range, setRange] = useState<DateRange | undefined>(undefined);

  // ✅ KEEP CALENDAR STATE IN SYNC WITH URL
useEffect(() => {
  // Whenever startDate or endDate in URL changes, update calendar
  if (startDateParam && endDateParam) {
    setRange({
      from: new Date(startDateParam),
      to: new Date(endDateParam),
    });
  } else {
    setRange(undefined);
  }
}, [startDateParam, endDateParam]);

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (range?.from && range?.to) {
      params.set("startDate", range.from.toISOString().split("T")[0]);
      params.set("endDate", range.to.toISOString().split("T")[0]);
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }

    setOpen(false); // close immediately

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("startDate");
    params.delete("endDate");

    setOpen(false);

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className="justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from && range?.to ? (
            <>
              {format(range.from, "MMM dd, yyyy")} –{" "}
              {format(range.to, "MMM dd, yyyy")}
            </>
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3 space-y-3" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />

        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilter}
            disabled={isPending}
          >
            Clear
          </Button>

          <Button
            size="sm"
            onClick={applyFilter}
            disabled={!range?.from || !range?.to || isPending}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}