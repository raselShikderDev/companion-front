import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/adminSidebar"

export const metadata: Metadata = {
  title: "Admin Dashboard - Travel Match",
  description: "Manage explorers, trips, and matches",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
