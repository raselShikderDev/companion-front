import type { ReactNode } from "react"

interface MatchingFeatureProps {
  icon: ReactNode
  title: string
  description: string
}

export default function MatchingFeature({ icon, title, description }: MatchingFeatureProps) {
  return (
    <div className="p-8 rounded-lg border border-border hover:border-accent/50 transition-colors bg-background/50">
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
