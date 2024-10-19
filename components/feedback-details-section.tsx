export const FeedbackDetailsSection = ({ feedback }: any) => {

  return (
    <div className="collapse collapse-plus border-base-300 bg-base-200 border">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Feedback</div>
      <div className="collapse-content text-xs overflow-scroll">
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
    </div>
  )
};
