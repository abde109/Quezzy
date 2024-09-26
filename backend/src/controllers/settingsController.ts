import { Request, Response } from "express";
import CRUDService from "../models/CRUDService";
import User from "../models/userModel";

const userService = new CRUDService(User);

export const getSettings = async (req:Request, res:Response) => {

    try {
        const user = await userService.getById(req.session.user.userID);
        
        if (user) {
            console.log('User authenticated:', user);
            
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
    try {
        const user = (req.session as any).user;
        if (!user) {
            return res.status(403).json({ message: 'User not Authenticated' });
        }

        const userId = user.userID; // Ensure you're using the correct user ID
        const updateData = req.body; // This should contain the fields you want to update

        console.log('Updating user with ID:', userId);
        console.log('Update data:', updateData);

        // Update the user in the database
        await userService.update(userId, updateData, req);

        // Merge the updated data with the existing session data
        req.session.user = { ...req.session.user, ...updateData };

        // Explicitly save the session
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Could not save session' });
            }
            return res.status(200).json({ message: 'Settings updated successfully', user: req.session.user });
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
