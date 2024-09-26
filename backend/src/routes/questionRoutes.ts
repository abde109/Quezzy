import express from "express";
import { createQuestion, getQuestions, getQuestionsByQuizId } from "../controllers/questionController";


const questionRoutes = express();

questionRoutes.post('/setQuestion', createQuestion)
questionRoutes.get('/getQuestions', getQuestions)
questionRoutes.get('/questions/:quizId', getQuestionsByQuizId);
questionRoutes.delete('/delete/:quizId', getQuestionsByQuizId);

export default questionRoutes