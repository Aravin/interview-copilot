interface SkillLevels {
  [level: string]: "1" | "2" | "3" | "4" | "5";
}

export interface FeedbackData {
  [skillCategory: string]:
  | SkillLevels // For skills directly under the category
  | { [framework: string]: SkillLevels }; // For nested frameworks 
}
