export const FeedbackDetailsSection = ({ feedback }: any) => {

  return (
    <div>
      <div className="font-medium pl-2">Feedback</div>
      <div className="bg-base-200 p-2 m-2 text-xs">
        {feedback && Object.keys(feedback).map((skill: string, index: number) => {
          return (
            <div key={index}>
              <p>
                <strong>{skill}:-</strong>
              </p>
              <p>
                <strong>------------</strong>
              </p>
              <br />
              <div>
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "5") && (
                  <section id="expert">
                    <span># Has expert knowledge in</span>
                    <ul>
                      {Object.keys(feedback[skill]).map(
                        (level: string, index: number) => {
                          if (feedback[skill][level] === "5") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                    <br />
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "4") && (
                  <section id="advanced">
                    <span># Has advanced knowledge in</span>
                    <ul>
                      {Object.keys(feedback[skill])?.map(
                        (level: string, index: number) => {
                          if (feedback[skill][level] === "4") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                    <br />
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
                    <br />
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "2") && (
                  <section id="novice">
                    <div>
                      <span># Has novice knowledge in</span>
                      <ul>
                        {Object.keys(feedback[skill])?.map(
                          (level: string, index: number) => {
                            if (feedback[skill][level] === "2") {
                              return <li key={index}> - {level}</li>;
                            }
                          }
                        )}
                      </ul>
                      <br />
                    </div>
                  </section>
                )}
                {Object.keys(feedback[skill]).find((_) => feedback[skill][_] === "1") && (
                  <section id="no">
                    <span># Has NO knowledge in</span>
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
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};
