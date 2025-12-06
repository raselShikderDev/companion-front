import ReviewCard from "../ui/shared/reviewCard"

const RealTimeReview = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Community Stories
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
              Real Experiences from Real Travelers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Read authentic reviews and stories from travelers who've made
              unforgettable memories.
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
  )
}

export default RealTimeReview
