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
            // console.log(req.body);
            
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

export const getUserDataWithDefaults = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set default values for optional fields if not present
        const responseData = {
            ...user.toObject(),
            about: user.about || 'This is data',
            skills: user.skills || 'No skills listed',
            website: user.website || 'No website provided',
            phoneNumber: user.phoneNumber || 'No phone number provided',
            address: user.address || 'No address provided',
            dateOfBirth: user.dateOfBirth || 'No date of birth provided',
            profilePicture: user.profilePicture || 'No profile picture provided',
            socialLinks: {
                facebook: user.socialLinks?.facebook || 'No Facebook link',
                twitter: user.socialLinks?.twitter || 'No Twitter link',
                linkedin: user.socialLinks?.linkedin || 'No LinkedIn link'
            },
            preferences: {
                language: user.preferences?.language || 'en'
            }
        };

        return res.status(200).json(responseData);
    } catch (err: any) {
        console.error('Error fetching user data:', err.message);
        return res.status(500).json({ error: err.message });
    }
};