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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Growth Trends */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Growth Trends
            </CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                explorers: { label: "Explorers", color: "hsl(var(--chart-1))" },
                trips: { label: "Trips", color: "hsl(var(--chart-2))" },
                matches: { label: "Matches", color: "hsl(var(--chart-3))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="explorers" stroke="var(--color-explorers)" strokeWidth={2} />
                  <Line type="monotone" dataKey="trips" stroke="var(--color-trips)" strokeWidth={2} />
                  <Line type="monotone" dataKey="matches" stroke="var(--color-matches)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Revenue by Plan
            </CardTitle>
            <CardDescription>Subscription plan contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                basic: { label: "Basic", color: "hsl(var(--chart-1))" },
                premium: { label: "Premium", color: "hsl(var(--chart-2))" },
                vip: { label: "VIP", color: "hsl(var(--chart-3))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="basic" stackId="a" fill="var(--color-basic)" />
                  <Bar dataKey="premium" stackId="a" fill="var(--color-premium)" />
                  <Bar dataKey="vip" stackId="a" fill="var(--color-vip)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                action: "New explorer registered",
                user: "sarah.d@example.com",
                time: "2 hours ago",
                icon: CheckCircle,
                color: "text-green-500",
              },
              {
                action: "Trip match confirmed",
                user: "Trip #1234",
                time: "3 hours ago",
                icon: CheckCircle,
                color: "text-green-500",
              },
              {
                action: "Payment received",
                amount: "$99.99",
                time: "5 hours ago",
                icon: TrendingUp,
                color: "text-accent",
              },
              {
                action: "Review submitted",
                trip: "Paris Adventure",
                time: "1 day ago",
                icon: CheckCircle,
                color: "text-green-500",
              },
              {
                action: "Support ticket created",
                issue: "Login issue",
                time: "1 day ago",
                icon: AlertCircle,
                color: "text-yellow-500",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <Icon className={`w-5 h-5 mt-0.5 ${item.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {("user" in item && item.user) ||
                        ("amount" in item && item.amount) ||
                        ("trip" in item && item.trip) ||
                        ("issue" in item && item.issue)}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              System Health
            </CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Server Status</span>
                <span className="text-sm font-semibold text-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Healthy
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2.5">
                <div className="bg-green-500 h-full rounded-full" style={{ width: "98%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">API Response Time</span>
                <span className="text-sm font-semibold text-accent">Fast (45ms)</span>
              </div>
              <div className="w-full bg-border rounded-full h-2.5">
                <div className="bg-accent h-full rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Database Performance</span>
                <span className="text-sm font-semibold text-accent">Optimal</span>
              </div>
              <div className="w-full bg-border rounded-full h-2.5">
                <div className="bg-accent h-full rounded-full" style={{ width: "96%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Uptime (30 days)</span>
                <span className="text-sm font-semibold text-green-500">99.99%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2.5">
                <div className="bg-green-500 h-full rounded-full" style={{ width: "99.99%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-accent/30 hover:border-accent transition-colors cursor-pointer bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Manage Explorers</h3>
            <p className="text-sm text-muted-foreground mb-4">View and manage explorer accounts</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Explorers
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
            <p className="text-sm text-muted-foreground mb-4">Review and approve matches</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Matches
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
