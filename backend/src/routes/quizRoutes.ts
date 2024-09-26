import express from 'express';
import { createQuiz, deleteQuizById, deleteQuizs, getQuizByCreator, getQuizById, getQuizs, getTestById } from '../controllers/quizController';
import { checkAndUpdateQuiz } from '../middlewares/QuizMiddlewares';

const quizRoutes = express();

quizRoutes.post('/setQuiz', checkAndUpdateQuiz ,createQuiz );
quizRoutes.get('/clear', deleteQuizs);
quizRoutes.get('/deleteQuiz/:id', deleteQuizById);
quizRoutes.get('/getQuizs', getQuizs);
quizRoutes.get('/getQuizById/:id', getQuizById);
quizRoutes.get('/getQuizByCreator/:createdBy', getQuizByCreator);
quizRoutes.get('/quizzes/:id', getTestById);



export default quizRoutes;