import { useState, useMemo } from "react";
import { FeedbackAISummarySection } from "./feedback-ai-summary";
import CopyButton from "./copy-button";
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

function removeEmptyObjects(obj: { [x: string]: any; }) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  }
  return obj;
}

const SKILL_LEVELS = [
  { level: "expert", title: "Has expert knowledge in" },
  { level: "advanced", title: "Has advanced knowledge in" },
  { level: "intermediate", title: "Has intermediate knowledge in" },
  { level: "novice", title: "Has novice knowledge in" },
  { level: "no", title: "Has NO knowledge in" }
] as const;

export const FeedbackDetailsSection = ({ feedback }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const processedFeedback = useMemo(() => {
    if (!feedback || typeof feedback !== 'object') return [];
    
    return Object.entries(feedback).map(([skill, skillData]: [string, any]) => {
      if (!skillData || typeof skillData !== 'object') return null;
      
      const skillLevels = SKILL_LEVELS.map(({ level, title }) => {
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
        
        return questions.length > 0 ? { level, title, questions } : null;
      }).filter(Boolean);
      
      return skillLevels.length > 0 ? { skill, skillLevels } : null;
    }).filter(Boolean);
  }, [feedback]);

  const formatSkillAsMarkdown = (skillData: any) => {
    let markdown = `# ${skillData.skill}:-\n`;
    
    skillData.skillLevels.forEach((levelData: any) => {
      markdown += `## ${levelData.title}\n`;
      levelData.questions.forEach((questionData: any) => {
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
    <div className="relative">
      <div className="collapse collapse-plus border-base-300 bg-base-200 border">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Feedback</div>
        <div className="collapse-content text-xs overflow-scroll flex flex-row">
          <div className="flex-1">
            {processedFeedback.map((skillData: any, skillIndex: number) => (
              <div key={`skill-${skillIndex}`}>
                <div className="flex items-center gap-2 group">
                  <strong># {skillData.skill}:-</strong>
                  <CopyButton textToCopy={formatSkillAsMarkdown(skillData)} />
                </div>
                <div>
                    {skillData.skillLevels.map((levelData: any, levelIndex: number) => (
                      <section key={`${skillIndex}-${levelIndex}`} id={levelData.level}>
                        <span>## {levelData.title}</span>
                      <ul>
                        {levelData.questions.map((questionData: any, questionIndex: number) => (
                          <li key={`${skillIndex}-${levelIndex}-${questionIndex}`}>
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
                    </section>
                  ))}
                </div>
                <hr className="divider" />
              </div>
            ))}
          </div>
          <div>
            {isModalOpen && <FeedbackAISummarySection close={toggleModal} feedback={JSON.stringify(removeEmptyObjects(feedback))} />}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          className="btn btn-primary btn-circle shadow-lg" 
          onClick={toggleModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
