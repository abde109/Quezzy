// frontend/src/components/QuestionCard.tsx

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from 'react';
import { IQuestion } from '../api/IQuestion';

interface QuestionCardProps {
  question: IQuestion;
  deleteQuestion: (questionId: string) => void; // Function to delete the question
  editQuestion: (questionId: string) => void; // Function to edit the question (optional)
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, deleteQuestion, editQuestion }) => {

  const handleEdit = () => {
    editQuestion(question._id);
  };

  const handleDelete = () => {
    // Optionally, add a confirmation prompt here
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(question._id);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background mb-6">
      <div className='relative w-full'>
        <div className="border px-6 py-8 bg-white rounded-lg w-full relative">
          <h1 className="text-3xl mb-4">{question.content}</h1>
          {question.imageUrl && (
            <img src={question.imageUrl} alt="Question" className="mb-4 w-full object-contain" />
          )}
          <ul>
            {question.options.map((option) => (
              <li key={option._id} className="flex items-center mb-2">
                {option.isCorrect ? (
                  <CheckCircleOutlineIcon className='text-green-500 mr-2' sx={{ width: 20, height: 20 }} />
                ) : (
                  <HighlightOffIcon className='text-red-500 mr-2' sx={{ width: 20, height: 20 }} />
                )}
                <span>{option.text}</span>
              </li>
            ))}
          </ul>
          {/* Edit and Delete Buttons */}
          <div className="absolute top-4 right-4 flex flex-row gap-4">
            <button
              className="text-sm underline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-sm underline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        {/* Decorative Border (Optional) */}
        <div className='absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg pointer-events-none'></div>
      </div>
    </div>
  );
}

export default QuestionCard;
