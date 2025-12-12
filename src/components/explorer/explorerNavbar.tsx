/** biome-ignore-all assist/source/organizeImports: > */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPin, Users, MessageSquare, Home, Briefcase, Search } from "lucide-react"
import ExplorerLogoutButton from "./ExplorerLogoutButton"

const explorerNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/create-trip", label: "Create Trip", icon: MapPin },
  { href: "/dashboard/my-trips", label: "My Trips", icon: Briefcase },
  { href: "/dashboard/matches", label: "Find Matches", icon: Users },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/find-trips", label: "Plans", icon: Search },
]

export function ExplorerNavbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/explorer" className="font-bold text-xl text-primary">
            Travel Match
          </Link>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {explorerNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn("gap-2", isActive && "bg-primary text-primary-foreground")}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          <Link href="/">
            <ExplorerLogoutButton/>
          </Link>
        </div>
      </div>
    </nav>
  )
}
