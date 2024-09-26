import { Request, Response } from "express";
import CRUDService from "../models/CRUDService";
import IQuestion from "../models/questionModel";

const questionService = new CRUDService(IQuestion)

export const createQuestion = async (req: Request, res: Response) => {
      try {
            const question = await questionService.create(req.body)
            res.status(200).json(question)
      } catch (err: any) {
            res.status(500).json({ error: err.message });
      }
}

export const getQuestions = async (req: Request, res: Response) => { 

      try {
            const questions = await questionService.getAll();
            res.status(200).json(questions);
      } catch(err:any) {
            res.status(500).json({ error: err.message });
      }
}

export const getQuestionsByQuizId = async (req: Request, res: Response) => {
  try {
    const questions = await questionService.getManyBy({ quizId: req.params.quizId });
    res.status(200).json(questions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuestionById = async (req: Request, res: Response) => {
      try {
      const question = await questionService.delete(req.params.id);
      res.status(200).json(question);
      } catch (err: any) {
      res.status(500).json({ error: err.message });
      }
      }