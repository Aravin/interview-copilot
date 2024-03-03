export const FeedbackImprovementSection = ({ feedback }: any) => {
  return (
    <div>
      <div className="font-medium pl-2">Improvement</div>
      <div className="bg-base-200 p-2 m-2 text-xs">
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
                        return <>{f[1][value] === '1' && <li>- {value}</li> } </>
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
                        return <>{f[1][value] === '2' && <li>- {value}</li> } </>
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
  );
};
