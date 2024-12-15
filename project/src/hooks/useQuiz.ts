import { useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import { api } from '../services/api';

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await api.getQuestions();
        if (mounted && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
          setError(null);
        } else if (mounted) {
          setError('No questions available. Please try again later.');
        }
      } catch (error) {
        if (mounted) {
          setError('Failed to load questions. Please try again later.');
          console.error('Error fetching questions:', error);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAnswerSelect = async (answer: string) => {
    if (!questions[currentQuestionIndex]) return;
    
    setSelectedAnswer(answer);
    try {
      const response = await api.checkAnswer(questions[currentQuestionIndex].id, answer);
      setIsAnswered(true);
      setIsCorrect(response.correct);
      if (response.correct) {
        setScore((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error checking answer:', error);
      setError('Failed to check answer. Please try again.');
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setError(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setError(null);
  };

  return {
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
  };
};