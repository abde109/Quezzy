// types/profileType.ts



interface UserAnswer {
  questionId: string;
  givenAnswer: string;
}

interface CompletedQuiz {
  quizId: string;
  score: number;
  answers: UserAnswer[];
}


export interface ISocialLinks {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  }
  
  export interface IProfile {
    username?: string;
    email?: string;
    profileType?: string;
    about?: string;
    website?: string;
    address?: string;
    dateOfBirth?: string;
    socialLinks?: ISocialLinks;
    level?: string;
  }
  