import express from 'express';

const quizRoutes = express();

quizRoutes.get('/quizzes', (req, res) => {
    res.send('Hello from quizRoutes');
});

export default quizRoutes;