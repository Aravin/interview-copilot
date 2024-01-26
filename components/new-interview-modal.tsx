import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { uid } from "uid";

export const NewInterviewModal = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [interviewId, setInterviewId] = useState(uid());

  useEffect(() => {
    setIsClient(true);
  }, [])

  const updateInterviewId = (e: any) =>
    setInterviewId(
      e.target.value
        ?.trim()
        .split(" ")
        .join("")
        .replace(/[^a-zA-Z0-9 ]/g, "")
    );

  const onModalClick = (e: any) => {
    isClient && localStorage.setItem("icf_latest_interview", interviewId);
    router.push(`/interview?id=${interviewId}`);
  };

  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() =>
          (document.getElementById("my_modal_5") as any)?.showModal()
        }
      >
        Start Now
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Interview ID</h3>
          <br />
          <input
            type="text"
            min={3}
            max={10}
            placeholder="interview id"
            className="input w-full max-w-xs"
            value={interviewId}
            onChange={updateInterviewId}
            required
          />
          <div className="modal-action">
            <form method="dialog">
              <button onClick={onModalClick} className="btn btn-secondary">
                Continue
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
