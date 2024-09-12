import { Request, Response } from "express";
import CRUDService from "../models/CRUDService";
import User from "../models/userModel";
                  
const userService = new CRUDService(User);

export const getSettings = async (req:Request, res:Response) => {

    try {
        const user = (req.session as any).user;
        if (user) {
          return res.status(200).json({ message: 'Authenticated' , user: user });
        } else {
            return res.status(403).json({ message: 'User not Authenticated' });
        }
    } catch (err: any) {
        console.error('Error in getUser:', err.message);
        res.status(500).json({ error: err.message });
    }
};

export const updateSettings = async (req: Request, res: Response) => {
      // console.log("fdfffffffffffffffffff");
      try {
            const user = (req.session as any).user;
            if (!user) {
                  return res.status(403).json({ message: 'User not Authenticated' });
            }
            // console.log(req.body.email);
            await userService.update(req.body.userID, req.body, req);
            req.session.user = req.body;  // Update session data with the updated item
            req.session.save(); 
            return res.status(200).json(req.body);

      }
  
      catch (err: any) {
            console.log(err);
            res.status(500).json({ error: err });
      }
}
