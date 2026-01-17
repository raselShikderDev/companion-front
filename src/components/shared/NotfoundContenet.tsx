/** biome-ignore-all assist/source/organizeImports: > */
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="scale-in">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-destructive/10 pulse-scale" />
            <div className="relative z-10 flex h-48 w-48 items-center justify-center">
              <h1 className="text-8xl font-bold text-primary">404</h1>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" variant="ghost" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
