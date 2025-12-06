import { Shield, Users, Zap } from "lucide-react";
import MatchingFeatureCard from "../shared/MatchingFeatureCard";

const matchingFeature = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            AI-Powered
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
            Smart Matching Technology
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Our algorithm learns your preferences to connect you with perfect
            travel companions and personalized experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MatchingFeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Instant Compatibility"
            description="Get matched with travelers who share your interests, travel style, and adventure level."
          />
          <MatchingFeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Real Connections"
            description="Connect with genuine travelers verified through our community and trusted review system."
          />
          <MatchingFeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Safety First"
            description="Every match is vetted with background checks and verified profiles for peace of mind."
          />
        </div>
      </div>
    </section>
  );
};

export default matchingFeature;
