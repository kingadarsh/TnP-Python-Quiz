import React from 'react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  score,
}) => {
  return (
    <div className="text-center mb-8">
      <div className="mt-4">
        <span className="font-semibold">Score: {score}</span>
        <span className="text-gray-500"> / {totalQuestions}</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};