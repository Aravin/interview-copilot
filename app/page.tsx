"use client";

import Link from "next/link";
import { NewInterviewModal } from "@/components/new-interview-modal";
import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/app/utils/functions";

export default function Home() {
  let feedbacks = [];
  let interviewId = null;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  if (isClient) {
    interviewId = safeLocalStorage.getItem("icf_latest_interview");

    for (var key in safeLocalStorage) {
      if (key.includes("icf-")) {
        feedbacks.push(key.replace("icf-", ""));
      }
    }
  }

  return (
    <main className="flex p-2 m-2 gap-8">
      {interviewId && (
        <div className="card w-96 bg-base-100 shadow-xl" key={"prev"}>
          <div className="card-body">
            <h2 className="card-title">Previous interview</h2>
            <p>Continue with your previous interview?</p>
            <div className="card-actions justify-end">
              <Link
                href={`/interview?id=${interviewId}`}
                className="btn btn-primary"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="card w-96 bg-base-100 shadow-xl" key={"new"}>
        <div className="card-body">
          <h2 className="card-title">New Interview</h2>
          <p>Start with the new interview?</p>
          <div className="card-actions justify-end">
            <NewInterviewModal />
          </div>
        </div>
      </div>

      {feedbacks.length !== 0 && (
        <div className="card w-96 bg-base-100 shadow-xl" key={"history"}>
          <div className="card-body">
            <h2 className="card-title">Feedback History</h2>
            <p>Check the history of your previous feedback?</p>
            <div className="card-actions justify-end">
              <Link href={"/feedback"} className="btn btn-primary">
                History
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
