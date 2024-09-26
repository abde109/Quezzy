import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuizzes } from '../api/IQuizApi';
import { getUsersByIds } from '../api/userApi';
import { Quiz, User } from '../types/types';

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search query

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzesAndUsers = async () => {
      try {
        const allQuizzes = await getAllQuizzes();
        const publicQuizzes = allQuizzes.filter(quiz => quiz.isPublic);
        setQuizzes(publicQuizzes);

        const userIds = Array.from(new Set(publicQuizzes.map(quiz => quiz.createdBy)));

        if (userIds.length > 0) {
          const fetchedUsers = await getUsersByIds(userIds);
          setUsers(fetchedUsers);
        }

        setIsLoading(false);
      } catch (err: any) {
        console.error('Error fetching quizzes or users:', err);
        setError(err.response?.data?.error || 'Failed to fetch quizzes');
        setIsLoading(false);
      }
    };

    fetchQuizzesAndUsers();
  }, []);

  const handleQuizClick = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  // Create a map from user IDs to user names for easy lookup
  const userMap: { [key: string]: string } = {};
  users.forEach(user => {
    userMap[user._id] = user.username; // Using `username` field from the user object
  });

  // Filter quizzes based on the search query
  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Available Quizzes</h1>
      
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search quizzes..."
          className="border border-gray-300 rounded-md p-2 w-1/2"
        />
      </div>

      {filteredQuizzes.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No quizzes match your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => (
            <div
              key={quiz._id}
              className="bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              onClick={() => handleQuizClick(quiz._id)}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-2 truncate">{quiz.title}</h2>
                <p className="text-gray-700 mb-4 truncate">{quiz.description}</p>
                <div className="flex flex-row justify-between items-center">
                  <span className="text-xs text-gray-500">Created by: {userMap[quiz.createdBy] || 'Unknown'}</span>
                  <span className="text-xs text-gray-500">Created At: {new Date(quiz.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
