/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import { getMySubscription } from "@/services/subscription/subscription.service"
import { SubscribeButton } from "@/components/explorer/subscrptions/SubscribeButton"
import { SubscriptionPlan } from "@/types/enum.interface"
import { getUserInfo } from "@/services/auth/getUserInfo"

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

export default async function DashboardSubscriptionsPage() {
  const currentSubscription = await getMySubscription()
  const user = await getUserInfo()
  console.log({
    currentSubscription,
    user,
  });
  
console.log({currentSubscription});

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Current Plan Banner */}
      {currentSubscription && (
        <div className="mb-8 p-6 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Your Current Plan</h2>
                <Badge className="bg-accent text-accent-foreground">{currentSubscription.planName}</Badge>
                {currentSubscription.isActive && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Valid until{" "}
                {new Date(currentSubscription.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {currentSubscription.planName === "FREE" && (
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Upgrade to unlock more features</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-balance mb-4">
          {currentSubscription ? "Upgrade Your Plan" : "Choose Your Plan"}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Select the perfect plan for your travel needs. Secure payments powered by SSLCommerz.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = currentSubscription?.planName === plan.plan

          return (
            <div
              key={plan.plan}
              className={`rounded-lg border bg-card p-8 flex flex-col relative ${
                plan.popular ? "border-accent shadow-lg shadow-accent/20 md:scale-105" : "border-border"
              } ${isCurrentPlan ? "ring-2 ring-accent" : ""} transition-all`}
            >
              {plan.popular && !isCurrentPlan && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Current Plan
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

              <SubscribeButton
                plan={plan.plan as SubscriptionPlan}
                isCurrentPlan={isCurrentPlan}
                isFree={plan.price === 0}
              />

              <ul className="space-y-3 flex-1 mt-6">
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
          )
        })}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-12">
        All payments are processed securely through SSLCommerz. Need help with your subscription?{" "}
        <a href="mailto:support@travelmatch.com" className="text-accent hover:underline">
          Contact support
        </a>
      </p>
    </div>
  )
}






// /** biome-ignore-all assist/source/organizeImports: > */
// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Check } from "lucide-react"

// export default function Subscriptions() {
//   const plans = [
//     {
//       name: "Explorer",
//       price: "Free",
//       description: "Perfect for getting started",
//       features: ["Browse available trips", "View 5 matches per month", "Basic profile", "Community reviews access"],
//       highlighted: false,
//     },
//     {
//       name: "Adventurer",
//       price: "$9.99",
//       period: "/month",
//       description: "For the travel enthusiast",
//       features: [
//         "Everything in Explorer",
//         "Unlimited match browsing",
//         "Advanced matching algorithm",
//         "Priority trip listings",
//         "Early booking access",
//         "Message other explorers",
//         "Trip planning tools",
//       ],
//       highlighted: true,
//     },
//     {
//       name: "Globetrotter",
//       price: "$24.99",
//       period: "/month",
//       description: "For serious travelers",
//       features: [
//         "Everything in Adventurer",
//         "VIP support",
//         "Exclusive trips access",
//         "Trip insurance included",
//         "Flexible cancellation",
//         "Dedicated travel advisor",
//         "Custom itineraries",
//         "Rewards program",
//       ],
//       highlighted: false,
//     },
//   ]

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
//         <p className="text-lg text-muted-foreground">Unlock premium features and enhance your travel experience</p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         {plans.map((plan, index) => (
//           <Card
//             key={index}
//             className={`flex flex-col transition-all ${
//               plan.highlighted ? "border-2 border-accent md:scale-105" : "border"
//             }`}
//           >
//             {plan.highlighted && (
//               <div className="px-6 pt-4">
//                 <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
//               </div>
//             )}
//             <CardHeader>
//               <CardTitle>{plan.name}</CardTitle>
//               <CardDescription>{plan.description}</CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 flex flex-col">
//               <div className="mb-6">
//                 <span className="text-4xl font-bold text-primary">{plan.price}</span>
//                 {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
//               </div>

//               <div className="space-y-3 mb-6 flex-1">
//                 {plan.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
//                     <span className="text-sm">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <Button
//                 className={`w-full ${
//                   plan.highlighted
//                     ? "bg-accent hover:bg-accent/90 text-accent-foreground"
//                     : "bg-primary hover:bg-primary/90 text-primary-foreground"
//                 }`}
//               >
//                 {plan.price === "Free" ? "Get Started" : "Subscribe Now"}
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-16 max-w-3xl mx-auto">
//         <Card>
//           <CardHeader>
//             <CardTitle>Frequently Asked Questions</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <p className="font-semibold mb-2">Can I cancel my subscription anytime?</p>
//               <p className="text-sm text-muted-foreground">
//                 Yes! Cancel anytime from your account settings. No questions asked.
//               </p>
//             </div>
//             <div>
//               <p className="font-semibold mb-2">Is there a trial period?</p>
//               <p className="text-sm text-muted-foreground">
//                 Yes, Adventurer and Globetrotter plans come with a 7-day free trial.
//               </p>
//             </div>
//             <div>
//               <p className="font-semibold mb-2">What payment methods do you accept?</p>
//               <p className="text-sm text-muted-foreground">
//                 We accept all major credit cards, PayPal, and digital wallets.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
