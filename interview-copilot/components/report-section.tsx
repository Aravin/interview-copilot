import { useEffect, useState } from "react";

export const ReportSection = () => {
  const [q, setQ] = useState(JSON.parse(localStorage.getItem("ic") || "{}"));

  useEffect(() => {
    window.addEventListener("feedback.updated", updateFeedback, false);
  }, []);

  const updateFeedback = () =>
    setQ(JSON.parse(localStorage.getItem("ic") || "{}"));

  return (
    <div>
      <div className="font-medium">Feedback</div>
      <div className="bg-base-200 p-2 m-2 text-xs">
        {Object.keys(q).map((skill: string, index: number) => {
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
                <hr />
                {Object.keys(q[skill]).find((_) => q[skill][_] === "4") && (
                  <section id="expert">
                    <p>Has expert knowledge in</p>
                    <ul>
                      {Object.keys(q[skill]).map(
                        (level: string, index: number) => {
                          if (q[skill][level] === "4") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                    <br />
                  </section>
                )}
                {Object.keys(q[skill]).find((_) => q[skill][_] === "3") && (
                  <section id="advanced">
                    <p>Has advanced knowledge in</p>
                    <ul>
                      {Object.keys(q[skill])?.map(
                        (level: string, index: number) => {
                          if (q[skill][level] === "3") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                    <br />
                  </section>
                )}
                {Object.keys(q[skill]).find((_) => q[skill][_] === "2") && (
                  <section id="intermediate">
                    <p>Has intermediate knowledge in</p>
                    <ul>
                      {Object.keys(q[skill])?.map(
                        (level: string, index: number) => {
                          if (q[skill][level] === "2") {
                            return <li key={index}> - {level}</li>;
                          }
                        }
                      )}
                    </ul>
                    <br />
                  </section>
                )}
                {Object.keys(q[skill]).find((_) => q[skill][_] === "1") && (
                  <section id="novice">
                    <div>
                      <p>Has novice knowledge in</p>
                      <ul>
                        {Object.keys(q[skill])?.map(
                          (level: string, index: number) => {
                            if (q[skill][level] === "1") {
                              return <li key={index}> - {level}</li>;
                            }
                          }
                        )}
                      </ul>
                      <br />
                    </div>
                  </section>
                )}
                {Object.keys(q[skill]).find((_) => q[skill][_] === "0") && (
                  <section id="no">
                    <p>Has NO knowledge in</p>
                    <ul>
                      {Object.keys(q[skill])?.map(
                        (level: string, index: number) => {
                          if (q[skill][level] === "0") {
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
