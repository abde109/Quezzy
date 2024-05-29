import express from 'express';

const userRoutes = express();

userRoutes.get('/users',(req,res)=>{
    res.send('Hello from userRoutes')
});

export default userRoutes;