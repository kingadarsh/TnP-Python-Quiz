import React from 'react';

interface FeedbackMessageProps {
  isCorrect: boolean | null;
  correctAnswer: string;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  isCorrect,
  correctAnswer,
}) => {
  return (
    <div
      className={`mt-4 p-3 rounded-lg ${
        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isCorrect
        ? 'Correct!'
        : `Incorrect. The correct answer is ${correctAnswer}`}
    </div>
  );
};