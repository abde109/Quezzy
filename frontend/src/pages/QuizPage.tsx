// src/pages/QuizPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getQuestionsByQuizId, getQuizById } from '../api/IQuizApi';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';
import { Question, Quiz, UserAnswer } from '../types/types';
import './QuizPage.css'; // Ensure this file exists and is correctly set up

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        if (!quizId) {
          throw new Error('No quiz ID provided');
        }
        const [fetchedQuiz, fetchedQuestions] = await Promise.all([
          getQuizById(quizId),
          getQuestionsByQuizId(quizId),
        ]);
        setQuiz(fetchedQuiz);
        setQuestions(fetchedQuestions);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching quiz or questions:', error);
        setError(error.message || 'Failed to fetch quiz or questions');
        setIsLoading(false);
      }
    };
    fetchQuizAndQuestions();
  }, [quizId]);

  const handleAnswerSelection = (optionId: string) => {
    if (!questions.length) return;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex]._id,
      selectedOptionId: optionId,
    };
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleHideAnswer = () => {
    setShowAnswer(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowAnswer(true);
    // Optionally, send userAnswers to the backend for saving
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-10">Quiz not found.</div>;
  }

  if (!questions.length) {
    return (
      <div className="text-center mt-10">
        No questions available for this quiz.
      </div>
    );
  }

  if (isSubmitted) {
    return <QuizResult quiz={quiz} questions={questions} userAnswers={userAnswers} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Determine if the "Show Answer" button should be displayed
  const canShowAnswerButton =
    quiz.isPublic &&
    
    quiz.showAnswers === 'show';

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">{quiz.title}</h1>
      <div className="text-sm text-gray-600 mb-2">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <TransitionGroup>
        <CSSTransition
          key={currentQuestion._id}
          timeout={300}
          classNames="fade"
        >
          <QuizQuestion
            question={currentQuestion}
            showAnswer={showAnswer}
            selectedOptionId={userAnswers[currentQuestionIndex]?.selectedOptionId}
            onSelectOption={handleAnswerSelection}
          />
        </CSSTransition>
      </TransitionGroup>

      <div className="flex justify-between mt-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50 transition duration-300"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <div className="flex items-center">
          {canShowAnswerButton && (
            <>
              {!showAnswer ? (
                <button
                  className="bg-neutral text-white px-4 py-2 rounded mr-2 transition duration-300 transform hover:scale-105"
                  onClick={handleShowAnswer}
                >
                  Show Answer
                </button>
              ) : (
                <button
                  className="bg-neutral text-white px-4 py-2 rounded mr-2 transition duration-300 transform hover:scale-105"
                  onClick={handleHideAnswer}
                >
                  Hide Answer
                </button>
              )}
            </>
          )}

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              className="bg-accent text-white px-4 py-2 rounded transition duration-300"
              onClick={handleSubmit}
              disabled={userAnswers.length < questions.length}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="bg-primary text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50"
              onClick={handleNext}
              disabled={!userAnswers[currentQuestionIndex]}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;