import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizCompletion extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  score: number;
  completedAt: Date;
}

const QuizCompletionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IQuizCompletion>('QuizCompletion', QuizCompletionSchema);
