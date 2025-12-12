"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, ThumbsDown } from "lucide-react"

export default function FindMatches() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const matches = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      location: "New York, USA",
      matchScore: 95,
      trips: 5,
      interests: ["Adventure", "Culture", "Food"],
      bio: "Love exploring new cultures and trying local cuisines.",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Emma Wilson",
      age: 26,
      location: "London, UK",
      matchScore: 88,
      trips: 8,
      interests: ["Beach", "History", "Photography"],
      bio: "Beach lover and history enthusiast. Looking for summer adventures!",
      avatar: "EW",
    },
    {
      id: 3,
      name: "Alex Chen",
      age: 30,
      location: "San Francisco, USA",
      matchScore: 82,
      trips: 12,
      interests: ["Nature", "Adventure", "Hiking"],
      bio: "Outdoor enthusiast seeking fellow adventurers.",
      avatar: "AC",
    },
  ]

  const currentMatch = matches[currentIndex]

  const handleLike = () => {
    setCurrentIndex((prev) => (prev + 1) % matches.length)
  }

  const handlePass = () => {
    setCurrentIndex((prev) => (prev + 1) % matches.length)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-foreground">Find Compatible Travelers</h1>
        <p className="text-muted-foreground">Our smart algorithm matches you with perfect travel companions</p>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="border-2 border-accent/30">
          <CardContent className="p-0">
            <div className="bg-linear-to-b from-accent/10 to-transparent h-64 flex items-center justify-center rounded-t-lg">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-accent text-accent-foreground text-xl font-bold">
                  {currentMatch.avatar}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">
                  {currentMatch.name}, {currentMatch.age}
                </h2>
                <p className="text-muted-foreground">{currentMatch.location}</p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-border rounded-full">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${currentMatch.matchScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-accent">{currentMatch.matchScore}%</span>
              </div>

              <p className="text-sm text-foreground mb-4">{currentMatch.bio}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">INTERESTS</p>
                <div className="flex flex-wrap gap-2">
                  {currentMatch.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-6">{currentMatch.trips} trips completed</p>

              <div className="flex gap-3">
                <Button onClick={handlePass} variant="outline" size="lg" className="flex-1 bg-transparent">
                  <ThumbsDown className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleLike}
                  size="lg"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Showing {currentIndex + 1} of {matches.length} matches
        </p>
      </div>
    </div>
  )
}
