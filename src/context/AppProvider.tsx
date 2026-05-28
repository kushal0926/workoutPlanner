"use client";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import { UserProfileForm, TrainingPlan } from "@/types";
import { api } from "@/lib/api";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isRefreshingRef = useRef(false);

  const refreshPlan = useCallback(async (profileId: string) => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    try {
      const planData = await api.getCurrentPlan(profileId).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          profileId: planData.profileId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      }
    } finally {
      isRefreshingRef.current = false;
    }
  }, []);

  async function saveProfile(profileData: UserProfileForm) {
    setIsLoading(true);
    try {
      const { profileId } = await api.saveProfile(profileData);
      localStorage.setItem("profileId", profileId);
      return profileId;
    } catch (err) {
      console.error("Error saving profile:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function generatePlan() {
    const profileId = localStorage.getItem("profileId");
    if (!profileId)
      throw new Error("No profile found. Complete onboarding first.");
    setIsLoading(true);
    try {
      await api.generatePlan(profileId);
      await refreshPlan(profileId);
    } catch (err) {
      console.error("Error generating plan:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppContext.Provider value={{ plan, isLoading, saveProfile, generatePlan }}>
      {children}
    </AppContext.Provider>
  );
};
