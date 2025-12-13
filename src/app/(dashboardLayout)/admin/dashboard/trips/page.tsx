"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Trash2, Edit, Eye } from "lucide-react"

export default function ManageTrips() {
  const [searchTerm, setSearchTerm] = useState("")

  const trips = [
    {
      id: 1,
      title: "Europe Summer 2024",
      location: "Paris, France",
      creator: "John Smith",
      explorers: 4,
      status: "Active",
      startDate: "Jun 1, 2024",
    },
    {
      id: 2,
      title: "Asian Adventure",
      location: "Bangkok, Thailand",
      creator: "Sarah Johnson",
      explorers: 7,
      status: "Active",
      startDate: "Jul 15, 2024",
    },
    {
      id: 3,
      title: "Desert Safari",
      location: "Dubai, UAE",
      creator: "Mike Davis",
      explorers: 2,
      status: "Pending",
      startDate: "Aug 1, 2024",
    },
    {
      id: 4,
      title: "Caribbean Island Hopping",
      location: "Bahamas",
      creator: "Emma Wilson",
      explorers: 9,
      status: "Active",
      startDate: "Jul 20, 2024",
    },
    {
      id: 5,
      title: "Mountain Trek",
      location: "Swiss Alps",
      creator: "Alex Brown",
      explorers: 3,
      status: "Completed",
      startDate: "May 10, 2024",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Trips</h1>
        <p className="text-muted-foreground">View and manage all curated trips</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Trips</CardTitle>
          <CardDescription>Total: {trips.length} trips available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search trips by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Create Trip</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Trip Title</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Location</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Creator</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Explorers</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Start Date</th>
                  <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{trip.title}</td>
                    <td className="py-4 px-4 text-muted-foreground">{trip.location}</td>
                    <td className="py-4 px-4">{trip.creator}</td>
                    <td className="py-4 px-4">{trip.explorers}</td>
                    <td className="py-4 px-4">
                      <Badge
                        className={`${
                          trip.status === "Active"
                            ? "bg-accent/20 text-accent"
                            : trip.status === "Pending"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {trip.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{trip.startDate}</td>
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
