import apiClient from ".";
import { QuestionOption } from "./questionOption";

export interface IQuestion {
  _id: string;
  content: string;
  imageUrl?: string;
  options: QuestionOption[];
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createQuestion = async (questionData : any) => {
  try {
    const response = await apiClient.post('/question/setQuestion' , questionData);
    return response.data
  } catch (err) {
    throw err
  }
}

export const getQuestions = async (quizId: string) => { 
  try {
    const response = await apiClient.get(`/question/questions/${quizId}`);
    return response.data
  } catch (err) {
    throw err
  }
}

export const deleteQuestion = async (questionId: string) => {
  try {
    const response = await apiClient.delete(`/question/delete/${questionId}`);
    return response.data
  } catch (err) {
    throw err
  }
}