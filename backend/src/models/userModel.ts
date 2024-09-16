import { Document, Schema, model } from 'mongoose';

interface UserAnswer {
  questionId: string;
  givenAnswer: string;
}

interface CompletedQuiz {
  quizId: string;
  score: number;
  answers: UserAnswer[];
}

interface IUser extends Document {
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

  about?: string;
  skills?: string;
  website?: string;
  phoneNumber?: string;
  quizzesCompleted?: number;
  address?: string;        
  dateOfBirth?: Date;      
  profilePicture?: string; 
  socialLinks?: {           
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  preferences?: {           // User preferences for application settings
    language?: string;
  };


  
}



const userAnswerSchema = new Schema<UserAnswer>({
  questionId: { type: String, required: true },
  givenAnswer: { type: String, required: true }
});

const completedQuizSchema = new Schema<CompletedQuiz>({
  quizId: { type: String, required: true },
  score: { type: Number, required: true },
  answers: [userAnswerSchema]
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'] },
  profileType: { type: String, required: true, enum: ['Teacher', 'Company', 'Student', 'Candidate'] },
  completedQuizzes: [completedQuizSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // optionall ??
  about: { type: String, default: '' },
  skills: { type: String, default: '' },
  website: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  quizzesCompleted: { type: Number, default: 0 },
  address: { type: String, default: '' },
  dateOfBirth: { type: Date, default: null },
  profilePicture: { type: String, default: '' },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  preferences: {
    language: { type: String, default: 'en' }
  }
});


const User = model<IUser>('User', userSchema);

export default User;
