import { json, urlencoded } from 'body-parser';
import MongoStore from 'connect-mongo'; // If using MongoDB for sessions
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import questionRoutes from './routes/questionRoutes';
import quizRoutes from './routes/quizRoutes';
import settingsRoutes from './routes/settingsRoute';
import userRoutes from './routes/userRoutes';
import connectDB from './utils/database';

dotenv.config();

const app = express();

// Ensure that connectDB is called before the session middleware if it initializes the database connection
connectDB();

// Configure CORS to allow credentials
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Uncomment if using MongoDB for sessions
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/question', questionRoutes)
app.use('/api/settings' , settingsRoutes)

export default app;