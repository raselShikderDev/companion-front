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
  Settings,
  Menu,
  X,
  MessageCircle,
  DollarSign,
  EuroIcon,
  Calendar1,
} from "lucide-react";
import { useState } from "react";
import LogoutButton from "./LogOutButton";
import Logo from "../shared/Logo";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "All Users", icon: Users },
  { href: "/admin/dashboard/trips", label: "Manage Trips", icon: MapPin },
  { href: "/admin/dashboard/reviews", label: "Monitor Reviews", icon: MessageCircle },
  { href: "/admin/dashboard/matches", label: "Manage Matches", icon: Share2 },
  { href: "/admin/dashboard/subscriptions", label: "Subscriptions", icon: Calendar1 },
  { href: "/admin/dashboard/payments", label: "All Payments", icon: EuroIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/*  MOBILE TOP NAVBAR  */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 h-14 flex items-center justify-between px-4 border-b bg-background">
        {/* Hamburger LEFT */}
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo RIGHT */}
        <div className={`${open ? "hidden" : ""} flex items-center gap-2`}>
          <Logo />
          <span className="font-semibold hidden sm:block">Companion</span>
        </div>
      </header>

      {/*  MOBILE OVERLAY  */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/*  SIDEBAR  */}
      <aside
        className={cn(
          "z-50 w-64 bg-sidebar border-r flex flex-col",
          "transition-transform duration-300 ease-in-out",

          // Mobile overlay behavior
          "fixed inset-y-0 left-0 md:relative",
          open ? "translate-x-0" : "-translate-x-full",

          // Desktop always visible
          "md:translate-x-0"
        )}
      >
        {/*  MOBILE SIDEBAR HEADER  */}
        <div className="md:hidden flex items-center justify-between h-14 px-4 border-b">
          <div className={`flex items-center gap-2 `}>
            <Logo />
            <span className="font-semibold">Companion</span>
          </div>

          {/* Close button */}
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/*  DESKTOP LOGO  */}
        <div className="hidden md:block sticky top-0 z-10 p-6 border-b bg-sidebar">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold">Companion</span>
          </Link>
          <p className="text-sm text-muted-foreground">Admin Portal</p>
        </div>

        {/*  NAV  */}
        <nav className="flex-1 px-4 py-4 space-y-2">
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
                    isActive &&
                      "bg-primary/10 text-primary font-semibold"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/*  LOGOUT (STICKY BOTTOM)  */}
        <div className="sticky bottom-0 bg-sidebar border-t p-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
