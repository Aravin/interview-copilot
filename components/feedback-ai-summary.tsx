import { useState } from "react";
import ReactMarkdown from "react-markdown";

type FeedbackAISummarySectionProps = {
  close: () => void;
  feedback: string;
};

export const FeedbackAISummarySection = (props: FeedbackAISummarySectionProps) => {

  let aiPrompt = `You are a helpful AI assistant designed to provide insightful feedback on technical skills assessments. Based on the following data, which represents a candidate's scores in various technical areas, generate a comprehensive summary and actionable recommendations:

      ${props.feedback}
  
     Output Format:

## Summary

Strengths: [List the candidate's strongest areas based on high scores.]

Weaknesses: [List areas where the candidate scored low and needs improvement.]

## Recommendations

For each identified weakness, provide the following:

Area for Improvement: [Clearly state the specific skill or topic needing improvement.]

Learning Resources: [Suggest relevant and accessible resources (e.g., online courses, tutorials, documentation) that directly address the weakness.]

Additional Tips: [Offer any other helpful advice, such as practice exercises or projects.]
  
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
      console.log({data});
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
