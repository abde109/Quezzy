import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { IQuiz, getQuizByCreator } from '../api/IQuizApi';
import ListedQuizCard from "../components/ListedQuizCard";

const ListedQuiz = () => {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const userState = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = userState.userID;
            const response = await getQuizByCreator(userId);
            console.log(response);
            
        setQuizzes(response);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    }

    fetchQuizzes();
  }, [userState]);

 return (
    <div className="bg-background flex flex-col py-20 px-40">
      <h1 className="text-xl font-bold mb-6">Listed Quizzes</h1>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <ListedQuizCard
            key={quiz._id}
            {...quiz}
          />
        ))}
      </div>
    </div>
  );
}

export default ListedQuiz;
