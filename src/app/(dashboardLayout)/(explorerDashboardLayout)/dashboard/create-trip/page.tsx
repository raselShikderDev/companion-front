"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreateTrip() {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    interests: [] as string[],
  })

  const interests = ["Adventure", "Culture", "Beach", "Food", "Nature", "Nightlife", "History", "Shopping"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Trip created:", formData)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create a New Trip</h1>
        <p className="text-muted-foreground">Plan your adventure and find compatible travelers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
          <CardDescription>Fill in the information about your planned trip</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Trip Title</Label>
              <Input
                id="title"
                placeholder="e.g., European Summer Adventure"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, France"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="budget">Daily Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 100"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Trip Description</Label>
              <Textarea
                id="description"
                placeholder="Tell fellow travelers about your trip..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 min-h-32"
              />
            </div>

            <div>
              <Label>Interests (select multiple)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, interests: [...formData.interests, interest] })
                        } else {
                          setFormData({ ...formData, interests: formData.interests.filter((i) => i !== interest) })
                        }
                      }}
                      className="w-4 h-4 rounded border-border cursor-pointer accent-accent"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Create Trip
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
