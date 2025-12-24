/** biome-ignore-all assist/source/organizeImports: > */
import SignUpForm from "@/components/authentications/SignUpForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Hero Text */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-3">
              Join the Adventure
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your account and start connecting with travelers worldwide
            </p>
          </div>

          {/* Signup Form */}
          <SignUpForm />
          {/* Sign In Link */}
          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
