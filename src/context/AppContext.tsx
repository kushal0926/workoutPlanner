"use client";
import { createContext, useContext } from "react";
import { TrainingPlan, UserProfileForm } from "@/types";

interface AppContextType {
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (profile: UserProfileForm) => Promise<string>;
  generatePlan: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
