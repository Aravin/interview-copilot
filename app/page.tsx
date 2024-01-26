"use client";

import Link from "next/link";
import { NewInterviewModal } from "@/components/new-interview-modal";

export default function Home() {
  const interviewId = localStorage.getItem("icf_latest_interview");
  let feedbacks = [];

  for (var key in localStorage) {
    if (key.includes("icf-")) {
      feedbacks.push(key.replace("icf-", ""));
    }
  }

  return (
    <main className="flex p-2 m-2 gap-8 w-full">
      {interviewId && (
        <div className="card w-96 bg-base-100 shadow-xl">
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

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">New Interview</h2>
          <p>Start with the new interview?</p>
          <div className="card-actions justify-end">
            <NewInterviewModal />
          </div>
        </div>
      </div>

      {feedbacks.length !== 0 && (
        <div className="card w-96 bg-base-100 shadow-xl">
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
