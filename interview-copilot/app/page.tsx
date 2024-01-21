"use client";

import Question from "@/components/question";
import json from "@/app/js.json";
import { ReportSection } from "@/components/report-section";

export default function Home() {
  const q = JSON.parse(localStorage.getItem("ic") || "{}");

  return (
    <main className="flex p-2 m-2 gap-8 max-h-screen	">
      <section className="flex-2">
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
