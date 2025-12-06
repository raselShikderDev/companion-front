import { Button } from "../ui/button";

const SubscriptionSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Flexible Plans
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
            Choose Your Adventure Level
          </h2>
          <p className="text-muted-foreground text-lg">
            Secure, flexible subscriptions that give you access to exclusive
            trips and matching features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="rounded-lg border border-border bg-background p-8 hover:border-accent transition-colors">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-muted-foreground mb-6">For casual travelers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-6">
              Get Started
            </Button>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Browse curated trips</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Basic matching</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Limited matches</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-accent bg-background p-8 shadow-lg shadow-accent/20 relative md:scale-105">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2 mt-2">Standard</h3>
            <p className="text-muted-foreground mb-6">For active explorers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-6">
              Start Free Trial
            </Button>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Unlimited trips</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Advanced matching</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Unlimited matches</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Priority support</span>
              </li>
            </ul>
          </div>

          {/* Expedition Plan */}
          <div className="rounded-lg border border-border bg-background p-8 hover:border-accent transition-colors">
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-muted-foreground mb-6">
              For serious adventurers
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$79</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-6">
              Contact Sales
            </Button>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>All Adventurer features</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>VIP trip access</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Personal concierge</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                <span>Custom trips</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          All plans include secure payment processing and 30-day money-back
          guarantee.
        </p>
      </div>
    </section>
  );
};

export default SubscriptionSection;
