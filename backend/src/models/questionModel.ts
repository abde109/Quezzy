import { Document, Schema, Types, model } from 'mongoose';

interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion extends Document {
  content: string;
  imageUrl?: string;
  options: QuestionOption[];
  quizId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const questionOptionSchema = new Schema<QuestionOption>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionSchema = new Schema<IQuestion>({
  content: { type: String, required: true },
  imageUrl: { type: String },
  options: [questionOptionSchema],
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
