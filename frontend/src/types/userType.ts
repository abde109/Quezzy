

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

  about: '',            // Default value
  skills: '',           // Default value
  website: '',          // Default value
  phoneNumber: '',      // Default value
  quizzesCompleted: 0, // Default value
  address: '',          // Default value
  dateOfBirth: null,    // Default value
  profilePicture: '',   // Default value
  socialLinks: {
    facebook: '',       // Default value
    twitter: '',        // Default value
    linkedin: ''        // Default value
  },
  preferences: {
    language: 'en'      // Default value
  }
};