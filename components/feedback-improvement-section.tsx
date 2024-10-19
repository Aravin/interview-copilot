import { useState } from "react";
import { FeedbackAISummarySection } from "./feedback-ai-summary";

export const FeedbackImprovementSection = ({ feedback }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="collapse collapse-plus border-base-300 bg-base-200 border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Improvement</div>
      <div className="collapse-content text-xs overflow-auto">
        <div>
          {
            isModalOpen && <FeedbackAISummarySection close={toggleModal} feedback={JSON.stringify(feedback)} />
          }
          <div className="font-medium pl-2 flex flex-row justify-between">
            <span>Improvement</span>
            <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>Generate Feedback</button>
          </div>

          <div>
            <span>## No knowledge in following/Learn following:</span><br /><br />
            {
              Object.entries(feedback).map((f: any, index: number) => {
                let skills = [];
                if (Object.values(f[1]).some((_) => _ === '1')) {
                  skills.push(f[0]);
                }

                return skills.map((value, index) => {
                  return <>
                    <span># {value}</span>
                    <ul>
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
            <br />
            <span>## Needs improvement in following:</span><br /><br />
            {
              Object.entries(feedback).map((f: any, index: number) => {
                let skills = [];
                if (Object.values(f[1]).some((_) => _ === '2')) {
                  skills.push(f[0]);
                }

                return skills.map((value, index) => {
                  return <>
                    <span># {value}</span>
                    <ul>
                      {
                        Object.keys(f[1]).map((value: string, index: number) => {
                          return <>{f[1][value] === '2' && <li>- {value}</li>} </>
                        })
                      }

                    </ul>
                    <br />
                  </>
                })
              })
            }
          </div>
          <br />
        </div>
      </div>
    </div>
  );

};
