

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
  profileType: "Teacher" | "Company" | "Student" | "Candidate";
  completedQuizzes: CompletedQuiz[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Optional fields

  about?: string;            // Default value: ''
  phoneNumber?: string;      // Default value: ''
  website:string;
  quizzesCompleted?: number; // Default value: 0
  address?: string;          // Default value: ''
  dateOfBirth?: string | null; // Default value: null
  socialLinks?: {
    facebook?: string;       // Default value: ''
    twitter?: string;        // Default value: ''
    linkedin?: string;       // Default value: ''
  };
  preferences?: {
    language?: string;      // Default value: 'en'
  };
  level?: string;            // New optional field
  contactNumber?: string;    // New optional field
  membershipStatus?: string; // New optional field
}