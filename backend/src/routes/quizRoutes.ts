import express from 'express';
import { createQuiz, deleteQuizs, getQuizByCreator, getQuizById, getQuizs } from '../controllers/quizController';
import { checkAndUpdateQuiz } from '../middlewares/QuizMiddlewares';

const quizRoutes = express();

quizRoutes.post('/setQuiz', checkAndUpdateQuiz ,createQuiz );
quizRoutes.get('/clear', deleteQuizs);
quizRoutes.get('/getQuizs', getQuizs);
quizRoutes.get('/getQuizById/:id', getQuizById);
quizRoutes.get('/getQuizByCreator/:createdBy', getQuizByCreator);



export default quizRoutes;