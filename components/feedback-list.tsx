"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/app/utils/functions";

export const FeedbackList = () => {
  const [isClient, setIsClient] = useState(false);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    
    // Get all feedback keys from localStorage
    const feedbackKeys: string[] = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes("icf-")) {
          feedbackKeys.push(key.replace("icf-", ""));
        }
      }
    }
    setFeedbacks(feedbackKeys);
  }, []);

  const deleteFeedback = (id: string) => {
    if (isClient) {
      safeLocalStorage.removeItem(`icf-${id}`);
      setFeedbacks(prevFeedbacks => {
        const newFeedbacks = prevFeedbacks.filter(feedback => feedback !== id);
        if (newFeedbacks.length === 0) {
          safeLocalStorage.removeItem('icf_latest_interview');
        }
        return newFeedbacks;
      });
      router.refresh();
    }
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
              <th>{index + 1}</th>
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
