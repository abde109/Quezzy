import express from 'express';
import { getUser, updateUser } from '../controllers/profileController';

const profileRoutes = express.Router();

// Route to get user profile
profileRoutes.get('/', getUser);

// Route to update user profile
profileRoutes.put('/', updateUser);

export default profileRoutes;
