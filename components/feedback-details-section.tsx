import { useState, useMemo } from "react";
import { FeedbackAISummarySection } from "./feedback-ai-summary";

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

  // Memoize the processed feedback data to avoid recalculating on every render
  const processedFeedback = useMemo(() => {
    if (!feedback || typeof feedback !== 'object') return [];
    
    return Object.entries(feedback).map(([skill, skillData]: [string, any]) => {
      if (!skillData || typeof skillData !== 'object') return null;
      
      const skillLevels = SKILL_LEVELS.map(({ level, title }) => {
        const questions = Object.entries(skillData)
          .filter(([_, value]) => value === level)
          .map(([question]) => question);
        
        return questions.length > 0 ? { level, title, questions } : null;
      }).filter(Boolean);
      
      return skillLevels.length > 0 ? { skill, skillLevels } : null;
    }).filter(Boolean);
  }, [feedback]);

  return (
    <div className="relative">
      <div className="collapse collapse-plus border-base-300 bg-base-200 border">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Feedback</div>
        <div className="collapse-content text-xs overflow-scroll flex flex-row">
          <div className="flex-1">
            {processedFeedback.map((skillData: any, skillIndex: number) => (
                              <div key={`skill-${skillIndex}`}>
                  <strong># {skillData.skill}:-</strong>
                  <div>
                    {skillData.skillLevels.map((levelData: any, levelIndex: number) => (
                      <section key={`${skillIndex}-${levelIndex}`} id={levelData.level}>
                        <span>## {levelData.title}</span>
                      <ul>
                        {levelData.questions.map((question: string, questionIndex: number) => (
                          <li key={`${skillIndex}-${levelIndex}-${questionIndex}`}> - {question}</li>
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
      
      {/* Floating Summarize Button */}
      <button 
        className="fixed bottom-6 right-6 btn btn-primary btn-circle shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        onClick={toggleModal}
        title="Summarize Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>
    </div>
  )
};
