import { useEffect, useState } from "react";
import RangeInput from "./range-input";
import { useSearchParams } from "next/navigation";
import CopyButton from "./copy-button";

export default function Question({
  id,
  question,
  level,
}: {
  id: string;
  question: string;
  level: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const interviewId = useSearchParams().get("id");
  const [asked, setAsked] = useState(level ? true : false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  const updatedAsked = (e: any) => {
    setAsked(!asked);

    if (isClient) {
      let q = JSON.parse(localStorage.getItem(`icf-${interviewId}`) || "{}");

      if (!q[id]) {
        q[id] = {};
      }
      if (!q[id][question]) {
        q[id][question] = null;
      }
      q[id][question] = undefined;

      localStorage.setItem(`icf-${interviewId}`, JSON.stringify(q));
    }

    window.dispatchEvent(
      new Event("feedback.updated", { bubbles: false, cancelable: false })
    );
  };

  return (
    <div className="flex justify-start align-middle">
      <div className="flex-1 mt-2">
        <CopyButton textToCopy={question} />
      </div>
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
      <div className="basis-2/3 pl-8">
        {asked && (
          <RangeInput id={id} question={question} level={asked ? level : "0"} />
        )}
      </div>
    </div>
  );
}
