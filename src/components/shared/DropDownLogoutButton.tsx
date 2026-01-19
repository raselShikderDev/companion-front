/** biome-ignore-all lint/a11y/useKeyWithClickEvents: > */
/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */
"use client";

import { logOutUser } from "@/services/auth/logout";
import { LogOut } from "lucide-react";

const DropDownLogoutButton = () => {
  const handleLogOut = async () => {
    await logOutUser();
  };

  return (
    <div
      onClick={handleLogOut}
      className="flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md cursor-pointer
                 text-red-500 hover:text-white hover:bg-red-500/10 transition-colors"
    >
      <LogOut className="h-4 w-4 hover:text-white" />
      Logout
    </div>
  );
};

export default DropDownLogoutButton;
