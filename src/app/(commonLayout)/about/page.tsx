/** biome-ignore-all assist/source/organizeImports: > */
import { Users, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "About Us - Wanderlust | Travel Connection Platform",
  description: "Learn about Wanderlust's mission to connect travelers and create unforgettable shared adventures.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-balance mb-6">
            Connecting Travelers, Creating <span className="text-accent">Memories</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wanderlust is revolutionizing travel by matching adventurers with like-minded companions and curating
            unforgettable experiences around the globe.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                We believe travel is more meaningful when shared with the right people. Our mission is to break down
                barriers to group travel by connecting adventurous souls who share common interests, values, and travel
                styles.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're building a platform where every traveler can find their tribe, discover authentic experiences, and
                create lifelong memories.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                We envision a world where travel transcends borders and solo travelers are never truly alone. Through
                intelligent matching and curated experiences, we're creating a global community of explorers united by
                curiosity and wanderlust.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                By 2030, Wanderlust will connect millions of travelers, facilitating thousands of trips and countless
                meaningful connections across every corner of the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-balance mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-border hover:border-accent transition-colors">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Connection First</h3>
              <p className="text-muted-foreground">
                Every decision we make prioritizes genuine human connections and meaningful relationships between
                travelers.
              </p>
            </Card>
            <Card className="p-8 border-border hover:border-accent transition-colors">
              <Heart className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Trust & Safety</h3>
              <p className="text-muted-foreground">
                Your safety and security are paramount. We implement rigorous verification and moderation to ensure a
                trustworthy community.
              </p>
            </Card>
            <Card className="p-8 border-border hover:border-accent transition-colors">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously push boundaries with AI-powered matching, real-time reviews, and seamless booking
                experiences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50K+</div>
              <p className="text-muted-foreground">Active Travelers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10K+</div>
              <p className="text-muted-foreground">Completed Trips</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">150+</div>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-balance mb-16">Our Team</h2>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Founded by passionate travelers and tech innovators, Wanderlust is driven by a team that lives and breathes
            adventure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-accent to-accent/50 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
              <p className="text-accent text-sm mb-2">CEO & Co-founder</p>
              <p className="text-muted-foreground text-sm">
                Travel photographer turned entrepreneur with 15+ years in tourism industry.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-accent to-accent/50 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Marcus Chen</h3>
              <p className="text-accent text-sm mb-2">CTO & Co-founder</p>
              <p className="text-muted-foreground text-sm">
                AI & machine learning expert who built recommendation systems at major tech companies.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-accent to-accent/50 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Emma Rodriguez</h3>
              <p className="text-accent text-sm mb-2">Head of Community</p>
              <p className="text-muted-foreground text-sm">
                Passionate about building communities that span continents and cultures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-balance mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your next adventure with Wanderlust today and connect with travelers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Exploring
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
              View Our Blog
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
