import { useState } from "react";
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

### Weaknesses  
- [List 2-3 areas needing improvement with scores]
- [Brief explanation of impact on overall performance]

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
`;

  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

      const data = await response.text();
      console.log({ data });
      setSummary(data || 'Failed to response from AI, please try again.');

    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <dialog id="ai-feedback-modal" className="modal modal-open">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={props.close}>✕</button>
          </form>
          <h3 className="font-bold text-lg">Feedback Summary</h3>
          <div className="flex flex-row justify-center mt-8 mb-4">
            <button className="btn btn-secondary btn-sm" onClick={generateSummary} disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </button>
          </div>
          {summary && <ReactMarkdown className="pt-4 prose">{summary}</ReactMarkdown>}
        </div>
      </dialog>
    </>
  );
}
