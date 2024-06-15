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
  profileType: "  Teacher" | "Company" | "Student" | "Candidate";
  completedQuizzes: CompletedQuiz[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  updatedAt: { type: Date, default: Date.now }
});

const User = model<IUser>('User', userSchema);

export default User;
