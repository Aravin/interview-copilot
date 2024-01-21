import { useState } from "react";

export default function RangeInput({id, disabled = true }: { id: string, disabled: boolean }) {

  const [range, setRange] = useState(0);
  const updateRange = (e: any) => {
    setRange(e.target.value);
    localStorage.setItem(id, range.toString());
  };

  return <>
    <input disabled={disabled} type="range" min={0} max="100" value={disabled ? 0 : range} className="range" step="25" onChange={updateRange} />
    <div className="flex justify-between text-xs px-2">
      <span>no</span>
      <span>novice</span>
      <span>intermediate</span>
      <span>advanced</span>
      <span>expert</span>
    </div>
  </>;

}
