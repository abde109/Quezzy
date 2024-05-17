import express from 'express';

const authRoutes = express();

authRoutes.get('/login', (req, res) => {
    res.send('Hello from authRoutes');
});

export default authRoutes;