"use client";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { UserProfileForm } from "@/types";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

type Options = {
  value: string;
  label: string;
};

const goalOptions: Options[] = [
  { value: "bulk", label: "Build Muscle (Bulk)" },
  { value: "cut", label: "Lose Fat (Cut)" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "strength", label: "Build Strength" },
  { value: "endurance", label: "Improve Endurance" },
];

const experienceOptions: Options[] = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3+ years)" },
];

const daysOptions: Options[] = [
  { value: "2", label: "2 days per week" },
  { value: "3", label: "3 days per week" },
  { value: "4", label: "4 days per week" },
  { value: "5", label: "5 days per week" },
  { value: "6", label: "6 days per week" },
];

const sessionOptions: Options[] = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions: Options[] = [
  { value: "full_gym", label: "Full Gym Access" },
  { value: "home", label: "Home Gym" },
  { value: "dumbbells", label: "Dumbbells Only" },
];

const splitOptions: Options[] = [
  { value: "full_body", label: "Full Body" },
  { value: "upper_lower", label: "Upper/Lower Split" },
  { value: "ppl", label: "Push/Pull/Legs" },
  { value: "custom", label: "Let AI Decide" },
];

export default function Onboarding() {
  const { saveProfile, generatePlan } = useApp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    goal: "strength",
    experience: "beginner",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleQuestions(e: React.SubmitEvent) {
    e.preventDefault();

    const profile: UserProfileForm = {
      goal: formData.goal as UserProfileForm["goal"],
      experience: formData.experience as UserProfileForm["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as UserProfileForm["equipment"],
      injuries: formData.injuries || undefined,
      preferredSplit:
        formData.preferredSplit as UserProfileForm["preferredSplit"],
    };

    try {
      setIsGenerating(true);
      await saveProfile(profile);
      await generatePlan();
      router.push("/plan");
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error instanceof Error ? error.message : error,
      );
      setIsGenerating(false); // only reset on error, success navigates away
    }
  }
  return (
    <div>
      <div className="min-h-screen pb-10 px-7">
        <Navbar />
        <div className="max-w-xl mx-auto">
          {/* step 1 asking questions*/}
          {!isGenerating ? (
            <Card variant="bordered">
              <h1 className="text-2xl font-bold text-center text-background">
                Tell us about yourself
              </h1>
              <p className="text-background font-bold mb-6 text-center">
                Help us create the perfect plan for you.
              </p>
              <form onSubmit={handleQuestions} className="space-y-5">
                <Select
                  id="goal"
                  label="What's your primary goal?"
                  options={goalOptions}
                  value={formData.goal}
                  onChange={(e) => updateForm("goal", e.target.value)}
                />
                <Select
                  id="experience"
                  label="Training experience"
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={(e) => updateForm("experience", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    id="daysPerWeek"
                    label="Days per week"
                    options={daysOptions}
                    value={formData.daysPerWeek}
                    onChange={(e) => updateForm("daysPerWeek", e.target.value)}
                  />
                  <Select
                    id="sessionLength"
                    label="Session length"
                    options={sessionOptions}
                    value={formData.sessionLength}
                    onChange={(e) =>
                      updateForm("sessionLength", e.target.value)
                    }
                  />
                </div>
                <Select
                  id="equipment"
                  label="Equipment access"
                  options={equipmentOptions}
                  value={formData.equipment}
                  onChange={(e) => updateForm("equipment", e.target.value)}
                />

                <Select
                  id="preferredSplit"
                  label="Preferred training split"
                  options={splitOptions}
                  value={formData.preferredSplit}
                  onChange={(e) => updateForm("preferredSplit", e.target.value)}
                />

                <Textarea
                  id="injuries"
                  label="Any injuries or limitations? (optional)"
                  placeholder="E.g., lower back issues, shoulder impingement..."
                  rows={3}
                  value={formData.injuries}
                  onChange={(e) => updateForm("injuries", e.target.value)}
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    variant="secondary"
                  >
                    Generate My Plan <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card variant="bordered" className="text-center py-10">
              <Loader2 className="w-12 h-12 text-background mx-auto mb-6 animate-spin" />
              <h1 className="text-2xl font-bold mb-2 text-background">creating your plan</h1>
              <p className="text-background">
                {" "}
                building your personalized training program...
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
