import { Request, Response } from 'express';
import QuizCompletion from '../models/QuizCompletion';
import Quiz from '../models/quizModel'; // Assuming you have a Quiz model

// Create a new quiz completion
export const createQuizCompletion = async (req: Request, res: Response) => {
  try {
    const { quizId, score } = req.body;
    const userId = req.session.user?._id; // Assuming you have authentication middleware that sets req.user

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify that the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const newCompletion = new QuizCompletion({
      userId,
      quizId,
      score,
    });

    await newCompletion.save();

    res.status(201).json({ message: 'Quiz completion saved successfully', completion: newCompletion });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all quiz completions for a specific user
export const getQuizCompletionsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Verify that the requesting user matches the userId or has admin privileges
    if (req.session.user?._id.toString() !== userId && req.session.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const completions = await QuizCompletion.find({ userId })
      .populate('quizId', 'title') // Populate the quiz title
      .sort({ completedAt: -1 }); // Sort by completion date descending

    // Transform the data to include quizTitle
    const transformedCompletions = completions.map(comp => ({
      _id: comp._id,
      userId: comp.userId,
      quizId: comp.quizId._id,
      score: comp.score,
      completedAt: comp.completedAt,
      quizTitle: (comp.quizId as any).title, // Type assertion
    }));

    res.status(200).json({ completions: transformedCompletions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
