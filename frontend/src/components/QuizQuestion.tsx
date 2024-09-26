// src/components/QuizQuestion.tsx
import React from 'react';
import { Question } from '../types/types';


interface Props {
  question: Question;
  showAnswer: boolean;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

const QuizQuestion: React.FC<Props> = ({
  question,
  showAnswer,
  selectedOptionId,
  onSelectOption,
}) => {
  if (!question) {
    return <div className="text-center">No question available.</div>;
  }

  return (
    <div className="bg-input p-10 rounded shadow w-9/10">
      <p className="text-lg font-semibold mb-2">{question.content}</p>
      {question.imageUrl && (
        <img src={question.imageUrl} alt="Question" className="mb-2" />
      )}
      <ul>
        {question.options.map((option:any) => {
          let optionClass =
            'p-2 mb-2 rounded cursor-pointer transition duration-200 hover:bg-gray-100';
          if (selectedOptionId === option._id) {
            optionClass += ' border-2 border-primary bg-primary text-white hover:text-black';
          } else {
            optionClass += ' border border-gray-300';
          }
          if (showAnswer) {
            if (option.isCorrect) {
              optionClass += ' bg-green-200';
            } else if (
              selectedOptionId === option._id &&
              !option.isCorrect
            ) {
              optionClass += ' bg-red-200';
            }
          }

          return (
            <li
              key={option._id}
              className={optionClass}
              onClick={() => onSelectOption(option._id)}
            >
              {option.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuizQuestion;
