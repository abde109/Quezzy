// src/components/QuizResult.tsx
import React from 'react';
import { Question, Quiz, UserAnswer } from '../types/types';

interface Props {
  quiz: Quiz;
  questions: Question[];
  userAnswers: UserAnswer[];
}

const QuizResult: React.FC<Props> = ({ quiz, questions, userAnswers }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers.find(ans => ans.questionId === question._id);
      if (!userAnswer) return;
      const selectedOption = question.options.find(
        (opt) => opt._id === userAnswer.selectedOptionId
      );
      if (selectedOption && selectedOption.isCorrect) {
        score += 1;
      }
    });
    return score;
  };

  const totalScore = calculateScore();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">Quiz Results</h1>
      <p className="text-4xl bold text-green-600 mb-4">
        You scored {totalScore} out of {questions.length}
      </p>
      {questions.map((question, index) => {
        const userAnswer = userAnswers.find(ans => ans.questionId === question._id);
        const isCorrect = question.options.some(
          (opt) => opt._id === userAnswer?.selectedOptionId && opt.isCorrect
        );
        const correctOption = question.options.find((opt) => opt.isCorrect);
        const selectedOption = question.options.find(
          (opt) => opt._id === userAnswer?.selectedOptionId
        );

        return (
          <div key={question._id} className="mb-4 p-4 bg-input rounded shadow">
            <p className="font-semibold">
              {index + 1}. {question.content}
            </p>
            {question.imageUrl && (
              <img
                src={question.imageUrl}
                alt={`Question ${index + 1}`}
                className="mb-2 mt-2"
              />
            )}
            <p>
              Your answer:{' '}
              <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                {selectedOption?.text || 'No answer selected'}
              </span>
            </p>
            {!isCorrect && correctOption && (
              <p>
                Correct answer:{' '}
                <span className="text-green-600">{correctOption.text}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizResult;
