/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client"
import { MapPin, Star, Users, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserInfo } from "@/services/auth/getUserInfo"
import { useEffect, useState } from "react"


    const stats = [
    { title: "Active Trips", value: "2", icon: MapPin, color: "text-accent" },
    { title: "Match Score", value: "94%", icon: Users, color: "text-green-500" },
    { title: "Reviews Left", value: "8", icon: Star, color: "text-yellow-500" },
    { title: "Subscribed Plan", value: "Premium", icon: Zap, color: "text-accent" },
  ]

const DashboardStats = () => {



 return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
     {stats?.map((stat, index) => {
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
 )
}

export default DashboardStats
