import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-20 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8">
          <Zap className="w-4 h-4" />
          <span className="text-xl font-bold">AI-powered workout plans</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Your Perfect
          <br />
          <span className="text-muted">
            <mark>Workout Plan</mark>
          </span>{" "}
          in Seconds
        </h1>

        <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
          Stop guessing. Get a personalized training program built by AI,
          tailored to your goals, experience, and schedule.
        </p>

        <div className="flex flex-row gap-4 justify-center">
          <Link href="/onboarding">
            <button className="font-bold gap-2 flex border p-3 border-foreground hover:bg-foreground hover:text-background">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
