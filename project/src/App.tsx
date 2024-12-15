import React from 'react';
import { Brain } from 'lucide-react';
import { useQuiz } from './hooks/useQuiz';
import { QuizCard } from './components/QuizCard';
import { QuizProgress } from './components/QuizProgress';
import { QuizComplete } from './components/QuizComplete';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';

export const App: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    isAnswered,
    isCorrect,
    score,
    isLoading,
    error,
    handleAnswerSelect,
    handleNextQuestion,
    handleRestartQuiz
  } = useQuiz();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const isQuizComplete = currentQuestionIndex >= questions.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Brain className="w-8 h-8 text-blue-500" />
            Quiz Time
          </h1>
          <p className="text-gray-600 mt-2">Test your knowledge!</p>
        </div>

        {!isQuizComplete ? (
          <>
            <QuizProgress
              currentQuestion={currentQuestionIndex}
              totalQuestions={questions.length}
              score={score}
            />
            <div className="space-y-6">
              <QuizCard
                question={questions[currentQuestionIndex]}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                isAnswered={isAnswered}
                isCorrect={isCorrect}
              />
              
              {isAnswered && (
                <div className="flex justify-center">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <QuizComplete
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestartQuiz}
          />
        )}
      </div>
    </div>
  );
};