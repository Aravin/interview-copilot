import { FeedbackData } from "../types";
import { useState } from "react";

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

// Safe localStorage utilities to prevent SSR errors
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  
  clear: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  },
  
  key: (index: number): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.key(index);
    }
    return null;
  },
  
  get length(): number {
    if (typeof window !== 'undefined') {
      return localStorage.length;
    }
    return 0;
  }
};

// Utility function to get JSON from localStorage safely
export const getLocalStorageJSON = (key: string, defaultValue: any = null): any => {
  try {
    const item = safeLocalStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error);
    return defaultValue;
  }
};

// Utility function to set JSON to localStorage safely
export const setLocalStorageJSON = (key: string, value: any): void => {
  try {
    safeLocalStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

// Hook for safely accessing localStorage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};
