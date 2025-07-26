"use client";

import { Question } from "@/components/question";
import json from "@/app/js-v2.json";
import { FeedbackDetailsSection } from "@/components/feedback-details-section";
import { Suspense, useLayoutEffect, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FeedbackImprovementSection } from "@/components/feedback-improvement-section";
import { getLocalStorageJSON } from "@/app/utils/functions";

function Interview() {
  const interviewId = useSearchParams().get("id");
  const [q, setQ] = useState<any>({});
  const [isClient, setIsClient] = useState(false);

  const updateFeedback = () => {
    if (interviewId) {
      const feedbackData = getLocalStorageJSON(`icf-${interviewId}`, {});
      setQ(feedbackData);
    }
  };

  // Memoize the feedback data to prevent unnecessary re-renders
  const memoizedFeedback = useMemo(() => q, [q]);

  useEffect(() => {
    setIsClient(true);
    updateFeedback();
  }, [interviewId]);

  useLayoutEffect(() => {
    if (isClient) {
      window.addEventListener("feedback.updated", updateFeedback, false);
    }
  }, [interviewId, isClient])

  return (
    <Suspense fallback={<>questions loading...</>}>
      <main className="grid grid-cols-[2fr_2fr] p-2 m-2 gap-8">
        <section className="overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-9rem)] p-2">
          {isClient && q && Object.keys(json).map((title: string, index: number) => (
            <div className="collapse collapse-plus bg-base-200 m-1" key={index}>
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">{title}</div>
              <div className="collapse-content">
                {(json as any)[title].map((question: string, index: number) => (
                  <Question
                    id={title}
                    question={question}
                    key={index}
                    level={
                      (q[title] &&
                        (q[title][question] || q[title][question] === "0")) ||
                      null
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-col overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-9rem)] p-2 gap-2"> 
          <div className="overflow-y-scroll">
          <FeedbackDetailsSection feedback={memoizedFeedback} />
          </div>
          <div className="overflow-y-scroll">
          <FeedbackImprovementSection feedback={memoizedFeedback} />
          </div>
        </section>
      </main>
    </Suspense>
  );
}

export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense fallback={<>loading...</>}>
      <Interview />
    </Suspense>
  )
}
