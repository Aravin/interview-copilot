"use client";

import Link from "next/link";

export const FeedbackList = () => {
  let feedbacks = [];

  for (var key in localStorage) {
    if (key.includes("icf-")) {
      feedbacks.push(key.replace("icf-", ""));
    }
  }

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
                <Link
                  className="link"
                  href={`/interview?id=${value.replace("icf-", "")}`}
                >
                  Access Feedback
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
