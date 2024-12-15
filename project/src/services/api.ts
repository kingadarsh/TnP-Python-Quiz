import axios, { AxiosError } from 'axios';
import { Question, Answer, AnswerResponse } from '../types/quiz';

const API_BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Custom error handler that returns a standardized error object
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError.response?.data?.message || 
      axiosError.message || 
      'An unexpected error occurred'
    );
  }
  throw error;
};

export const api = {
  getQuestions: async (): Promise<Question[]> => {
    try {
      const response = await axiosInstance.get<Question[]>('/questions');
      return response.data;
    } catch (error) {
      handleApiError(error);
      return [];
    }
  },

  checkAnswer: async (questionId: number, answer: string): Promise<AnswerResponse> => {
    try {
      const response = await axiosInstance.post<AnswerResponse>(
        `/check-answer/${questionId}`,
        { answer } as Answer
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      return {
        correct: false,
        correct_answer: ''
      };
    }
  }
};