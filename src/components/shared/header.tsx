/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Role } from "@/types/enum.interface";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);
  console.log(user?.role);
  const getSignupRedirect = () => {
    if (user?.role === Role.ADMIN) return "/admin/dashboard";
    if (user?.role === Role.SUPER_ADMIN) return "/admin/dashboard/";
    if (user?.role === Role.EXPLORER) return "/dashboard";
    return "/signup";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground">
            <Logo />
          </div>
          <span className="text-xl font-bold hidden sm:inline">Companion</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-sm text-foreground hover:text-accent transition-colors"
          >
            Trips
          </Link>
          <Link
            href="#"
            className="text-sm text-foreground hover:text-accent transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#"
            className="text-sm text-foreground hover:text-accent transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#"
            className="text-sm text-foreground hover:text-accent transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user?.id === null && <Link href={"/signin"}>Sign In</Link>}

          <Link
            href={getSignupRedirect()}
            className="bg-accent rounded-sm py-1.5 w-full text-accent-foreground hover:bg-accent/90"
          >
            Get Started
          </Link>
        </div>

        <Button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-3">
            <Link
              href="#"
              className="text-sm text-foreground hover:text-accent py-2"
            >
              Trips
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground hover:text-accent py-2"
            >
              How It Works
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground hover:text-accent py-2"
            >
              Reviews
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground hover:text-accent py-2"
            >
              Pricing
            </Link>
            {/* <Button variant="ghost" size="sm" className="justify-start mt-2">
              Sign In
            </Button> */}
            {user?.id === null && (
              <Link className="justify-start mt-2" href={"/signin"}>
                Sign In
              </Link>
            )}

            <Link
              href={getSignupRedirect()}
              className="bg-accent py-1.5 px-2 rounded w-full text-accent-foreground hover:bg-accent/90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
