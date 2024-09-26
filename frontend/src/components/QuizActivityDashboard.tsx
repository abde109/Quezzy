import React from 'react';

const QuizActivityDashboard = () => {
    // Sample data for quizzes
    const quizzes = [
        { name: 'JavaScript Basics', score: 85, timeSpent: '10m', date: '2024-09-15' },
        { name: 'CSS Advanced', score: 90, timeSpent: '15m', date: '2024-09-10' },
        { name: 'React Introduction', score: 78, timeSpent: '20m', date: '2024-09-05' },
    ];

    const averageScore = (quizzes.reduce((acc, quiz) => acc + quiz.score, 0) / quizzes.length).toFixed(2);
    const totalTimeSpent = quizzes.reduce((acc, quiz) => {
        const minutes = parseInt(quiz.timeSpent.replace('m', ''), 10);
        return acc + minutes;
    }, 0);

    return (
        <div className="w-full p-6 bg-[#FF204E] text-white rounded-lg shadow-md mt-6">
            <h2 className="text-3xl font-bold mb-4">Quiz History & Stats Dashboard</h2>

            {/* Quiz Summary Section */}
            <div className="flex justify-between mb-6">
                <div className="text-lg">
                    <strong>Average Score:</strong> {averageScore}%
                </div>
                <div className="text-lg">
                    <strong>Total Time Spent:</strong> {totalTimeSpent} minutes
                </div>
            </div>

            {/* Quiz History Table */}
            <div className="overflow-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white text-black">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-lg">Quiz Name</th>
                            <th className="py-3 px-6 text-left font-bold">Score</th>
                            <th className="py-3 px-6 text-left">Time Spent</th>
                            <th className="py-3 px-6 text-left">Date Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-6 font-bold">{quiz.name}</td>
                                <td className="py-3 px-6">{quiz.score}%</td>
                                <td className="py-3 px-6">{quiz.timeSpent}</td>
                                <td className="py-3 px-6">{quiz.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6">
                <button className="bg-white text-[#FF204E] py-2 px-4 rounded-md shadow-md mr-4">
                    View Detailed Stats
                </button>
                <button className="bg-white text-[#FF204E] py-2 px-4 rounded-md shadow-md">
                    Download Report
                </button>
            </div>
        </div>
    );
};

export default QuizActivityDashboard;
