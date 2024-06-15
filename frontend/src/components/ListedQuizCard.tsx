import React from 'react';
import { IQuiz } from '../api/IQuizApi';

const ListedQuizCard: React.FC<IQuiz> = ({ title, description, isPublic, createdAt, showAnswers }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-background px-10 py-20">
      <div className='relative w-full'>
        <div className="border px-6 py-8 bg-white rounded-lg w-full">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{isPublic ? "Public" : "Private"}</p>
          <p>{showAnswers}</p>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className='absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg top-2 left-2 pointer-events-none'></div>
      </div>
    </div>
  );
}

export default ListedQuizCard;
