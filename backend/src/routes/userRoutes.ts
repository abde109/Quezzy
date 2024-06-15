import express from 'express';
import { createUser, deleteUsers, getUser, getUsers } from '../controllers/userController';
import { authenticate, authorize, validateUserData } from '../middlewares/userMiddleware';



const userRoutes = express();

userRoutes.get('/',getUsers)
userRoutes.post('/',validateUserData ,createUser);
userRoutes.get('/clear', deleteUsers);
userRoutes.post('/login' ,authorize ,getUser);
userRoutes.get('/auth', authenticate)
userRoutes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: 'Could not log out' });
        } else {
            res.status(200).json({ message: 'Logged out' });
        }
    });
})




export default userRoutes;