/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
/** biome-ignore-all assist/source/organizeImports: > */
import { IMyMatches } from "@/app/(dashboardLayout)/(explorerDashboardLayout)/dashboard/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users } from "lucide-react"
import Link from "next/link"

const RecentMatchs = ({matches}:{matches:IMyMatches[]}) => {
    console.log(matches);
    
    return (
        <Card className="border-2 border-border">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Recent Matches
                </CardTitle>
                <CardDescription>3 compatible travelers found</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {[
                    { name: "Alex Chen", match: 95, trip: "Paris & London", mutual: true },
                    { name: "Sarah Williams", match: 89, trip: "Greek Islands", mutual: false },
                    { name: "Marco Rossi", match: 92, trip: "Italy Tour", mutual: true },
                ].map((explorer, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <div>
                            <p className="font-medium text-foreground">{explorer.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <TrendingUp className="w-4 h-4" /> {explorer.match}% match • {explorer.trip}
                                {explorer.mutual && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">Mutual</span>
                                )}
                            </p>
                        </div>
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            Message
                        </Button>
                    </div>
                ))}
                <Link href="/explorer/matches">
                    <Button variant="outline" className="w-full bg-transparent">
                        View All Matches
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default RecentMatchs
