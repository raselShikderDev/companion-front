"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Edit, Eye } from "lucide-react"

export default function ManageExplorers() {
  const [searchTerm, setSearchTerm] = useState("")

  const explorers = [
    { id: 1, name: "John Smith", email: "john@example.com", trips: 5, status: "Active", joined: "Jan 15, 2024" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", trips: 8, status: "Active", joined: "Feb 22, 2024" },
    { id: 3, name: "Mike Davis", email: "mike@example.com", trips: 3, status: "Inactive", joined: "Mar 10, 2024" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", trips: 12, status: "Active", joined: "Apr 5, 2024" },
    { id: 5, name: "Alex Brown", email: "alex@example.com", trips: 2, status: "Active", joined: "May 1, 2024" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Explorers</h1>
        <p className="text-muted-foreground">View and manage all registered travelers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Explorers</CardTitle>
          <CardDescription>Total: {explorers.length} registered travelers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Add Explorer</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Trips</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Joined</th>
                  <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {explorers.map((explorer) => (
                  <tr key={explorer.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">{explorer.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{explorer.email}</td>
                    <td className="py-4 px-4">{explorer.trips}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          explorer.status === "Active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {explorer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{explorer.joined}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="ghost" className="hover:text-accent">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
