import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import Link from "next/link"

 const quickLinks = [
    {
      title: "Create Trip",
      description: "Plan your next adventure",
      icon: MapPin,
      href: "/dashboard/create-trip",
      color: "bg-accent",
    },
    {
      title: "Find Matches",
      description: "Connect with travelers",
      icon: Users,
      href: "/dashboard/find-trips",
      color: "bg-blue-500",
    },
    // {
    //   title: "Reviews",
    //   description: "Share your experiences",
    //   icon: MessageSquare,
    //   href: "/dashboard/reviews",
    //   color: "bg-purple-500",
    // },
    // {
    //   title: "Subscriptions",
    //   description: "Unlock premium features",
    //   icon: Zap,
    //   href: "/explorer/subscriptions",
    //   color: "bg-orange-500",
    // },
  ]


const DashboardQuickLinks = () => {
  return (
    
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
  )
}

export default DashboardQuickLinks
