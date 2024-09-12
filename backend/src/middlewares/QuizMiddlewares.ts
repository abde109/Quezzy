import { NextFunction, Request, Response } from 'express';
import CRUDService from '../models/CRUDService';
import IQuiz from '../models/quizModel';

const quizService = new CRUDService(IQuiz);

export const checkAndUpdateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const existingQuiz: any = await quizService.getBy({ title });

    if (existingQuiz) {
      const updatedQuiz = await quizService.update(existingQuiz._id, req.body,req );
      return res.status(200).json(updatedQuiz);
    } else {
      next();
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
