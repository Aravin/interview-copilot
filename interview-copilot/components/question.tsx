import { useState } from "react";
import RangeInput from "./range-input";

export default function Question({
  id,
  question,
}: {
  id: string;
  question: string;
}) {
  const [asked, setAsked] = useState(false);
  const updatedAsked = (e: any) => setAsked(!asked);

  return (
    <div className="flex justify-items-start gap-8">
      <div className="basis-1/3">
        <label className="label cursor-pointer">
          <span className="label-text">{question}</span>
          <input type="checkbox" className="checkbox" onChange={updatedAsked} />
        </label>
      </div>
      <div className="basis-2/3">
        <RangeInput id={id} question={question} disabled={!asked} />
      </div>
    </div>
  );
}
