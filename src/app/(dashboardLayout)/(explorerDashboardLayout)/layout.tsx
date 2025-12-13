import type React from "react"
import type { Metadata } from "next"
import { ExplorerNavbar } from "@/components/explorer/explorerNavbar"

export const metadata: Metadata = {
  title: "Explorer Portal - Travel Match",
  description: "Create trips, find matches, share reviews, and explore subscription plans",
}

export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ExplorerNavbar />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </>
  )
}
