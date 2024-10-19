import { FeedbackData } from "../types";

export const generateMarkdownFeedback = (feedback: FeedbackData) => {
  if (!feedback) return "";

  return Object.keys(feedback)
    .map((skill) => {
      let markdown = `## ${skill}:-\n`; // Skill heading

      for (let rating = 5; rating >= 1; rating--) {
        // Iterate through ratings in descending order
        const matchingLevels = Object.keys(feedback[skill]).filter(
          (level) => feedback[skill][level] === rating.toString()
        );

        if (matchingLevels.length > 0) {
          // Only add a section if there are matching levels
          markdown += `\n### ${getRatingDescription(rating)} in\n`; // Rating description
          markdown += matchingLevels.map((level) => `- ${level}`).join("\n") + "\n"; // List of levels
        }
      }

      return markdown;
    })
    .join("\n---\n"); // Join skills with horizontal rules
}

export const extractSkillsByRatingMarkdown = (
  feedback: Record<string, Record<string, string>>,
  targetRatings: string[] = ['1'] // Default to an array with rating '1'
): string => {
  const skillsByRating: { [rating: string]: { [skill: string]: string[] } } = {};

  // Group skills by rating
  for (const [skillCategory, levels] of Object.entries(feedback)) {
    for (const [level, rating] of Object.entries(levels)) {
      if (targetRatings.includes(rating)) { 
        if (!skillsByRating[rating]) {
          skillsByRating[rating] = {};
        }
        if (!skillsByRating[rating][skillCategory]) {
          skillsByRating[rating][skillCategory] = [];
        }
        skillsByRating[rating][skillCategory].push(level);
      }
    }
  }

  // Generate Markdown output
  let markdown = '';
  for (const targetRating of targetRatings) {
    if (skillsByRating[targetRating]) {
      markdown += `## ${getRatingDescription(parseInt(targetRating, 10))} in following:\n`;

      for (const [category, skills] of Object.entries(skillsByRating[targetRating])) {
        if (skills.length > 0) {
          markdown += `\n#### ${category}\n`;
          markdown += skills.map((skill) => `- ${skill}`).join('\n') + '\n';
        }
      }
    }
  }

  return markdown;
};

// Helper function for rating descriptions
const getRatingDescription = (rating: number) => {
  switch (rating) {
    case 5:
      return "Has expert knowledge";
    case 4:
      return "Has advanced knowledge";
    case 3:
      return "Has intermediate knowledge";
    case 2:
      return "Has novice knowledge";
    case 1:
      return "Has NO knowledge";
    default:
      return "";
  }
}
