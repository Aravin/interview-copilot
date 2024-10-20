export const FeedbackImprovementSection = ({ feedback }: any) => {

  return (
    <div className="collapse collapse-plus border-base-300 bg-base-200 border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Improvement</div>
      <div className="collapse-content text-xs overflow-auto mt-4 mb-4">
        <strong>## No knowledge in following/Learn following:</strong>
        {
          Object.entries(feedback).map((f: any, index: number) => {
            let skills = [];
            if (Object.values(f[1]).some((_) => _ === 'no')) {
              skills.push(f[0]);
            }

            return skills.map((value, index) => {
              return <>
                <span>#### {value}</span>
                <ul key={index}>
                  {
                    Object.keys(f[1]).map((value: string, index: number) => {
                      return <>{f[1][value] === 'no' && <li>- {value}</li>} </>
                    })
                  }

                </ul>              </>
            })
          })
        }
        <hr className="divider" />
        <strong>## Needs improvement in following:</strong>
        {
          Object.entries(feedback).map((f: any, index: number) => {
            let skills = [];
            if (Object.values(f[1]).some((_) => _ === 'novice')) {
              skills.push(f[0]);
            }

            return skills.map((value, index) => {
              return <>
                <span>### {value}</span>
                <ul>
                  {
                    Object.keys(f[1]).map((value: string, index: number) => {
                      return <>{f[1][value] === 'novice' && <li>- {value}</li>} </>
                    })
                  }
                </ul>
              </>
            })
          })
        }
      </div>
    </div>
  );

};
