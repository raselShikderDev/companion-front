/** biome-ignore-all assist/source/organizeImports: > */

import DashboardStats from "@/components/homePage/dashboard/DashboardStats"
import DashboardQuickLinks from "@/components/homePage/dashboard/DashboardQuickLinks"

export default function ExplorerDashboard() {


console.log("Ëxplorer dashboard")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back, Traveler! 👋</h1>
        <p className="text-lg text-muted-foreground">You have 2 upcoming trips and 3 new matches waiting for you</p>
      </div>

      <div>
        <DashboardStats />
      </div>
      <DashboardQuickLinks />

      {/* <div className="grid md:grid-cols-2 gap-6 mb-6">
        <UpcomingTrips/>

        <RecentMatchs/>
      </div> */}

      {/* <div className="grid md:grid-cols-2 gap-6">
     
        <SpendingSummery/>

      
       <RecentReviews/>
      </div> */}
    </div>
  )
}
