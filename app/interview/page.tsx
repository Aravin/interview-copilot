"use client";

import Question from "@/components/question";
import json from "@/app/js.json";
import { ReportSection } from "@/components/report-section";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function Interview() {
  const interviewId = useSearchParams().get("id");
  const [q, setQ] = useState<any>({});

  useEffect(() => {
    window.addEventListener("feedback.updated", updateFeedback, false);
    setQ(JSON.parse(localStorage.getItem(`icf-${interviewId}`) || "{}"));
  }, []);

  const updateFeedback = () => {
    setQ(JSON.parse(localStorage.getItem(`icf-${interviewId}`) || "{}"));
  };

  return (
    <Suspense fallback={<>questions loading...</>}>
      <main className="flex p-2 m-2 gap-8 w-full">
        {Object.keys(q).length && <section className="">
          {Object.keys(json).map((title: string, index: number) => (
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
        }
        <section className="flex-auto">
          <ReportSection feedback={q} />
        </section>
      </main>
    </Suspense>
  );
}

export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Interview />
    </Suspense>
  )
}