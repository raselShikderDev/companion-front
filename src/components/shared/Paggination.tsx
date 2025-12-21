/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useConst: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TablePaginationProps {
  currentPages: number;
  totalPages: number;
}

const Pagination = ({ currentPages, totalPages }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const changeLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1"); // reset to first page when changing limit

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const currentLimit = searchParams.get("limit") || "10";

  // Calculate visible page numbers
  const pageNumbers: number[] = [];
  const visiblePages = Math.min(5, totalPages);
  let startPage = Math.max(1, Math.min(currentPages - 2, totalPages - visiblePages + 1));
  for (let i = 0; i < visiblePages; i++) {
    pageNumbers.push(startPage + i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPages <= 1 || isPending}
          onClick={() => navigateToPage(currentPages - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPages ? "default" : "outline"}
            onClick={() => navigateToPage(pageNumber)}
            disabled={isPending}
            className="w-10"
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPages >= totalPages || isPending}
          onClick={() => navigateToPage(currentPages + 1)}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <span className="text-sm text-muted-foreground">
        Page {currentPages} of {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <Select value={currentLimit} onValueChange={changeLimit} disabled={isPending}>
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["1", "5", "10", "20", "50", "100"].map((val) => (
              <SelectItem key={val} value={val}>
                {val ? val : currentLimit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
