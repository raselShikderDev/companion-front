/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Get Started
          </Button>
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
            <Button variant="ghost" size="sm" className="justify-start mt-2">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
