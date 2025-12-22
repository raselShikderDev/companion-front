/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
        </p>

        <div className="space-y-3">
          <Link href="/dashboard/subscriptions" className="block">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Try Again</Button>
          </Link>
          <Link href="/dashboard" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Return to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Common reasons for payment failure:</strong>
          </p>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>• Insufficient funds</li>
            <li>• Incorrect card details</li>
            <li>• Card not enabled for online transactions</li>
            <li>• Network connectivity issues</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Need help?{" "}
          <a href="mailto:support@travelmatch.com" className="text-accent hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
