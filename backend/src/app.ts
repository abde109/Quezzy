import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';
import userRoutes from './routes/userRoutes';
import { connectDB } from './utils/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

connectDB();

export default app;
