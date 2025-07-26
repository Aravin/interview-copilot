import RangeInput from "./range-input";
import CopyButton from "./copy-button";
import { useState, useEffect } from "react";
import { ChatBubbleLeftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export const Question = ({
  id,
  question,
  level,
  comment: initialComment,
}: {
  id: string;
  question: string;
  level: string | null;
  comment?: string;
}) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState(initialComment || '');

  // Update comment state when prop changes
  useEffect(() => {
    setComment(initialComment || '');
  }, [initialComment]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    
    // Dispatch event for RangeInput to handle
    const event = new CustomEvent('comment.updated', {
      detail: { id, question, comment: newComment }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg bg-base-50">
      <div className="flex items-start gap-3">
        <div className="text-sm font-medium flex-1 leading-relaxed group flex items-start gap-2">
          <span>{question}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
            <CopyButton textToCopy={question} />
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setShowComment(!showComment)}
            className={`btn btn-ghost btn-xs ${comment ? 'text-blue-600' : 'text-gray-500'}`}
            title={comment ? "Edit comment" : "Add comment"}
          >
            {comment ? (
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
            ) : (
              <ChatBubbleLeftIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      <RangeInput id={id} question={question} level={level || undefined} comment={comment} />
      {showComment && (
        <div className="mt-2">
          <textarea
            placeholder="Add a comment (optional)..."
            className="textarea textarea-bordered w-full text-sm resize-none"
            rows={2}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      )}
    </div>
  );
};
