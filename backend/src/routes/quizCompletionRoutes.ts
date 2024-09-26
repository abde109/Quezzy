import express from 'express';
import { createQuizCompletion, getQuizCompletionsByUser } from '../controllers/quizCompletionController';
import { authenticate } from '../middlewares/userMiddleware'; // Assuming you have an authentication middleware

const router = express.Router();

// Protect routes with authentication middleware
router.post('/', authenticate, createQuizCompletion);
router.get('/user/:userId', authenticate, getQuizCompletionsByUser);

export default router;

