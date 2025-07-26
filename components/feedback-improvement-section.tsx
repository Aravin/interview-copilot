import { useMemo } from "react";

const IMPROVEMENT_SECTIONS = [
  { level: "no", title: "No knowledge in following/Learn following:", headingLevel: "####" },
  { level: "novice", title: "Needs improvement in following:", headingLevel: "###" }
] as const;

export const FeedbackImprovementSection = ({ feedback }: any) => {
  // Memoize the processed improvement data to avoid recalculating on every render
  const improvementData = useMemo(() => {
    if (!feedback || typeof feedback !== 'object') return [];
    
    return IMPROVEMENT_SECTIONS.map(({ level, title, headingLevel }) => {
      const skillsWithLevel = Object.entries(feedback)
        .filter(([_, skillData]: [string, any]) => 
          skillData && typeof skillData === 'object' && 
          Object.values(skillData).some((value) => value === level)
        )
        .map(([skillName, skillData]: [string, any]) => {
          const questions = Object.entries(skillData)
            .filter(([_, value]) => value === level)
            .map(([question]) => question);
          
          return questions.length > 0 ? { skillName, questions } : null;
        })
        .filter(Boolean);
      
      return skillsWithLevel.length > 0 ? { level, title, headingLevel, skillsWithLevel } : null;
    }).filter(Boolean);
  }, [feedback]);

  return (
    <div className="collapse collapse-plus border-base-300 bg-base-200 border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Improvement</div>
      <div className="collapse-content text-xs overflow-auto mt-4 mb-4">
        {improvementData.map((section: any, sectionIndex: number) => (
          <div key={`section-${sectionIndex}`}>
            <strong>{section.title}</strong>
            {section.skillsWithLevel.map((skillData: any, skillIndex: number) => (
              <div key={`${sectionIndex}-${skillIndex}`}>
                <span>{section.headingLevel} {skillData.skillName}</span>
                <ul>
                  {skillData.questions.map((question: string, questionIndex: number) => (
                    <li key={`${sectionIndex}-${skillIndex}-${questionIndex}`}>- {question}</li>
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
