"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-balance mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Wanderlust? We'd love to hear from you. Reach out to our team and we'll get back to you
            as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="p-8 text-center border-border hover:border-accent transition-colors">
              <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground mb-2">hello@companion.com</p>
              <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
            </Card>
            <Card className="p-8 text-center border-border hover:border-accent transition-colors">
              <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground mb-2">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM EST</p>
            </Card>
            <Card className="p-8 text-center border-border hover:border-accent transition-colors">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Office</h3>
              <p className="text-muted-foreground mb-2">San Francisco, CA</p>
              <p className="text-sm text-muted-foreground">Global team across 5 continents</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Send us a Message</h2>

          {isSubmitted ? (
            <div className="bg-card border-2 border-accent/30 rounded-lg p-12 text-center">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. Our team will review your message and get back to you soon.
              </p>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </div>
          ) : (
            <Card className="p-8 sm:p-12 border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="p-6 border-border hover:border-accent transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-2">How do I join a trip?</h3>
              <p className="text-muted-foreground">
                Browse our curated trips, view matching travelers, and submit a booking request. Our team verifies your
                profile and confirms your spot once you're matched with the group.
              </p>
            </Card>
            <Card className="p-6 border-border hover:border-accent transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers. All payments are secure and processed
                through industry-leading payment processors.
              </p>
            </Card>
            <Card className="p-6 border-border hover:border-accent transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-2">Can I cancel my booking?</h3>
              <p className="text-muted-foreground">
                Yes! We offer full refunds up to 14 days before your trip. After that, cancellation fees may apply based
                on our cancellation policy.
              </p>
            </Card>
            <Card className="p-6 border-border hover:border-accent transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-2">How do you ensure traveler safety?</h3>
              <p className="text-muted-foreground">
                Every traveler undergoes background verification. We also provide safety guidelines, trip insurance
                options, and 24/7 support during your trip.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
