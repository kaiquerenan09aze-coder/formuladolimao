 export type AppState = 'intro' | 'quiz' | 'calculating' | 'analysis' | 'result' | 'sales_page';

export interface UserData {
  age?: string;
  weightGoal?: string;
  bodyType?: string;
  targetArea?: string;
  name?: string;
  lifeImpact?: string;
  satisfaction?: string;
  obstacle?: string;
  currentWeight?: number;
  height?: number;
  desiredWeight?: number;
  activityLevel?: string;
  sleepHours?: string;
  waterIntake?: string;
}

export interface QuizStep {
  id: number;
  question: string;
  options?: { label: string; value: string; icon?: string }[];
  type: 'select' | 'input' | 'number' | 'image-grid';
  placeholder?: string;
  fieldName: keyof UserData;
}
