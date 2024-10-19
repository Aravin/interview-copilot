import { useState } from "react";
import { FeedbackAISummarySection } from "./feedback-ai-summary";
import { generateMarkdownFeedback } from "@/app/utils/functions";

export const FeedbackDetailsSection = ({ feedback }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
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
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "5") && (
                  <section id="expert">
                    <span>### Has expert knowledge in</span>
                    <ul>
                      {Object.keys(feedback[skill]).map(
                        (level: string, index: number) => {
                          if (feedback[skill][level] === "5") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "4") && (
                  <section id="advanced">
                    <span>### Has advanced knowledge in</span>
                    <ul>
                      {Object.keys(feedback[skill])?.map(
                        (level: string, index: number) => {
                          if (feedback[skill][level] === "4") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "3") && (
                  <section id="intermediate">
                    <span># Has intermediate knowledge in</span>
                    <ul>
                      {Object.keys(feedback[skill])?.map(
                        (level: string, index: number) => {
                          if (feedback[skill][level] === "3") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "2") && (
                  <section id="novice">
                    <div>
                      <span>### Has novice knowledge in</span>
                      <ul>
                        {Object.keys(feedback[skill])?.map(
                          (level: string, index: number) => {
                            if (feedback[skill][level] === "2") {
                              return <li key={index}> - {level}</li>;
                            }
                          }
                        )}
                      </ul>
                    </div>
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "1") && (
                  <section id="no">
                    <span>### Has NO knowledge in</span>
                    <ul>
                      {Object.keys(feedback[skill])?.map(
                        (level: string, index: number) => {
                          if (feedback[skill][level] === "1") {
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
        <div >
        <button className="btn btn-primary btn-sm" onClick={toggleModal}>
              Summarize
            </button>
            {
            isModalOpen && <FeedbackAISummarySection close={toggleModal} feedback={generateMarkdownFeedback(feedback)}  template='summary'/>
          }
        </div>
      </div>
    </div>
  )
};
