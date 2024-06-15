import { Request, Response } from "express";
import { AuthHelpers } from "../helpers/authhelper";
import CRUDService from "../models/CRUDService";
import User from "../models/userModel";

const userService = new CRUDService(User);

export const getUsers = async (req:Request, res:Response) => {
    try{
        const users = await userService.getAll();
        res.status(200).json(users);
    }catch(err:any){
        res.status(500).json({ error: err.message });
    }
}

export const getUser = async (req: Request, res: Response) => {
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


export const createUser = async (req:Request, res:Response) => {
    try{
        req.body.password = await AuthHelpers.hash(req.body.password);
        const user = await userService.create(req.body);
        res.status(201).json(user);
    }catch(err:any){
        console.log(err);
        res.status(500).json({ error: err });
    }
}

export const deleteUsers = async (req:Request, res:Response) => {
    try{
        await userService.deleteAll();
        res.status(200).json('cleared all users')
    }catch(err:any){
        res.status(500).json({ error: err.message });
    }
}