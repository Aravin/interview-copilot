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
            <>
              <p>
                <strong>{skill}:-</strong>
              </p>
              <p>
                <strong>------------</strong>
              </p>
              <br />
              <div>
                <hr />
                <div>
                  <p>Has expert knowledge in</p>
                  <ul>
                    {Object.keys(q[skill]).map(
                      (level: string, index: number) => {
                        if (q[skill][level] === "100") {
                          return <li key={index}> - {level}</li>;
                        }
                      }
                    )}
                  </ul>
                  <br />
                </div>
                <p>Has advanced knowledge in</p>
                <ul>
                  {Object.keys(q[skill]).map((level: string, index: number) => {
                    if (q[skill][level] === "75") {
                      return <li key={index}> - {level}</li>;
                    }
                  })}
                </ul>
                <br />
                <p>Has intermediate knowledge in</p>
                <ul>
                  {Object.keys(q[skill]).map((level: string, index: number) => {
                    if (q[skill][level] === "50") {
                      return <li key={index}> - {level}</li>;
                    }
                  })}
                </ul>
                <br />
                <p>Has novice knowledge in</p>
                <ul>
                  {Object.keys(q[skill]).map((level: string, index: number) => {
                    if (q[skill][level] === "100") {
                      return <li key={index}> - {level}</li>;
                    }
                  })}
                </ul>
                <br />
                <p>Has NO knowledge in</p>
                <ul>
                  {Object.keys(q[skill]).map((level: string, index: number) => {
                    if (q[skill][level] === "0") {
                      return <li key={index}>{level}</li>;
                    }
                  })}
                </ul>
              </div>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
};
