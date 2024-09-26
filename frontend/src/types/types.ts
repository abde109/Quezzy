// frontend/src/types.ts

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  isPublic: boolean;
      showAnswers: 'show' | 'hide';
      allowedUsers: string[];
  createdBy: string;
  createdAt: string;
      updatedAt: string;
      
}

export interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  content: string;
  imageUrl?: string;
  options: Option[];
  quizId: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface User {
      _id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  profileType: "Teacher" | "Company" | "Student" | "Candidate";
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Optional fields
  about?: string;
  quizzesCompleted?: number;
  address?: string;
  website?:string;
  dateOfBirth?: string | null;
  profilePicture?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface QuizCompletion {
  _id: string;
  userId: string;
  quizId: string;
  score: number;
  completedAt: string;
  quizTitle?: string; // Populated from Quiz model
}