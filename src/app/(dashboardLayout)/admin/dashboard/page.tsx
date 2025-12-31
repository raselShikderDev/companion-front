/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Share2, TrendingUp, AlertCircle, CheckCircle, Activity } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminDashboard() {
  const stats = [
    { title: "Total Explorers", value: "1,234", icon: Users, change: "+12% this month", bgColor: "bg-blue-500/10" },
    { title: "Active Trips", value: "456", icon: MapPin, change: "+8% this month", bgColor: "bg-accent/10" },
    { title: "Successful Matches", value: "789", icon: Share2, change: "+23% this month", bgColor: "bg-green-500/10" },
    {
      title: "Monthly Revenue",
      value: "$12.5K",
      icon: TrendingUp,
      change: "+18% this month",
      bgColor: "bg-purple-500/10",
    },
  ]

  const trendData = [
    { date: "Jan", explorers: 234, trips: 120, matches: 89 },
    { date: "Feb", explorers: 289, trips: 156, matches: 134 },
    { date: "Mar", explorers: 345, trips: 198, matches: 167 },
    { date: "Apr", explorers: 412, trips: 245, matches: 212 },
    { date: "May", explorers: 498, trips: 301, matches: 278 },
    { date: "Jun", explorers: 589, trips: 365, matches: 342 },
  ]

  const revenueData = [
    { month: "Jan", basic: 2500, premium: 4200, vip: 1800 },
    { month: "Feb", basic: 2800, premium: 4800, vip: 2100 },
    { month: "Mar", basic: 3200, premium: 5400, vip: 2600 },
    { month: "Apr", basic: 3800, premium: 6200, vip: 3200 },
    { month: "May", basic: 4200, premium: 7100, vip: 3900 },
    { month: "Jun", basic: 5100, premium: 8300, vip: 4600 },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">Platform overview & management center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-2 border-border hover:border-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  <span>{stat.title}</span>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-xs text-accent font-medium">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      
   
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-accent/30 hover:border-accent transition-colors cursor-pointer bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Manage Users</h3>
            <p className="text-sm text-muted-foreground mb-4">View and manage users accounts</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Users
            </Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-accent/30 hover:border-accent transition-colors cursor-pointer bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Manage Trips</h3>
            <p className="text-sm text-muted-foreground mb-4">Monitor and manage all trips</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Trips
            </Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-accent/30 hover:border-accent transition-colors cursor-pointer bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Manage Matches</h3>
            <p className="text-sm text-muted-foreground mb-4">Review all matches</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Matches
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
