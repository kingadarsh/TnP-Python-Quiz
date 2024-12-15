import React from 'react';

interface AnswerButtonProps {
  option: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onSelect: () => void;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  option,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  isCorrect,
  onSelect,
}) => {
  const getButtonStyles = () => {
    if (selectedAnswer === option) {
      if (isAnswered) {
        return isCorrect
          ? 'bg-green-100 border-green-500'
          : 'bg-red-100 border-red-500';
      }
      return 'bg-blue-100 border-blue-500';
    }
    return 'bg-gray-50 hover:bg-gray-100';
  };

  const getBorderStyles = () => {
    if (isAnswered && option === correctAnswer) {
      return 'border-green-500';
    }
    return 'border-gray-200';
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full p-3 text-left rounded-lg transition-colors ${getButtonStyles()} border ${getBorderStyles()}`}
      disabled={isAnswered}
    >
      {option}
    </button>
  );
};