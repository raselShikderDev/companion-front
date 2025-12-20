/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MessageCircle } from "lucide-react"

export default function Reviews() {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const reviews = [
    {
      id: 1,
      author: "John Smith",
      trip: "European Summer Adventure",
      rating: 5,
      date: "Jan 15, 2024",
      text: "Amazing trip! Had the best time exploring Europe with wonderful travel companions. Everything was perfectly organized.",
      avatar: "JS",
      helpful: 24,
    },
    {
      id: 2,
      author: "Sarah Johnson",
      trip: "Asian Adventure",
      rating: 4,
      date: "Jan 10, 2024",
      text: "Great experience overall. The itinerary was well-planned and the group was really fun. Would definitely go again!",
      avatar: "SJ",
      helpful: 18,
    },
    {
      id: 3,
      author: "Mike Davis",
      trip: "Caribbean Island Hopping",
      rating: 5,
      date: "Jan 5, 2024",
      text: "Perfect vacation! The beaches were stunning and the matched travelers were awesome to hang out with.",
      avatar: "MD",
      helpful: 32,
    },
  ]

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Review submitted:", { rating, text: reviewText })
    setShowReviewForm(false)
    setRating(0)
    setReviewText("")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Trip Reviews</h1>
        <p className="text-muted-foreground">Read and share real-time reviews from fellow travelers</p>
      </div>

      <div className="mb-8">
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {showReviewForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {showReviewForm && (
        <Card className="mb-8 border-2 border-accent/30">
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
            <CardDescription>Help other travelers make informed decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <Label className="mb-3">Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${star <= rating ? "fill-accent text-accent" : "text-border"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience from the trip..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="mt-2 min-h-32"
                />
              </div>

              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Post Review
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="bg-accent/10 text-accent">{review.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.trip}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 justify-end mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-sm mt-3">{review.text}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
