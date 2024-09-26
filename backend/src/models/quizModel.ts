// backend/src/models/quizModel.ts
import { Document, Schema, Types, model } from 'mongoose';

interface IQuiz extends Document {
  title: string;
  description: string;
  isPublic: boolean;
  allowedUsers: string[];
  showAnswers: 'show' | 'hide';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  questions?: Types.DocumentArray<any>; // Add optional questions field
}

const quizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    allowedUsers: [{ type: String, required: true }],
    showAnswers: { type: String, required: true, enum: ['show', 'hide'] },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for questions
quizSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'quizId',
});

const Quiz = model<IQuiz>('Quiz', quizSchema);

export default Quiz;

