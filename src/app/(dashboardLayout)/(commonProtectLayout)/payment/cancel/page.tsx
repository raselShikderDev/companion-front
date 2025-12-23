/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          You have cancelled the payment process. No charges have been made to your account.
        </p>

        <div className="space-y-3">
          <Link href="/dashboard/subscriptions" className="block">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Choose a Different Plan
            </Button>
          </Link>
          <Link href="/dashboard" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Return to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Changed your mind? You can subscribe anytime from your dashboard.
        </p>
      </div>
    </div>
  )
}
