import { useState } from "react";
import Markdown from 'react-markdown';

type FeedbackAISummarySectionProps = {
  close: () => void;
  feedback: string;
};

export const FeedbackAISummarySection = (props: FeedbackAISummarySectionProps) => {

  const aiPrompt = `
    Input:
    ${props.feedback}

    Input Instruction:
    Feedback is in JSON format,
      where first key is primary skill example: javascript, typescript etc
      nested key is topics such arrow function, closure etc
      final 1,2,3,4,5 represent no, novice, intermediate, advanced, expert knowledge respectively


    Expected Output Format:
    Markdown or Plain Text

    Expected Output:
    1. One or two paragraph of summary. Example: The candidate has novice knowledge in closure, and has intermediate knowledge in arrow function. 
    2. Section for learning material. Include zero or one learning material related for each lacking skill. Example: https://www.w3schools.com/js/js_function_closures.asp. No need to group the learning material keep in plain unordered list like * skill - link, * skill - link etc

    Example Output:
    
      ## Summary:
      The candidate demonstrates a strong understanding of JavaScript fundamentals, including object creation, object manipulation, and asynchronous programming. They possess intermediate knowledge of closure functions and generator functions. However, their understanding of Object.assign vs Object.create and mutable vs immutable concepts needs further development. In TypeScript, the candidate shows competency in basic concepts and configuring TypeScript environments. They have a basic grasp of cloud platform fundamentals and a good understanding of the DRY principle.

      ### Suggested Learning Resources:

      * closure - https://www.w3schools.com/js/js_function_closures.asp
      * arrow function - https://www.w3schools.com/js/js_arrow_functions.asp
   

    `;

  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateSummary = async () => {
    setIsLoading(true);
    const response = await fetch(`/interview/api`, {
      method: 'POST',
      body: aiPrompt
    });
    const data = await response.text();
    setSummary(data || 'Something went wrong, please try again.');
    setIsLoading(false);
  }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="ai-feedback-modal" className="modal modal-open">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={props.close}>✕</button>
          </form>
          <h3 className="font-bold text-lg">Feedback Summary</h3>
          {/* <p className="py-4">{props.feedback}</p> */}
          <button className="btn btn-secondary btn-sm" onClick={generateSummary} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Summary'}
          </button>
          {summary && <Markdown className="pt-4">{summary}</Markdown>}
        </div>
      </dialog>
    </>
  );
}
