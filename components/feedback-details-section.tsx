import { useState } from "react";
import { FeedbackAISummarySection } from "./feedback-ai-summary";
function removeEmptyObjects(obj: { [x: string]: any; }) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  }
  return obj;
}

export const FeedbackDetailsSection = ({ feedback }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="relative">
      <div className="collapse collapse-plus border-base-300 bg-base-200 border">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Feedback</div>
        <div className="collapse-content text-xs overflow-scroll flex flex-row">
          <div className="flex-1">
            {feedback && Object.keys(feedback).map((skill: string, index: number) => {
              return (
                <div key={index}>
                  <strong>## {skill}:-</strong>
                  <div>
                    {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "expert") && (
                      <section id="expert">
                        <span>### Has expert knowledge in</span>
                        <ul>
                          {Object.keys(feedback[skill]).map(
                            (level: string, index: number) => {
                              if (feedback[skill][level] === "expert") {
                                return <li key={index}> - {level}</li>;
                              }
                            }
                          )}
                        </ul>
                      </section>
                    )}
                    {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "advanced") && (
                      <section id="advanced">
                        <span>### Has advanced knowledge in</span>
                        <ul>
                          {Object.keys(feedback[skill])?.map(
                            (level: string, index: number) => {
                              if (feedback[skill][level] === "advanced") {
                                return <li key={index}> - {level}</li>;
                              }
                            }
                          )}
                        </ul>
                      </section>
                    )}
                    {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "intermediate") && (
                      <section id="intermediate">
                        <span># Has intermediate knowledge in</span>
                        <ul>
                          {Object.keys(feedback[skill])?.map(
                            (level: string, index: number) => {
                              if (feedback[skill][level] === "intermediate") {
                                return <li key={index}> - {level}</li>;
                              }
                            }
                          )}
                        </ul>
                      </section>
                    )}
                    {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "novice") && (
                      <section id="novice">
                        <div>
                          <span>### Has novice knowledge in</span>
                          <ul>
                            {Object.keys(feedback[skill])?.map(
                              (level: string, index: number) => {
                                if (feedback[skill][level] === "novice") {
                                  return <li key={index}> - {level}</li>;
                                }
                              }
                            )}
                          </ul>
                        </div>
                      </section>
                    )}
                    {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "no") && (
                      <section id="no">
                        <span>### Has NO knowledge in</span>
                        <ul>
                          {Object.keys(feedback[skill])?.map(
                            (level: string, index: number) => {
                              if (feedback[skill][level] === "no") {
                                return <li key={index}> - {level}</li>;
                              }
                            }
                          )}
                        </ul>
                      </section>
                    )}
                  </div>
                  <hr className="divider" />
                </div>
              );
            })}
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
