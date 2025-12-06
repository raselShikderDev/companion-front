/** biome-ignore-all assist/source/organizeImports: > */
"use client";
import { Button } from "@/components/ui/button";
import Hero from "@/components/homePage/hero";
import MatchingFeature from "@/components/homePage/matchingFeature";
import RealTimeReview from "@/components/homePage/RealTimeReview";
import TripsSection from "@/components/homePage/TripsSection";
import SubscriptionSection from "@/components/homePage/Subscription";
import ReadyBanner from "@/components/homePage/readyBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      {/* Curated Trips Section */}
      <TripsSection />

      {/* Smart Matching Section */}
      <MatchingFeature />

      {/* Real-Time Reviews Section */}
      <RealTimeReview />

      {/* Subscription Plans Section */}
      <SubscriptionSection />

      {/* CTA Section */}
      <ReadyBanner />
    </div>
  );
}
