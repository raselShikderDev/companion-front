"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, XCircle } from "lucide-react"

export default function ManageMatches() {
  const [searchTerm, setSearchTerm] = useState("")

  const matches = [
    {
      id: 1,
      explorer1: "John Smith",
      explorer2: "Sarah Johnson",
      trip: "Europe Summer 2024",
      matchScore: "95%",
      status: "Approved",
      date: "Jan 20, 2024",
    },
    {
      id: 2,
      explorer1: "Mike Davis",
      explorer2: "Emma Wilson",
      trip: "Asian Adventure",
      matchScore: "87%",
      status: "Pending",
      date: "Jan 19, 2024",
    },
    {
      id: 3,
      explorer1: "Alex Brown",
      explorer2: "John Smith",
      trip: "Mountain Trek",
      matchScore: "92%",
      status: "Approved",
      date: "Jan 18, 2024",
    },
    {
      id: 4,
      explorer1: "Sarah Johnson",
      explorer2: "Emma Wilson",
      trip: "Caribbean Island Hopping",
      matchScore: "88%",
      status: "Approved",
      date: "Jan 17, 2024",
    },
    {
      id: 5,
      explorer1: "Mike Davis",
      explorer2: "Alex Brown",
      trip: "Desert Safari",
      matchScore: "78%",
      status: "Rejected",
      date: "Jan 16, 2024",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Matches</h1>
        <p className="text-muted-foreground">Review and approve smart matched explorer pairs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Explorer Matches</CardTitle>
          <CardDescription>Total: {matches.length} matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search matches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Explorer 1</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Explorer 2</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Trip</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Match Score</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">{match.explorer1}</td>
                    <td className="py-4 px-4">{match.explorer2}</td>
                    <td className="py-4 px-4 text-muted-foreground">{match.trip}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-border rounded-full">
                          <div className="h-full bg-accent rounded-full" style={{ width: match.matchScore }}></div>
                        </div>
                        <span className="text-sm font-medium text-accent">{match.matchScore}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={`${
                          match.status === "Approved"
                            ? "bg-accent/20 text-accent"
                            : match.status === "Pending"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {match.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{match.date}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="ghost" className="hover:text-accent">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:text-destructive">
                          <XCircle className="w-4 h-4" />
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
