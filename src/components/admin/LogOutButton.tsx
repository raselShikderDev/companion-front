/** biome-ignore-all assist/source/organizeImports: > */
"use client";
import { logOutUser } from "@/services/auth/logout";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogOut = async () => {
    await logOutUser();
  };
  return (
    <Button
      variant="outline"
      className="w-full gap-2 bg-transparent cursor-pointer"
      onClick={handleLogOut}
    >
      <LogOut className="w-4 h-4" />
      Exit Admin
    </Button>
  );
};

export default LogoutButton;
