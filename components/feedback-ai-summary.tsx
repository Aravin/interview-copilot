import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type FeedbackAISummarySectionProps = {
  close: () => void;
  feedback: string;
};

export const FeedbackAISummarySection = (props: FeedbackAISummarySectionProps) => {

  let aiPrompt = `You are a technical skills assessment AI that provides focused, actionable feedback. Analyze the candidate's performance data and provide a structured response:

${props.feedback}

## Output Format (use exact headings):

### Strengths
- [List 2-3 strongest technical areas with scores]
- [Brief explanation of why these are strengths]
- [Include any relevant comments from the assessment]

### Weaknesses  
- [List 2-3 areas needing improvement with scores]
- [Brief explanation of impact on overall performance]
- [Include any relevant comments from the assessment]

### Learning Resources for Upskill

For each weakness identified above, provide:

**Skill: [Specific technical skill name]**
- **Learning Topics:** [3-5 specific topics to focus on]
- **Reference Sites:** [2-3 current, reliable learning platforms/resources]
- **Practice Projects:** [1-2 hands-on project suggestions]

**Requirements:**
- Only include current, actively maintained resources (2023-2024)
- Focus on free or affordable learning platforms
- Prioritize hands-on, practical learning over theory
- Include specific course names or documentation links when possible
- Keep recommendations concise and actionable
- Consider any specific comments or context provided in the assessment
`;

  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateSummary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/interview/api`, {
        method: 'POST',
        body: aiPrompt
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log({ data });
      
      if (data.response) {
        setSummary(data.response);
        setHasGenerated(true);
      } else {
        setSummary('Failed to get response from AI, please try again.');
      }

    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-generate summary when modal opens
  useEffect(() => {
    if (!hasGenerated && !isLoading) {
      generateSummary();
    }
  }, []);

  return (
    <>
      <dialog id="ai-feedback-modal" className="modal modal-open">
        <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={props.close}>✕</button>
          </form>
          <h3 className="font-bold text-lg">Feedback Summary</h3>
          
          {!summary && isLoading && (
            <div className="flex flex-col items-center justify-center mt-8 mb-4">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4 text-sm text-gray-600">Generating your personalized feedback summary...</p>
            </div>
          )}
          
          {summary && (
            <>
              <div className="flex flex-row justify-center mt-4 mb-4">
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={generateSummary} 
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : hasGenerated ? 'Re-generate Summary' : 'Generate Summary'}
                </button>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
