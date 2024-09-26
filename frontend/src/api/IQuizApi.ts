import apiClient from ".";

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  isPublic: boolean;
  questions: string[];
  allowedUsers?: string[];
  showAnswers: "show" | "hide" ;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createQuiz = async (quizData: any) => {
  try{
      const response = await apiClient.post('/quizzes/setQuiz' , quizData)
      return response.data
  }catch(err : any){
      throw err
  }
}

export const getQuizById = async (quizId: string) => {
  const response = await apiClient.get(`/quizzes/getQuizById/${quizId}`);
  return response.data;
};

export const getQuizByCreator = async (userId: string) => {
  const response = await apiClient.get(`/quizzes/getQuizByCreator/${userId}`);
  return response.data;
}

export const deleteQuiz = async (quizId: string) => { 
  const response = await apiClient.get(`/quizzes/deleteQuiz/${quizId}`);
  return response.data;
}