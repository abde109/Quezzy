import { NextFunction, Request, Response } from 'express';
import { AuthHelpers } from '../helpers/authhelper';
import CRUDService from '../models/CRUDService';
import User from '../models/userModel';


const userService = new CRUDService(User);

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as any;
    console.log(session)
    if(session.user)
      return res.status(200).send({ message: 'Access success', user: session.user });
    else
      return res.status(403).send({ message: 'Access denied' });

}


export const authorize = async (req: Request , res:Response , next:NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await userService.getBy({ email: email });
        if (user) {
            const isauth = await AuthHelpers.verify(password , user.password);
            if (isauth) {
              (req.session as any).user = {userID:user._id , username : user.username , email : user.email , role : user.role , profileType : user.profileType , isAuth: true  };
              next();
              return;
            }else {
              return res.status(500).json({ message : { password : 'Password is incorrect' }});
          }
        } else {
            return res.status(403).send({ message: { email : 'i can not find this email' } });
        }
    } catch (err) {
        next(err);
      }
}

export const validateUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate username length
      if (req.body.username.length < 6) {
        return res.status(400).json({ message: {"username" : 'Username must be at least 6 characters long'} });
      }
  
      // Validate password length
      if (req.body.password.length < 8) {
        return res.status(400).json({ message:{"password" : 'Password must be at least 8 characters long' }});
      }
  
      // Check if email already exists
      const existingUser = await userService.getAll();
      if (existingUser.some(user => user.email === req.body.email)) {
        return res.status(400).json({ message: {"email" : `The email ${req.body.email} already exists` }});
      }else if(existingUser.some(user => user.username === req.body.username)){
          return res.status(400).json({ message: {"username" : `The username ${req.body.username} already exists` }});
      }
  
      next();
    } catch (err) {
      next(err);
    }
  };
