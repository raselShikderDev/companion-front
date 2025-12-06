
import { Mail, Phone, MapPin, } from "lucide-react"
import { Card } from "@/components/ui/card"
import ContactForm from "@/components/contactPage/ContactForm"

export default function ContactPage() {
 

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
     <ContactForm/>

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
