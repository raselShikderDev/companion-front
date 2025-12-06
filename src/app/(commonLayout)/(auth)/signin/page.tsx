
import Link from "next/link";

import LoginForm from "@/components/authentications/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Hero Text */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-3">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-lg">
              Sign in to your account and continue your adventure
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
