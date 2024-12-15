import React from 'react';

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizComplete: React.FC<QuizCompleteProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  return (
    <div className="text-center bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-lg mb-6">
        Your final score: {score} out of {totalQuestions}
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Restart Quiz
      </button>
    </div>
  );
};