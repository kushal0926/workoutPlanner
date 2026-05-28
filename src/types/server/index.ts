// types for the backend
export interface UserProfile {
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
  profileId: string;
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
