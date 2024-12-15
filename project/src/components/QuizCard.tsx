import React from 'react';
import { Question } from '../types/quiz';
import { AnswerButton } from './quiz/AnswerButton';
import { FeedbackMessage } from './quiz/FeedbackMessage';

interface QuizCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isAnswered,
  isCorrect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <AnswerButton
            key={option}
            option={option}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.correct_answer}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            onSelect={() => !isAnswered && onAnswerSelect(option)}
          />
        ))}
      </div>
      {isAnswered && (
        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={question.correct_answer}
        />
      )}
    </div>
  );
};