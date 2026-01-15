/** biome-ignore-all lint/a11y/useKeyWithClickEvents: > */
/** biome-ignore-all lint/style/useImportType: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: > */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Users,
  MapPin,
  Share2,
  BarChart3,
  Menu,
  MessageCircle,
  EuroIcon,
  Calendar1,
} from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import UserDropdown from "../shared/UserDropdown";
import { IUser } from "@/types/user.interface";
import { getUserInfo } from "@/services/auth/getUserInfo";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "All Users", icon: Users },
  { href: "/admin/dashboard/trips", label: "Manage Trips", icon: MapPin },
  {
    href: "/admin/dashboard/reviews",
    label: "Monitor Reviews",
    icon: MessageCircle,
  },
  { href: "/admin/dashboard/matches", label: "Manage Matches", icon: Share2 },
  {
    href: "/admin/dashboard/subscriptions",
    label: "Subscriptions",
    icon: Calendar1,
  },
  { href: "/admin/dashboard/payments", label: "All Payments", icon: EuroIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      {/* MOBILE TOP NAVBAR */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 h-14 flex items-center justify-between px-4 border-b bg-background">
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className={`${open ? "hidden" : ""} flex items-center gap-2`}>
          <Logo />
          <span className="font-semibold hidden sm:block">Companion</span>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={cn(
          "z-50 w-64 bg-sidebar border-r flex flex-col justify-between transition-transform duration-300 ease-in-out",
          "fixed inset-y-0 left-0 md:relative",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* TOP SECTION: UserDropdown */}
        <div className="flex flex-row gap-3 px-4 py-6 border-b">
          <UserDropdown />
          <div className="flex self-center flex-col">
            <p className="text-xl p-0 m-0 text-muted-foreground ">
              {user?.admin?.fullName}
            </p>
            <span className="font-mono p-0 m-0 lowercase font-extralight text-[12px]">
              {user?.role}
            </span>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary font-semibold"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM SECTION: Logo + Portal Name */}
        <div className="px-6 py-4 border-t flex flex-col items-center gap-1">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold">Companion</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
