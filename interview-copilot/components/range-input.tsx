import { useState } from "react";

export default function RangeInput({
  id,
  question,
  level,
}: {
  id: string;
  question: string;
  level?: string;
}) {
  const [range, setRange] = useState<string>(level || "0");
  const updateRange = (e: any) => {
    setRange(e.target.value);

    let q = JSON.parse(localStorage.getItem("ic") || "{}");
    console.log(q);
    if (!q[id]) {
      q[id] = {};
    }
    if (!q[id][question]) {
      q[id][question] = null;
    }
    q[id][question] = e.target.value;

    localStorage.setItem("ic", JSON.stringify(q));
    window.dispatchEvent(
      new Event("feedback.updated", { bubbles: false, cancelable: false })
    );
  };

  return (
    <>
      <input
        disabled={!(range || level)}
        type="range"
        min={0}
        max={5}
        value={range || level}
        className="range"
        step={1}
        onChange={updateRange}
      />
      <div className="flex justify-between text-xs px-2">
        <span>not rated</span>
        <span>no</span>
        <span>novice</span>
        <span>intermediate</span>
        <span>advanced</span>
        <span>expert</span>
      </div>
    </>
  );
}
