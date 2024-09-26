import React from 'react';

// Define a type for the quiz data
interface Quiz {
  title: string;
  author: string;
  score: number;
}

// Sample quizzes data
const quizData: Quiz[] = [
  { title: 'Artificial  Quiz', author: '@jhonedo2', score: 70 },
  { title: 'Artificial  Quiz', author: '@jhonedo2', score: 70 },
  { title: 'Artificial  Quiz', author: '@jhonedo2', score: 70 },
  { title: 'Artificial  Quiz', author: '@jhonedo2', score: 30 },
  { title: 'Artificial  Quiz', author: '@jhonedo2', score: 30 }
];

const QuizDo: React.FC = () => {
  return (
    <div className="quiz-do-section pt-8">
      <h2 className="text-xl font-bold mb-4">Quiz Do</h2>
      <div className="grid grid-cols-4 gap-4">
        {quizData.map((quiz, index) => (
          <div key={index} className="quiz-card p-4 bg-[#FF204E] text-white rounded-md shadow-md">
            <div className="quiz-header flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white">
    <p className="font-bold text-bg-[#FF204E]">A</p>
  </div>
              <div className="quiz-info">
                <h3 className="quiz-title text-lg font-bold pl-4">{quiz.title}</h3>
                <p className="quiz-author text-sm pl-4 ">Author: {quiz.author}</p>
              </div>
            </div>
            <div className="quiz-score mt-4">
              <p className="text-sm font-bold">SCORE: {quiz.score}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDo;
