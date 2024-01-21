import { useState } from "react";

export default function RangeInput({
  id,
  question,
  disabled = true,
}: {
  id: string;
  question: string;
  disabled: boolean;
}) {
  const [range, setRange] = useState(0);
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
        disabled={disabled}
        type="range"
        min={0}
        max="100"
        value={disabled ? 0 : range}
        className="range"
        step="25"
        onChange={updateRange}
      />
      <div className="flex justify-between text-xs px-2">
        <span>no</span>
        <span>novice</span>
        <span>intermediate</span>
        <span>advanced</span>
        <span>expert</span>
      </div>
    </>
  );
}
