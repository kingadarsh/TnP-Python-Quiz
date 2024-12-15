export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface Answer {
  answer: string;
}

export interface AnswerResponse {
  correct: boolean;
  correct_answer: string;
}