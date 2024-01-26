"use client";

import Question from "@/components/question";
import json from "@/app/js.json";
import { ReportSection } from "@/components/report-section";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const interviewId = useSearchParams().get("id");
  const [q, setQ] = useState(
    typeof window !== 'undefined' ?
      JSON.parse(localStorage.getItem(`icf-${interviewId}`) || "{}") : {}
  );

  const updateFeedback = () => {
    if (typeof window !== 'undefined') {
      setQ(JSON.parse(localStorage.getItem(`icf-${interviewId}`) || "{}"));
    }
  };

  useEffect(() => {
    window.addEventListener("feedback.updated", updateFeedback, false);
  }, []);

  return (
    <main className="flex p-2 m-2 gap-8 w-full">
      <section className="">
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

      <section className="flex-auto">
        <ReportSection />
      </section>
    </main>
  );
}
