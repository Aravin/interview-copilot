import RangeInput from "./range-input";

export const Question = ({
  id,
  question,
  level,
}: {
  id: string;
  question: string;
  level: string | null;
}) => {
  return (
    <div className="flex flex-col gap-2 p-2 border rounded-lg">
      <div className="text-sm font-medium">{question}</div>
      <RangeInput id={id} question={question} level={level || undefined} />
    </div>
  );
};
