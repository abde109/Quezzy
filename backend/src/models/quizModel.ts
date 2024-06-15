import { Document, Schema, model } from 'mongoose';
interface IQuiz extends Document {
  title: string;
  description: string;
  isPublic: boolean;
  allowedUsers: string[];
  showAnswers: "show" | "hide" ;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  allowedUsers: [{ type: String, required: true }],
  showAnswers: { type: String, required: true, enum: ['show', 'hide'] },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Quiz = model<IQuiz>('Quiz', quizSchema);

export default Quiz;
