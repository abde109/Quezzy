import { Request, Response } from "express";
import CRUDService from "../models/CRUDService";
import IQuiz from "../models/quizModel";

const quizService = new CRUDService(IQuiz);


export const createQuiz = async (req: Request, res: Response) => { 
      try {
            const quiz = await quizService.create(req.body);
            res.status(200).json(quiz);
      } catch(err:any) {
            res.status(500).json({ error: err.message }); 
      }

}

export const deleteQuizs = async (req: Request, res: Response) => {
      try {
            await quizService.deleteAll();
            res.status(200).json('cleared all quizs');
      } catch(err:any) {
            res.status(500).json({ error: err.message });
      }
}

export const getQuizs = async (req: Request, res: Response) => {
      try {
            const quizs = await quizService.getAll();
            res.status(200).json(quizs);
      } catch(err:any) {
            res.status(500).json({ error: err.message });
      }
      
}
 
export const getQuizById = async (req: Request, res: Response) => { 
      try {
            const quiz = await quizService.getBy({ _id: req.params.id });
            res.status(200).json(quiz);
      } catch(err:any) {
            res.status(500).json({ error: err.message });
      }
}

export const getQuizByCreator = async (req: Request, res: Response) => {
      try {
            const quiz = await quizService.getManyBy({ createdBy: req.params.createdBy });
            res.status(200).json(quiz);
      } catch(err:any) {
            res.status(500).json({ error: err.message });
      }
}

