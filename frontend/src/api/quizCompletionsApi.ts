import apiClient from ".";
// frontend/src/api/quizCompletionsApi.ts

import { QuizCompletion } from '../types/types';

// Save a quiz completion
export const saveQuizCompletion = async (quizCompletion: Omit<QuizCompletion, '_id' | 'quizTitle'>): Promise<QuizCompletion> => {
  const response = await apiClient.post(`/quizCompletions`, quizCompletion, {
    withCredentials: true, 
  });
  return response.data.completion;
};

// Fetch quiz completions for a user
export const getQuizCompletionsByUserId = async (userId: string): Promise<QuizCompletion[]> => {
  const response = await apiClient.get(`/quizCompletions/user/${userId}`, {
    withCredentials: true,
  });
  return response.data.completions;
};
