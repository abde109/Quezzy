import { Request, Response } from "express";
import CRUDService from "../models/CRUDService";
import User from "../models/userModel";

const userService = new CRUDService(User);

// Function to get user settings (or user information)
export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user.userID;

        if (!userId) {
            return res.status(403).json({ message: 'User not Authenticated' });
        }

        const user = await userService.getById(userId);

        if (user) {
            console.log('User authenticated:', user);
            return res.status(200).json({ message: 'User retrieved', user });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err: any) {
        console.error('Error in getUser:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Function to update user settings
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = (req.session as any).user;
        if (!user) {
            return res.status(403).json({ message: 'User not Authenticated' });
        }

        const userId = user.userID; // Ensure you're using the correct user ID
        const updateData = req.body; // This should contain the fields you want to update

        console.log('Updating user with ID:', userId);
        console.log('Update data:', updateData);

        // Ensure the user ID is passed correctly to the update method
        await userService.update(userId, updateData, req);

        // Merge the updated data with the existing session data
        req.session.user = { ...req.session.user, ...updateData };

        // Save the session
        // Note: You may need to call req.session.save() if using express-session to persist changes
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }
            return res.status(200).json({ message: 'User settings updated successfully' });
        });

    } catch (err: any) {
        console.error('Error in updateSettings:', err.message);
        res.status(500).json({ error: err.message });
    }
};
