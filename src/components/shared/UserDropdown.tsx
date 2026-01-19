/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings } from "lucide-react";
import Link from "next/link";
import DropDownLogoutButton from "./DropDownLogoutButton";
import { logOutUser } from "@/services/auth/logout";
import { IUser } from "@/types/user.interface";
import { IconPassword } from "@tabler/icons-react";
import { ModelTogglerDropDown } from "./ModelTogglerDropDown";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUserInfo } from "@/services/auth/getUserInfo";

const UserDropdown = () => {
  const pathname = usePathname();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo as IUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [pathname]);
  const handleLogout = async () => {
    await logOutUser();
  };

  console.log({
    profileAdmin: user?.admin?.profilePicture,
    profileExploer: user?.explorer?.profilePicture,
  });

  const avatarUrl =
    user?.admin?.profilePicture?.trim() ||
    user?.explorer?.profilePicture?.trim() ||
    null;

  const displayName =
    user?.admin?.fullName?.trim() || user?.explorer?.fullName?.trim() || "";

  console.log({ displayName, avatarUrl });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full cursor-pointer overflow-hidden bg-[#18181B]"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl || ""}
              alt="User avatar"
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex bg-gray-500 h-full w-full items-center justify-center text-sm font-semibold text-[#E5E7EB]">
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {user?.admin ? user?.admin?.fullName : user?.explorer?.fullName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-primary capitalize">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/settings"} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/change-password"} className="cursor-pointer">
            <IconPassword className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ModelTogglerDropDown />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 hover:text-white"
        >
          <DropDownLogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
