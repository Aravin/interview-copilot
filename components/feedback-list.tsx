"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const FeedbackList = () => {
  const router = useRouter();
  const feedbacks: string[] = [];

  if (typeof window !== 'undefined') {
    for (var key in localStorage) {
      if (key.includes("icf-")) {
        feedbacks.push(key.replace("icf-", ""));
      }
    }
  }

  const deleteFeedback = (id: string) => {
    typeof window !== 'undefined' && localStorage.removeItem(`icf-${id}`);
    const i = feedbacks.findIndex((value) => value === id);
    feedbacks.splice(i, 1);
    router.refresh();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Interview Id</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((value, index) => (
            <tr key={index}>
              <th>1</th>
              <td>{value}</td>
              <td>
                <Link className="link" href={`/interview?id=${value}`}>
                  Access
                </Link>
                |
                <button className="link" onClick={() => deleteFeedback(value)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
