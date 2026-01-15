"use client";

// biome-ignore assist/source/organizeImports: >
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function ModelTogglerDropDown() {
  const { theme, setTheme } = useTheme();

  const base =
    "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer";

  const active = "bg-[#18181B] text-[#22D3EE]";
  const inactive = "text-[#E5E7EB] hover:bg-[#141414]";

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-2">
        <Moon className="h-4 w-4" />
        Theme
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent
        className="w-40 rounded-lg border border-[#222] bg-[#0E0E10] p-1 shadow-xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`${base} ${theme === "light" ? active : inactive}`}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`${base} ${theme === "dark" ? active : inactive}`}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`${base} ${theme === "system" ? active : inactive}`}
        >
          <Laptop className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
