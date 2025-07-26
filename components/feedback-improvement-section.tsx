import { useMemo } from "react";
import CopyButton from "./copy-button";
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const IMPROVEMENT_SECTIONS = [
  { level: "no", title: "No knowledge in following/Learn following:", headingLevel: "#" },
  { level: "novice", title: "Needs improvement in following:", headingLevel: "#" }
] as const;

export const FeedbackImprovementSection = ({ feedback }: any) => {
  const improvementData = useMemo(() => {
    if (!feedback || typeof feedback !== 'object') return [];
    
    return IMPROVEMENT_SECTIONS.map(({ level, title, headingLevel }) => {
      const skillsWithLevel = Object.entries(feedback)
        .filter(([_, skillData]: [string, any]) => 
          skillData && typeof skillData === 'object' && 
          Object.values(skillData).some((value) => {
            if (typeof value === 'string') {
              return value === level;
            } else if (value && typeof value === 'object' && 'level' in value) {
              return (value as any).level === level;
            }
            return false;
          })
        )
        .map(([skillName, skillData]: [string, any]) => {
          const questions = Object.entries(skillData)
            .filter(([_, value]) => {
              if (typeof value === 'string') {
                return value === level;
              } else if (value && typeof value === 'object' && 'level' in value) {
                return (value as any).level === level;
              }
              return false;
            })
            .map(([question, value]) => {
              if (typeof value === 'string') {
                return { question, comment: undefined };
              } else if (value && typeof value === 'object' && 'level' in value) {
                return { question, comment: (value as any).comment };
              }
              return { question, comment: undefined };
            });
          
          return questions.length > 0 ? { skillName, questions } : null;
        })
        .filter(Boolean);
      
      return skillsWithLevel.length > 0 ? { level, title, headingLevel, skillsWithLevel } : null;
    }).filter(Boolean);
  }, [feedback]);

  const formatImprovementSectionAsMarkdown = (section: any) => {
    let markdown = `${section.title}\n`;
    
    section.skillsWithLevel.forEach((skillData: any) => {
      markdown += `${section.headingLevel} ${skillData.skillName}\n`;
      skillData.questions.forEach((questionData: any) => {
        markdown += `- ${questionData.question}`;
        if (questionData.comment) {
          markdown += ` (Comment: ${questionData.comment})`;
        }
        markdown += `\n`;
      });
      markdown += `\n`;
    });
    
    return markdown;
  };

  return (
    <div className="collapse collapse-plus border-base-300 bg-base-200 border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Improvement</div>
      <div className="collapse-content text-xs overflow-auto">
        {improvementData.map((section: any, sectionIndex: number) => (
          <div key={`section-${sectionIndex}`}>
            <div className="flex items-center gap-2 group">
              <strong>{section.title}</strong>
              <CopyButton textToCopy={formatImprovementSectionAsMarkdown(section)} />
            </div>
            {section.skillsWithLevel.map((skillData: any, skillIndex: number) => (
              <div key={`${sectionIndex}-${skillIndex}`}>
                <span>{section.headingLevel} {skillData.skillName}</span>
                <ul>
                  {skillData.questions.map((questionData: any, questionIndex: number) => (
                    <li key={`${sectionIndex}-${skillIndex}-${questionIndex}`}>
                      - {questionData.question}
                      {questionData.comment && (
                        <span 
                          className="text-blue-600 text-xs ml-2 cursor-help" 
                          title={questionData.comment}
                        >
                          <ChatBubbleLeftRightIcon className="w-3 h-3 inline" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {sectionIndex < improvementData.length - 1 && <hr className="divider" />}
          </div>
        ))}
      </div>
    </div>
  );
};
