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
  return numberToStringMap.get(range) || "not rated";
}

function rangeToNumber(range: string): number {
  return Array.from(numberToStringMap.entries()).findIndex(([key, value]) => value === range);
}

export default function RangeInput({
  id,
  question,
  level,
  comment,
}: {
  id: string;
  question: string;
  level?: string;
  comment?: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const interviewId = useSearchParams().get("id");
  const [range, setRange] = useState<number>(rangeToNumber(level || '0'));

  useEffect(() => {
    setIsClient(true);
  }, [])

  useEffect(() => {
    setRange(rangeToNumber(level || '0'));
  }, [level]);

  useEffect(() => {
    const handleCommentUpdate = (event: CustomEvent) => {
      const { id: eventId, question: eventQuestion, comment: newComment } = event.detail;
      if (eventId === id && eventQuestion === question && isClient && interviewId) {
        let q = getLocalStorageJSON(`icf-${interviewId}`, {});
        
        if (!q[id]) {
          q[id] = {};
        }
        if (!q[id][question]) {
          q[id][question] = { level: "0" };
        }
        
        if (typeof q[id][question] === 'string') {
          q[id][question] = { 
            level: q[id][question], 
            ...(newComment && newComment.trim() ? { comment: newComment.trim() } : {})
          };
        } else {
          if (newComment && newComment.trim()) {
            q[id][question].comment = newComment.trim();
          } else {
            delete q[id][question].comment;
          }
        }

        setLocalStorageJSON(`icf-${interviewId}`, q);
        window.dispatchEvent(
          new Event("feedback.updated", { bubbles: false, cancelable: false })
        );
      }
    };

    window.addEventListener('comment.updated', handleCommentUpdate as EventListener);
    return () => {
      window.removeEventListener('comment.updated', handleCommentUpdate as EventListener);
    };
  }, [id, question, isClient, interviewId]);

  const updateRange = (e: any) => {
    const newRange = parseInt(e.target.value, 10);
    setRange(newRange);

    if (isClient && interviewId) {
      let q = getLocalStorageJSON(`icf-${interviewId}`, {});

      if (!q[id]) {
        q[id] = {};
      }
      if (!q[id][question]) {
        q[id][question] = { level: "0" };
      }
      
      if (typeof q[id][question] === 'string') {
        q[id][question] = { level: rangeToString(newRange) };
      } else {
        q[id][question].level = rangeToString(newRange);
      }

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
        value={range}
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
