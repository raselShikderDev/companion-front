/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    plan: "FREE",
    price: 0,
    currency: "BDT",
    description: "For casual travelers",
    allowedMatches: 3,
    features: [
      "Browse curated trips",
      "Basic matching algorithm",
      "3 matches per year",
      "Community support",
      "Read reviews",
    ],
  },
  {
    name: "Standard",
    plan: "STANDARD",
    price: 499,
    currency: "BDT",
    description: "For active explorers",
    allowedMatches: 12,
    popular: true,
    features: [
      "Everything in Free",
      "Advanced matching algorithm",
      "12 matches per year",
      "Priority support",
      "Create unlimited trips",
      "Write reviews",
    ],
  },
  {
    name: "Premium",
    plan: "PREMIUM",
    price: 799,
    currency: "BDT",
    description: "For serious adventurers",
    allowedMatches: 25,
    features: [
      "Everything in Standard",
      "Premium matching algorithm",
      "25 matches per year",
      "VIP support 24/7",
      "Featured trip listings",
      "Analytics dashboard",
      "Early access to features",
    ],
  },
]

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Flexible Plans</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">Choose Your Adventure Level</h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Secure, flexible subscriptions that give you access to exclusive trips and matching features powered by
            SSLCommerz.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.plan}
                className={`rounded-lg border bg-card p-8 flex flex-col relative ${
                  plan.popular
                    ? "border-accent shadow-lg shadow-accent/20 md:scale-105"
                    : "border-border hover:border-accent/50"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price === 0 ? "Free" : `৳${plan.price}`}</span>
                    {plan.price > 0 && <span className="text-muted-foreground">/year</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.allowedMatches} matches per year</p>
                </div>

                <Link href="/signin" className="mb-6">
                  <Button
                    className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`}
                  >
                    {plan.price === 0 ? "Get Started" : "Subscribe Now"}
                  </Button>
                </Link>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-12">
            All plans include secure payment processing via SSLCommerz and 30-day money-back guarantee. Need help?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
