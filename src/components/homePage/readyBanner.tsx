import { Button } from '../ui/button'

const ReadyBanner = () => {
  return (
     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-accent to-accent/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-accent-foreground text-balance mb-6">
            Ready to Travel Better?
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering the world together. Your
            next adventure is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
            >
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
  )
}

export default ReadyBanner
