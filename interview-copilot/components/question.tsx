import { useState } from "react";
import RangeInput from "./range-input";

export default function Question({
  id,
  question,
  level,
}: {
  id: string;
  question: string;
  level: string;
}) {
  console.log({ question, level });
  const [asked, setAsked] = useState(level ? true : false);
  const updatedAsked = (e: any) => {
    setAsked(!asked);
    console.log("asked statue ", asked);
    let q = JSON.parse(localStorage.getItem("ic") || "{}");
    console.log(q);
    if (!q[id]) {
      q[id] = {};
    }
    if (!q[id][question]) {
      q[id][question] = null;
    }
    q[id][question] = undefined;

    localStorage.setItem("ic", JSON.stringify(q));
    window.dispatchEvent(
      new Event("feedback.updated", { bubbles: false, cancelable: false })
    );
  };

  return (
    <div className="flex justify-items-start gap-8">
      <div className="basis-1/3">
        <label className="label cursor-pointer">
          <span className="label-text">{question}</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={asked}
            onChange={updatedAsked}
          />
        </label>
      </div>
      <div className="basis-2/3">
        {asked && (
          <RangeInput id={id} question={question} level={asked ? level : "0"} />
        )}
      </div>
    </div>
  );
}
