import { Document, Schema, model } from 'mongoose';

// Define UserAnswer interface
interface UserAnswer {
  questionId: string;
  givenAnswer: string;
}

// Define CompletedQuiz interface
interface CompletedQuiz {
  quizId: string;
  score: number;
  answers: UserAnswer[];
}

// Define IUser interface extending Mongoose Document
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

  
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";            // New optional field
  contactNumber?: string;    // New optional field
  membershipStatus?: string; // New optional field
}

// Schema for UserAnswer
const userAnswerSchema = new Schema<UserAnswer>({
  questionId: { type: String, required: true },
  givenAnswer: { type: String, required: true }
});

// Schema for CompletedQuiz
const completedQuizSchema = new Schema<CompletedQuiz>({
  quizId: { type: String, required: true },
  score: { type: Number, required: true },
  answers: [userAnswerSchema]  // Embed UserAnswer schema
});

// Schema for User
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'] },
  profileType: { type: String, required: true, enum: ['Teacher', 'Company', 'Student', 'Candidate'] },
  completedQuizzes: [completedQuizSchema],  // Embed CompletedQuiz schema
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // Optional fields without default values
  about: { type: String },
  website:{type:String},
  quizzesCompleted: { type: Number },
  address: { type: String },
  dateOfBirth: { type: String, default: null },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String }
  },
  level: { type: String },            // New optional field
  contactNumber: { type: String },    // New optional field
  membershipStatus: { type: String }  // New optional field
});

// Model for User
const User = model<IUser>('User', userSchema);

export default User;
