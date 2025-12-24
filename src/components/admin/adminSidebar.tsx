/** biome-ignore-all assist/source/organizeImports: > */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, MapPin, Share2, BarChart3, Settings } from "lucide-react"
import LogoutButton from "./LogOutButton"
import Logo from "../shared/Logo"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/dashboard/explorers", label: "Manage Explorers", icon: Users },
  { href: "/admin/dashboard/trips", label: "Manage Trips", icon: MapPin },
  { href: "/admin/dashboard/matches", label: "Manage Matches", icon: Share2 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <Link href="/" className="font-bold text-xl text-primary shrink-0">
          <div className="flex text-xl md:text-2xl gap-2 items-center">
            <Logo />
            <p className="hidden xs:block">Companion</p>
          </div>
        </Link>
        <p className="text-sm text-sidebar-foreground/60">Admin Portal</p>
      </div>

      <nav className="space-y-2 px-4">
        {adminNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-sidebar-primary/10 text-sidebar-primary font-semibold",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <Link href="/">
          <LogoutButton />
        </Link>
      </div>
    </aside>
  )
}
