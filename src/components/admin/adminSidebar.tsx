"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, MapPin, Share2, BarChart3, LogOut } from "lucide-react"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/explorers", label: "Manage Explorers", icon: Users },
  { href: "/admin/trips", label: "Manage Trips", icon: MapPin },
  { href: "/admin/matches", label: "Manage Matches", icon: Share2 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-primary">Travel Match</h1>
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
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Exit Admin
          </Button>
        </Link>
      </div>
    </aside>
  )
}
