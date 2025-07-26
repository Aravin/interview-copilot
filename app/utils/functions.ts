import { FeedbackData } from "../types";
import { useState } from "react";

export const generateMarkdownFeedback = (feedback: FeedbackData) => {
  if (!feedback) return "";

  return Object.keys(feedback)
    .map((skill) => {
      let markdown = `## ${skill}:-\n`;

      for (let rating = 5; rating >= 1; rating--) {
        const matchingLevels = Object.keys(feedback[skill]).filter(
          (level) => {
            const value = feedback[skill][level];
            if (typeof value === 'string') {
              return value === rating.toString();
            } else if (value && typeof value === 'object' && 'level' in value) {
              return (value as any).level === rating.toString();
            }
            return false;
          }
        );

        if (matchingLevels.length > 0) {
          markdown += `\n### ${getRatingDescription(rating)} in\n`;
          markdown += matchingLevels.map((level) => {
            const value = feedback[skill][level];
            let comment = '';
            if (value && typeof value === 'object' && 'comment' in value && (value as any).comment) {
              comment = ` (Comment: ${(value as any).comment})`;
            }
            return `- ${level}${comment}`;
          }).join("\n") + "\n";
        }
      }

      return markdown;
    })
    .join("\n---\n");
}

export const extractSkillsByRatingMarkdown = (
  feedback: Record<string, Record<string, any>>,
  targetRatings: string[] = ['1']
): string => {
  const skillsByRating: { [rating: string]: { [skill: string]: string[] } } = {};

  for (const [skillCategory, levels] of Object.entries(feedback)) {
    for (const [level, value] of Object.entries(levels)) {
      let rating: string;
      if (typeof value === 'string') {
        rating = value;
      } else if (value && typeof value === 'object' && 'level' in value) {
        rating = (value as any).level;
      } else {
        continue;
      }
      
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

function getRatingDescription(rating: number): string {
  const descriptions = [
    "No knowledge",
    "Novice",
    "Intermediate", 
    "Advanced",
    "Expert"
  ];
  return descriptions[rating - 1] || "Unknown";
}

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

export const getLocalStorageJSON = (key: string, defaultValue: any = null): any => {
  try {
    const item = safeLocalStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error);
    return defaultValue;
  }
};

export const setLocalStorageJSON = (key: string, value: any): void => {
  try {
    safeLocalStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

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
