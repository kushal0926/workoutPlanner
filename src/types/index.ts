export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (profile: Omit<UserProfile, "userId" | "updatedAt">) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export interface UserProfile {
  userId: string;
  goal: "cut" | "bulk" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbbells";
  injuries?: string;
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
  updatedAt: string;
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
}


//  for the backend servers

export interface UserProfileServer {
  goal: string;
  experience: string;
  days_per_week: number;
  session_length: number;
  equipment: string;
  injuries?: string | null;
  preferred_split: string;
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
}

// --- Raw AI response types ---

export interface AIExercise {
  name?: string;
  sets?: number;
  reps?: string;
  rest?: string;
  rpe?: number;
  notes?: string;
  alternatives?: string[];
}

export interface AIDay {
  day?: string;
  focus?: string;
  exercises?: AIExercise[];
}

export interface AIOverview {
  goal?: string;
  frequency?: string;
  split?: string;
  notes?: string;
}

export interface AIResponse {
  overview?: AIOverview;
  weeklySchedule?: AIDay[];
  progression?: string;
}