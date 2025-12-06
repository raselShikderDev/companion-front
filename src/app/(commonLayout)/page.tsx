/** biome-ignore-all assist/source/organizeImports: > */
"use client"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/shared/header"
import Hero from "@/components/ui/shared/hero"
import TripCard from "@/components/ui/shared/tripCard"
import MatchingFeature from "@/components/ui/shared/matchingFeature"
import ReviewCard from "@/components/ui/shared/reviewCard"
import Footer from "@/components/ui/shared/footer"
import { ChevronRight, Shield, Users, Zap } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />

      {/* Curated Trips Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Explore Destinations</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Curated Trips for Every Traveler</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Handpicked experiences designed by travel experts, matching your style and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TripCard
              image="/tropical-beach-island-getaway.png"
              destination="Bali, Indonesia"
              title="Tropical Paradise Escape"
              duration="7 days"
              price="$1,299"
              rating={4.8}
              travelers={24}
              tags={["Beach", "Adventure", "Culture"]}
            />
            <TripCard
              image="/alpine-mountain-hiking-adventure.png"
              destination="Swiss Alps"
              title="Alpine Mountain Expedition"
              duration="5 days"
              price="$1,599"
              rating={4.9}
              travelers={18}
              tags={["Hiking", "Nature", "Photography"]}
            />
            <TripCard
              image="/ancient-temple-historic-city-tour.png"
              destination="Kyoto, Japan"
              title="Ancient Temple Discovery"
              duration="6 days"
              price="$1,199"
              rating={4.7}
              travelers={32}
              tags={["Culture", "History", "Food"]}
            />
            <TripCard
              image="/safari-wildlife-savanna-africa.png"
              destination="Serengeti, Tanzania"
              title="Wildlife Safari Adventure"
              duration="8 days"
              price="$2,099"
              rating={4.9}
              travelers={12}
              tags={["Safari", "Wildlife", "Photography"]}
            />
            <TripCard
              image="/colorful-street-art-urban-exploration.png"
              destination="Buenos Aires, Argentina"
              title="Urban Culture Immersion"
              duration="4 days"
              price="$899"
              rating={4.6}
              travelers={28}
              tags={["Culture", "Food", "Nightlife"]}
            />
            <TripCard
              image="/northern-lights-iceland-aurora.png"
              destination="Iceland"
              title="Northern Lights Quest"
              duration="5 days"
              price="$1,799"
              rating={5.0}
              travelers={16}
              tags={["Adventure", "Nature", "Photography"]}
            />
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              View All Trips <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Smart Matching Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">AI-Powered</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Smart Matching Technology</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Our algorithm learns your preferences to connect you with perfect travel companions and personalized
              experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MatchingFeature
              icon={<Zap className="w-6 h-6" />}
              title="Instant Compatibility"
              description="Get matched with travelers who share your interests, travel style, and adventure level."
            />
            <MatchingFeature
              icon={<Users className="w-6 h-6" />}
              title="Real Connections"
              description="Connect with genuine travelers verified through our community and trusted review system."
            />
            <MatchingFeature
              icon={<Shield className="w-6 h-6" />}
              title="Safety First"
              description="Every match is vetted with background checks and verified profiles for peace of mind."
            />
          </div>
        </div>
      </section>

      {/* Real-Time Reviews Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Community Stories</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Real Experiences from Real Travelers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Read authentic reviews and stories from travelers who've made unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard
              author="Sarah Mitchell"
              location="Bali Trip"
              rating={5}
              date="2 weeks ago"
              review="The most incredible experience of my life! The trip coordinator was amazing, and I met people who are now lifelong friends. Can't wait to book the next adventure."
              avatar="/diverse-woman-avatar.png"
            />
            <ReviewCard
              author="James Chen"
              location="Alpine Expedition"
              rating={4.8}
              date="1 month ago"
              review="Perfectly organized. The hiking routes were stunning and the group dynamics were fantastic. Everyone was respectful and supportive. Highly recommend!"
              avatar="/man-avatar.png"
            />
            <ReviewCard
              author="Emma Rodriguez"
              location="Northern Lights"
              rating={5}
              date="3 weeks ago"
              review="Dreams do come true! The northern lights were magical, but what made it special was sharing the moment with amazing people. Pure magic from start to finish."
              avatar="/diverse-woman-avatar.png"
            />
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Flexible Plans</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Choose Your Adventure Level</h2>
            <p className="text-muted-foreground text-lg">
              Secure, flexible subscriptions that give you access to exclusive trips and matching features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Explorer Plan */}
            <div className="rounded-lg border border-border bg-background p-8 hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold mb-2">Explorer</h3>
              <p className="text-muted-foreground mb-6">For casual travelers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-6">Get Started</Button>
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

            {/* Adventurer Plan - Featured */}
            <div className="rounded-lg border-2 border-accent bg-background p-8 shadow-lg shadow-accent/20 relative md:scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-2">Adventurer</h3>
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
              <h3 className="text-2xl font-bold mb-2">Expedition</h3>
              <p className="text-muted-foreground mb-6">For serious adventurers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-6">Contact Sales</Button>
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
            All plans include secure payment processing and 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-accent to-accent/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-accent-foreground text-balance mb-6">
            Ready to Travel Better?
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering the world together. Your next adventure is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
