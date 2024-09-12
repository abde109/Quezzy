

interface UserAnswer {
  questionId: string;
  givenAnswer: string;
}

interface CompletedQuiz {
  quizId: string;
  score: number;
  answers: UserAnswer[];
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  profileType: "  Teacher" | "Company" | "Student" | "Candidate";
  completedQuizzes: CompletedQuiz[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}