"use client";
import {
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { PlanDisplay } from "@/components/layout/planDisplay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/layout/navbar";

export default function PlanPage() {
  const { isLoading, plan, generatePlan } = useApp();
  const router = useRouter();

  useEffect(() => {
    const profileId = localStorage.getItem("profileId");
    if (!profileId) {
      router.replace("/onboarding");
    }
  }, [router]);

  if (isLoading) return null; // or a spinner

  if (!plan) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-muted font-medium">No plan yet.</p>
        <Button onClick={generatePlan}>Generate Plan</Button>
      </div>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-foreground">
              Your Training Plan
            </h1>
            <p className="text-muted font-medium">
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>
          <Button variant="secondary" className="gap-2" onClick={generatePlan}>
            <RefreshCcw className="w-5 h-5 text-accent" />
            Regenerate Plan
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8  text-background">
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-background" />
            </div>
            <div>
              <p className="text-xl text-muted font-medium">Goal</p>
              <p className="font-medium text-sm text-cream">
                {plan.overview.goal}
              </p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl text-muted font-medium">Frequency</p>
              <p className="font-medium text-sm text-cream">
                {plan.overview.frequency}
              </p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-medium text-muted">Split</p>
              <p className="font-medium text-sm text-cream">
                {plan.overview.split}
              </p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-medium text-muted">Version</p>
              <p className="font-medium text-sm text-cream">{plan.version}</p>
            </div>
          </Card>
        </div>

        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-background">
            Workout Notes
          </h2>
          <p className="text-background font-medium text-xl leading-relaxed">
            {plan.overview.notes}
          </p>
        </Card>

        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-background">
            Progression Strategy
          </h2>
          <p className="text-background font-medium text-xl leading-relaxed">
            {plan.progression}
          </p>
        </Card>
      </div>
    </div>
  );
}
