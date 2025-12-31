/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Your subscription has been activated successfully. You can now enjoy all the premium features.
        </p>

        <div className="space-y-3">
          <Link href="/dashboard" className="block">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Go to Dashboard
            </Button>
          </Link>

          <Link href="/dashboard/subscriptions" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              View Subscription Details
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          You will receive a confirmation email shortly.
        </p>
      </div>
    </div>
  );
}
