interface SkillLevels {
  [level: string]: "1" | "2" | "3" | "4" | "5";
}

interface QuestionData {
  level: "1" | "2" | "3" | "4" | "5";
  comment?: string;
}

export interface FeedbackData {
  [skillCategory: string]:
  | { [question: string]: QuestionData } // For questions with level and optional comment
  | { [framework: string]: { [question: string]: QuestionData } }; // For nested frameworks 
}
