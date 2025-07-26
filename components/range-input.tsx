import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorageJSON, setLocalStorageJSON } from "@/app/utils/functions";

const numberToStringMap = new Map([
  [0, "not rated"],
  [1, "no"],
  [2, "novice"],
  [3, "intermediate"],
  [4, "advanced"],
  [5, "expert"],
]);

function rangeToString(range: number): string {
  return numberToStringMap.get(range) || "not rated"; // Default to "not rated" if not found
}

function rangeToNumber(range: string): number {
  return Array.from(numberToStringMap.entries()).findIndex(([key, value]) => value === range);
}


export default function RangeInput({
  id,
  question,
  level,
}: {
  id: string;
  question: string;
  level?: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const interviewId = useSearchParams().get("id");
  const [range, setRange] = useState<number>(rangeToNumber(level || '0'));

  useEffect(() => {
    setIsClient(true);
  }, [])

  const updateRange = (e: any) => {
    setRange(e.target.value);

    if (isClient && interviewId) {
      let q = getLocalStorageJSON(`icf-${interviewId}`, {});

      if (!q[id]) {
        q[id] = {};
      }
      if (!q[id][question]) {
        q[id][question] = null;
      }
      q[id][question] = rangeToString(parseInt(e.target.value, 10));

      setLocalStorageJSON(`icf-${interviewId}`, q);
    }
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
