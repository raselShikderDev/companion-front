"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Users, MessageSquare, Zap, TrendingUp, Star, Clock, DollarSign } from "lucide-react"

export default function ExplorerDashboard() {
  const stats = [
    { title: "Active Trips", value: "2", icon: MapPin, color: "text-accent" },
    { title: "Match Score", value: "94%", icon: Users, color: "text-green-500" },
    { title: "Reviews Left", value: "8", icon: Star, color: "text-yellow-500" },
    { title: "Subscribed Plan", value: "Premium", icon: Zap, color: "text-accent" },
  ]

  const quickLinks = [
    {
      title: "Create Trip",
      description: "Plan your next adventure",
      icon: MapPin,
      href: "/explorer/create-trip",
      color: "bg-accent",
    },
    {
      title: "Find Matches",
      description: "Connect with travelers",
      icon: Users,
      href: "/explorer/matches",
      color: "bg-blue-500",
    },
    {
      title: "Reviews",
      description: "Share your experiences",
      icon: MessageSquare,
      href: "/explorer/reviews",
      color: "bg-purple-500",
    },
    {
      title: "Subscriptions",
      description: "Unlock premium features",
      icon: Zap,
      href: "/explorer/subscriptions",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back, Traveler! 👋</h1>
        <p className="text-lg text-muted-foreground">You have 2 upcoming trips and 3 new matches waiting for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-2 border-border hover:border-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  <span>{stat.title}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {quickLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <Card
              key={index}
              className="border-2 border-accent/30 hover:border-accent transition-all cursor-pointer hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className={`${link.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {link.title}
                </CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={link.href}>
                  <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Trips */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Your Upcoming Trips
            </CardTitle>
            <CardDescription>You have 2 upcoming trips scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "European Summer Adventure",
                dates: "Jun 1 - Jun 15, 2024",
                explorers: 4,
                status: "Confirmed",
              },
              {
                name: "Southeast Asia Explorer",
                dates: "Aug 20 - Sep 5, 2024",
                explorers: 3,
                status: "Planning",
              },
            ].map((trip, i) => (
              <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{trip.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {trip.dates}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {trip.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" /> {trip.explorers} explorers confirmed
                </p>
              </div>
            ))}
            <Link href="/explorer/create-trip">
              <Button variant="outline" className="w-full bg-transparent">
                Plan New Trip
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Recent Matches
            </CardTitle>
            <CardDescription>3 compatible travelers found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Alex Chen", match: 95, trip: "Paris & London", mutual: true },
              { name: "Sarah Williams", match: 89, trip: "Greek Islands", mutual: false },
              { name: "Marco Rossi", match: 92, trip: "Italy Tour", mutual: true },
            ].map((explorer, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{explorer.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <TrendingUp className="w-4 h-4" /> {explorer.match}% match • {explorer.trip}
                    {explorer.mutual && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">Mutual</span>
                    )}
                  </p>
                </div>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Message
                </Button>
              </div>
            ))}
            <Link href="/explorer/matches">
              <Button variant="outline" className="w-full bg-transparent">
                View All Matches
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Spending Summary */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              Trip Spending
            </CardTitle>
            <CardDescription>Total spent on trips this year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">European Summer</span>
                <span className="font-semibold text-foreground">$2,450</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-accent h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Southeast Asia</span>
                <span className="font-semibold text-foreground">$1,820</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "48%" }}></div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Spent</span>
                <span className="text-lg font-bold text-accent">$4,270</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Your Reviews
            </CardTitle>
            <CardDescription>Reviews you've shared</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { trip: "Paris Adventure", rating: 5, date: "2 weeks ago" },
              { trip: "Barcelona Beach Trip", rating: 4, date: "1 month ago" },
            ].map((review, i) => (
              <div key={i} className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-foreground">{review.trip}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={`text-lg ${idx < review.rating ? "text-yellow-500" : "text-muted"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/explorer/reviews">
              <Button variant="outline" className="w-full bg-transparent">
                View All Reviews
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
