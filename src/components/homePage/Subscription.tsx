import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { plans } from "../shared/constraints";

const SubscriptionSection = () => {
  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.plan}
              className={`relative flex flex-col rounded-lg border bg-card p-8 transition-all
                ${
                  plan.popular
                    ? "border-accent shadow-lg shadow-accent/20 md:scale-105"
                    : "border-border hover:border-accent/50"
                }
              `}
            >
              {/* POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* HEADER */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              {/* PRICE */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? "Free" : `৳${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/year</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.allowedMatches} matches per year
                </p>
              </div>

              {/* ACTION BUTTON */}
              <Button
                asChild
                className={`w-full mb-6 ${
                  plan.popular
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : ""
                }`}
              >
                <Link href="/signin">
                  {plan.price === 0 ? "Get Started" : "Subscribe Now"}
                </Link>
              </Button>

              {/* FEATURES */}
              <ul className="space-y-3">
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

        {/* FOOTER NOTE */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          All plans include secure payment processing via SSLCommerz and a
          30-day money-back guarantee. Need help?{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SubscriptionSection;
