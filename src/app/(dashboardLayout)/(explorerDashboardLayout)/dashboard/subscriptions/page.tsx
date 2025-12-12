"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export default function Subscriptions() {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      description: "Perfect for getting started",
      features: ["Browse available trips", "View 5 matches per month", "Basic profile", "Community reviews access"],
      highlighted: false,
    },
    {
      name: "Adventurer",
      price: "$9.99",
      period: "/month",
      description: "For the travel enthusiast",
      features: [
        "Everything in Explorer",
        "Unlimited match browsing",
        "Advanced matching algorithm",
        "Priority trip listings",
        "Early booking access",
        "Message other explorers",
        "Trip planning tools",
      ],
      highlighted: true,
    },
    {
      name: "Globetrotter",
      price: "$24.99",
      period: "/month",
      description: "For serious travelers",
      features: [
        "Everything in Adventurer",
        "VIP support",
        "Exclusive trips access",
        "Trip insurance included",
        "Flexible cancellation",
        "Dedicated travel advisor",
        "Custom itineraries",
        "Rewards program",
      ],
      highlighted: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">Unlock premium features and enhance your travel experience</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`flex flex-col transition-all ${
              plan.highlighted ? "border-2 border-accent md:scale-105" : "border"
            }`}
          >
            {plan.highlighted && (
              <div className="px-6 pt-4">
                <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>

              <div className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {plan.price === "Free" ? "Get Started" : "Subscribe Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Can I cancel my subscription anytime?</p>
              <p className="text-sm text-muted-foreground">
                Yes! Cancel anytime from your account settings. No questions asked.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Is there a trial period?</p>
              <p className="text-sm text-muted-foreground">
                Yes, Adventurer and Globetrotter plans come with a 7-day free trial.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">What payment methods do you accept?</p>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and digital wallets.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
