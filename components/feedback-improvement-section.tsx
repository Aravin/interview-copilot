import { useState } from "react";
import { FeedbackAISummarySection } from "./feedback-ai-summary";
import { extractSkillsByRatingMarkdown } from "@/app/utils/functions";

export const FeedbackImprovementSection = ({ feedback }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="collapse collapse-plus border-base-300 bg-base-200 border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Improvement</div>
      <div className="collapse-content text-xs overflow-auto flex flex-row">
        <div className="flex-1">
          <strong>## No knowledge in following/Learn following:</strong>
          <div>
            {
              Object.entries(feedback).map((f: any, index: number) => {
                let skills = [];
                if (Object.values(f[1]).some((_) => _ === '1')) {
                  skills.push(f[0]);
                }

                return skills.map((value, index) => {
                  return <>
                    <span>#### {value}</span>
                    <ul key={index}>
                      {
                        Object.keys(f[1]).map((value: string, index: number) => {
                          return <>{f[1][value] === '1' && <li>- {value}</li>} </>
                        })
                      }

                    </ul>
                    <br />
                  </>
                })
              })
            }
          </div>
          <hr className="divider" />
          <strong>## Needs improvement in following:</strong>
          <div>
            {
              Object.entries(feedback).map((f: any, index: number) => {
                let skills = [];
                if (Object.values(f[1]).some((_) => _ === '2')) {
                  skills.push(f[0]);
                }

                return skills.map((value, index) => {
                  return <>
                    <span>### {value}</span>
                    <ul>
                      {
                        Object.keys(f[1]).map((value: string, index: number) => {
                          return <>{f[1][value] === '2' && <li>- {value}</li>} </>
                        })
                      }
                    </ul>
                  </>
                })
              })
            }
          </div>
          <br />
        </div>
        <div>
          <button className="btn btn-primary btn-sm" onClick={toggleModal}>
            Summarize
          </button>
          {
            isModalOpen && <FeedbackAISummarySection close={toggleModal} feedback={`${extractSkillsByRatingMarkdown(feedback, ['1', '2'])}`
            }
              template='improvement' />
          }
        </div>
      </div>
    </div>
  );

};
