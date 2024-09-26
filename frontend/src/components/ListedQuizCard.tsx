import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { getQuizById, IQuiz } from '../api/IQuizApi';

const ListedQuizCard: React.FC<IQuiz> = ({ _id,title, description, isPublic, createdAt, showAnswers }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
 const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleEdit = async () => { 
    closeDropdown();
    const quizReq = await getQuizById(_id);
    navigate(`/list/${quizReq._id}`);

  }

  const handleDelete = async () => { 
    closeDropdown();
    // navigate(`/deleteQuiz/${_id}`);
    await apiClient.get(`/quizzes/deleteQuiz/${_id}`);
    window.location.reload();
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background py-10">
      <div className="relative w-full max-w-sm">
                <div className="border px-6 py-8 bg-white rounded-lg w-full overflow-hidden">
          <h2 className="text-lg font-bold text-red-500 mb-2 truncate">{title}</h2>
          <p className="text-gray-700 mb-4" style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
            <strong>Description : </strong>{description}
          </p>

          <p className="text-gray-600 mb-4 truncate "><strong>Type : </strong>{isPublic ? "Public" : "Private"}</p>
          <p className="text-gray-600 mb-4 "><strong>Mode : </strong>{showAnswers}</p>
          <p className="text-gray-600 truncate"><strong>Date of Creation : </strong>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className="absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg top-2 left-2 pointer-events-none"></div>
        <div className="absolute top-2 right-2">
          <div className="relative">
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 100-4 2 2 0 000 4zM10 10a2 2 0 100-4 2 2 0 000 4zM14 10a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => handleEdit()}>Edit</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={closeDropdown}>Invite</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => handleDelete()}>Delete</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={closeDropdown}>Preview</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListedQuizCard;
