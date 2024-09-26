import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IQuestion, createQuestion, deleteQuestion, getQuestions } from '../api/IQuestion';
import { createQuiz, getQuizById } from '../api/IQuizApi';
import { QuestionOption } from '../api/questionOption';
import Alert from '../components/Alert';
import PrimaryButton from "../components/PrimaryButton";
import QuestionCard from '../components/QuestionCard';
import ToggleP from '../components/ToggleP';

const ListQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const dispatch = useSelector((state: any) => state.user); // Access Redux state for user
  const [selectedOption, setSelectedOption] = useState<string>('publish');
  const [selectedOptionAnswer, setSelectedOptionAnswer] = useState<string>('show answer');
  const [answer, setAnswer] = useState<string>('');
  const [listAnswers, setListAnswers] = useState<QuestionOption[]>([]);
  const [errorAnswer, setErrorAnswer] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [alertKey, setAlertKey] = useState<number>(0);
  const [alertType, setAlertType] = useState<'success' | 'warning' | 'error'>('error');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<any>(null);
  const [question, setQuestion] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [listQuestion, setListQuestion] = useState<IQuestion[]>([]);

  // Fetch quiz details and questions if quizId is present
  useEffect(() => {
    if (quizId) {
      const fetchQuizAndQuestions = async () => {
        try {
          const fetchedQuiz = await getQuizById(quizId);
          setTitle(fetchedQuiz.title);
          setDescription(fetchedQuiz.description);
          setIsDisabled(true);
          setSelectedOption(fetchedQuiz.isPublic ? 'publish' : 'private');
          setSelectedOptionAnswer(fetchedQuiz.showAnswers === 'show' ? 'show answer' : 'hide answer');
          setQuiz(fetchedQuiz);
          await fetchQuestions(quizId);
        } catch (error) {
          console.error('Error fetching quiz and questions:', error);
        }
      };
      fetchQuizAndQuestions();
    }
  }, [quizId]);

      
      const deleteQuestionID = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      // Remove the question from the local state
      const updatedQuestions = listQuestion.filter(q => q._id !== questionId);
      setListQuestion(updatedQuestions);
      setAlertType('success');
      setAlertMessage('Question deleted successfully.');
      setAlertKey(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting question:', error);
      setAlertType('error');
      setAlertMessage('Failed to delete question. Please try again.');
      setAlertKey(prev => prev + 1);
    }
  };

      const editQuestion = async (questionId: string) => {
      // Fetch the question details based on the question ID
      const questionToEdit = listQuestion.find(q => q._id === questionId);
      if (questionToEdit) {
            // Set the question content and answers in the input fields
            setQuestion(questionToEdit.content);
            setListAnswers(questionToEdit.options);
            // Set the image URL if present
            if (questionToEdit.imageUrl) {
            setImageUrl(questionToEdit.imageUrl);
            }
            // Scroll to the question input section
            window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      };
  // Function to fetch questions based on quizId
  const fetchQuestions = async (quizId: string) => {
    try {
      const questions = await getQuestions(quizId);
      setListQuestion(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Handle adding a new answer
  const handleSend = () => {
    if (!selectedOptionAnswer) {
      setErrorAnswer("Please select 'Correct' or 'Wrong' before sending the answer.");
      return;
    }
    if (answer.trim()) {
      setErrorAnswer('');
      const newAnswer: QuestionOption = {
        text: answer.trim(),
        isCorrect: selectedOptionAnswer === 'Correct'
      };
      setListAnswers(prev => [...prev, newAnswer]);
      setAnswer('');
    } else {
      setErrorAnswer("Answer cannot be empty.");
    }
  };

  // Handle editing an existing answer
  const handleEdit = (index: number, text: string) => {
    setEditIndex(index);
    setEditText(text);
  };

  // Save the edited answer
  const saveEdit = (index: number) => {
    if (editText.trim().length === 0) {
      setErrorAnswer("Answer cannot be empty.");
      return;
    }
    const updatedAnswers = listAnswers.map((item, i) =>
      i === index ? { ...item, text: editText.trim() } : item
    );
    setListAnswers(updatedAnswers);
    setEditIndex(null);
    setEditText('');
    setErrorAnswer('');
  };

  // Handle deleting an answer
  const deleteAnswer = (index: number) => {
    const updatedAnswers = listAnswers.filter((_, i) => i !== index);
    setListAnswers(updatedAnswers);
    // If deleting the answer being edited, reset edit states
    if (editIndex === index) {
      setEditIndex(null);
      setEditText('');
    }
  };

  // Handle changes in radio button selections
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleOptionChangeAnswer = (value: string) => {
    setSelectedOptionAnswer(value);
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'abderrahimkhadri');

      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dtyac3ekm/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        console.error('Upload response error:', uploadResponse.statusText);
        throw new Error('Failed to upload image');
      }

      const data = await uploadResponse.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error during image upload:', error);
      throw new Error('Failed to upload image');
    }
  };

  // Handle saving a new question
  const saveQuestion = async () => {
    let imageUploadUrl = '';
    if (imageFile) {
      try {
        imageUploadUrl = await handleImageUpload(imageFile);
      } catch (error) {
        setErrorAnswer('Image upload failed. Please try again.');
        return;
      }
    }

    try {
      if (listAnswers.length > 1) {
        const questionData = {
          content: question.trim(),
          options: listAnswers,
          imageUrl: imageUploadUrl,
          quizId: quiz._id,
        };

        await createQuestion(questionData);
        setQuestion('');
        setImageFile(null);
        setImageUrl('');
        setListAnswers([]);
        await fetchQuestions(quiz._id);
        setAlertType('success');
        setAlertMessage('Question added successfully.');
        setAlertKey(prev => prev + 1);
      } else {
        setErrorAnswer('Please provide at least two answers.');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      setErrorAnswer('Failed to create question. Please try again.');
    }
  };

  // Handle creating or updating a quiz
  const setQuizFunction = async () => {
    try {
      if (!title.trim() || !description.trim()) {
        setAlertType('warning');
        setAlertMessage('Please fill in the title and description.');
        setAlertKey(prev => prev + 1);
        return;
      }
      if (description.length < 30) {
        setAlertType('warning');
        setAlertMessage('Description must be at least 30 characters long.');
        setAlertKey(prev => prev + 1);
        return;
      }

      const quizData = {
        title: title.trim(),
        description: description.trim(),
        isPublic: selectedOption === 'publish',
        allowedUsers: [],
        showAnswers: selectedOptionAnswer === 'show answer' ? 'show' : 'hide',
        createdBy: dispatch.userID // Assuming `userID` is stored in Redux
      };

      const quizReq = await createQuiz(quizData);
      setQuiz(quizReq);
      setAlertType('success');
      setAlertMessage('Quiz created successfully.');
      setAlertKey(prev => prev + 1);
      setIsDisabled(true);
      navigate(`/list/${quizReq._id}`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      setAlertType('error');
      setAlertMessage('Failed to create quiz. Please try again.');
      setAlertKey(prev => prev + 1);
    }
  };

  // Render each answer with edit and delete functionalities
  const renderQuestion = ({ text, isCorrect, index }: { text: string; isCorrect: boolean; index: number }) => {
    return (
      <div key={index} className='flex flex-col mb-4 p-4 bg-input rounded shadow'>
        <div className='flex flex-row items-center text-lg'>
          {isCorrect ? (
            <CheckCircleOutlineIcon className='text-green-500 mr-2' sx={{ width: 20, height: 20 }} />
          ) : (
            <HighlightOffIcon className='text-red-500 mr-2' sx={{ width: 20, height: 20 }} />
          )}
          {editIndex === index ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          ) : (
            <span>{text}</span>
          )}
        </div>

        <div className='mt-2'>
          {editIndex === index ? (
            <span
              className='text-sm px-5 underline text-gray-500 hover:text-gray-700 cursor-pointer'
              onClick={() => saveEdit(index)}
            >
              Save
            </span>
          ) : (
            <>
              <span
                className='text-sm px-5 underline text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={() => handleEdit(index, text)}
              >
                Edit
              </span>
              <span
                className='text-sm underline text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={() => deleteAnswer(index)}
              >
                Delete
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background flex flex-col px-40 gap-36 py-10 items-center">
      {/* Alert Component */}
      <Alert key={alertKey} type={alertType} message={alertMessage} />

      {/* Quiz Creation Section */}
      <div className="w-full h-1/2 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Create Quiz</h1>
        <div className="bg-white rounded-xl flex flex-col py-10 px-10 gap-6">
          {/* Quiz Title */}
          <input
            type="text"
            id="titleQuiz"
            name="titleQuiz"
            placeholder="Title"
            autoComplete="text"
            required
            value={title}
            className={`w-full px-10 py-3 border ${isDisabled ? 'border-gray-500 bg-gray-200 cursor-not-allowed' : 'border-gray-300'} border-opacity-40 rounded-sm focus:outline-none ${!isDisabled && 'focus:border-primary focus:ring-1 focus:ring-primary'} bg-input`}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isDisabled}
          />

          {/* Quiz Description */}
          <textarea
            id="descriptionQuiz"
            name="descriptionQuiz"
            placeholder="Description"
            autoComplete="text"
            required
            value={description}
            className="w-full px-10 py-3 h-44 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Quiz Settings */}
          <div className="flex flex-row gap-10 justify-center">
            {/* Publish/Private */}
            <div className="flex justify-start">
              <div className="flex flex-row gap-6">
                <input
                  type="radio"
                  id="publish"
                  name="status"
                  value="publish"
                  checked={selectedOption === 'publish'}
                  onChange={() => handleOptionChange('publish')}
                  className="hidden"
                />
                <label
                  htmlFor="publish"
                  className={`flex items-center cursor-pointer font-mono ${selectedOption === 'publish' ? 'text-black' : 'text-gray-500'}`}
                >
                  <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOption === 'publish' ? 'border-background bg-primary' : 'border-input'}`}></span>
                  Publish
                </label>

                <input
                  type="radio"
                  id="private"
                  name="status"
                  value="private"
                  checked={selectedOption === 'private'}
                  onChange={() => handleOptionChange('private')}
                  className="hidden"
                />
                <label
                  htmlFor="private"
                  className={`flex items-center cursor-pointer font-mono ${selectedOption === 'private' ? 'text-black' : 'text-gray-500'}`}
                >
                  <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOption === 'private' ? 'border-background bg-primary' : 'border-input'}`}></span>
                  Private
                </label>
              </div>
            </div>

            {/* Separator */}
            <div className="border border-primary"></div>

            {/* Show/Hide Answers */}
            <div className="flex justify-start">
              <div className="flex flex-row gap-6">
                <input
                  type="radio"
                  id="showAnswer"
                  name="answerStatus"
                  value="show answer"
                  checked={selectedOptionAnswer === 'show answer'}
                  onChange={() => handleOptionChangeAnswer('show answer')}
                  className="hidden"
                />
                <label
                  htmlFor="showAnswer"
                  className={`flex items-center cursor-pointer font-mono ${selectedOptionAnswer === 'show answer' ? 'text-black' : 'text-gray-500'}`}
                >
                  <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionAnswer === 'show answer' ? 'border-background bg-primary' : 'border-input'}`}></span>
                  Show Answer
                </label>

                <input
                  type="radio"
                  id="hideAnswer"
                  name="answerStatus"
                  value="hide answer"
                  checked={selectedOptionAnswer === 'hide answer'}
                  onChange={() => handleOptionChangeAnswer('hide answer')}
                  className="hidden"
                />
                <label
                  htmlFor="hideAnswer"
                  className={`flex items-center cursor-pointer font-mono ${selectedOptionAnswer === 'hide answer' ? 'text-black' : 'text-gray-500'}`}
                >
                  <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionAnswer === 'hide answer' ? 'border-background bg-primary' : 'border-input'}`}></span>
                  Hide Answer
                </label>
              </div>
            </div>
          </div>

          {/* Save Quiz Button */}
          <PrimaryButton
            className="mx-4"
            label={isDisabled ? 'Update Quiz' : 'Save Quiz'}
            action={setQuizFunction}
            w='6'
            h='3'
          />
        </div>
      </div>

      {/* Question Creation Section */}
      {isDisabled && (
        <div className="w-full flex flex-col">
          <span className="font-bold px-6 py-4 text-xl">Create Question</span>
          <div className="bg-white rounded-xl flex flex-col py-10 px-10 gap-6">
            {/* Error Message */}
            {errorAnswer && <span className="text-red-500">{errorAnswer}</span>}

            {/* Question Input */}
            <input
              type="text"
              id="question"
              value={question}
              name="question"
              placeholder="Write your question here"
              autoComplete="text"
              required
              className="w-full px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
              onChange={(e) => setQuestion(e.target.value)}
            />

            {/* Image Upload */}
            {!imageUrl ? (
              <div className="flex items-center justify-center w-full mb-4">
                <label className="flex flex-col items-center px-4 py-6 rounded-lg tracking-wide uppercase cursor-pointer text-zinc-600 hover:text-zinc-800">
                  <CloudUploadIcon fontSize="large" />
                  <span className="mt-2 text-base leading-normal">Upload an image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImageFile(e.target.files[0]);
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className='flex items-center justify-center w-full mb-4'>
                <div className="relative w-1/3 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                  <img src={imageUrl} alt="Uploaded" className="h-auto object-cover rounded w-full" />
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-40 rounded w-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <label className="flex flex-col items-center px-4 py-6 rounded-lg tracking-wide uppercase cursor-pointer text-zinc-600 hover:text-zinc-800">
                      <CloudUploadIcon fontSize="large" />
                      <span className="mt-2 text-base leading-normal">Change Image</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            setImageFile(e.target.files[0]);
                            setImageUrl('');
                          }
                        }}
                      />
                    </label>
                  </div>
                  <button
                    onClick={() => { setImageFile(null); setImageUrl(''); }}
                    className="absolute top-2 right-2 text-white rounded-full p-2 bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    &#x2715;
                  </button>
                </div>
              </div>
            )}

            {/* List of Answers */}
            {listAnswers.map((item, index) => renderQuestion({ text: item.text, isCorrect: item.isCorrect, index }))}

            {/* New Answer Input */}
            <div className="relative">
              <input
                type="text"
                id="answer"
                value={answer}
                name="answer"
                placeholder="Write your answer here"
                autoComplete="text"
                required
                className="w-full px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                onChange={(e) => setAnswer(e.target.value)}
              />
              <SendIcon
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${answer.trim().length === 0 ? 'cursor-not-allowed' : 'hover:text-primary cursor-pointer'}`}
                sx={{ width: 20, height: 20 }}
                onClick={handleSend}
              />
            </div>

            {/* Correct/Wrong Selection */}
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-10'>
                <input
                  type="radio"
                  id="Correct"
                  name="statusQuestion"
                  value="Correct"
                  checked={selectedOptionAnswer === 'Correct'}
                  onChange={() => handleOptionChangeAnswer('Correct')}
                  className="hidden"
                />
                <label
                  htmlFor="Correct"
                  className={`flex items-center cursor-pointer font-mono ${selectedOptionAnswer === 'Correct' ? 'text-black' : 'text-gray-500'}`}
                >
                  <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionAnswer === 'Correct' ? 'border-background bg-primary' : 'border-input'}`}></span>
                  Correct
                </label>

                <input
                  type="radio"
                  id="Wrong"
                  name="statusQuestion"
                  value="Wrong"
                  checked={selectedOptionAnswer === 'Wrong'}
                  onChange={() => handleOptionChangeAnswer('Wrong')}
                  className="hidden"
                />
                <label
                  htmlFor="Wrong"
                  className={`flex items-center cursor-pointer font-mono ${selectedOptionAnswer === 'Wrong' ? 'text-black' : 'text-gray-500'}`}
                >
                  <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionAnswer === 'Wrong' ? 'border-background bg-primary' : 'border-input'}`}></span>
                  Wrong
                </label>
              </div>
              <PrimaryButton
                className='mx-4'
                label='Save Question'
                action={saveQuestion}
                w='6'
                h='3'
              />
            </div>
          </div>
        </div>
      )}

      {/* Instruction Section (Visible when quiz is not created) */}
      {!isDisabled && (
        <div className='flex flex-col w-full'>
          {[
            {
              title: "Quiz Title",
              description: "Enter a clear and concise title for your quiz. This will help users understand the main topic or purpose of the quiz."
            },
            {
              title: "Quiz Description",
              description: "Provide a detailed description of the quiz. Include any important information or instructions that participants need to know before starting the quiz."
            },
            {
              title: "Question Types",
              description: "Add different types of questions to your quiz, such as multiple-choice, true/false, or short answer questions. Make sure each question is clear and unambiguous."
            },
            {
              title: "Answer Options",
              description: "For each question, provide multiple answer options and mark the correct answer. Ensure that the answers are clear and distinct from each other."
            },
            {
              title: "Quiz Settings",
              description: "Customize the settings for your quiz. Decide if it should be public or private, and set preferences for displaying correct answers and managing user permissions."
            }
          ].map((item, index) => (
            <ToggleP title={item.title} description={item.description} key={index} py={6} />
          ))}
        </div>
      )}

      {/* Displaying Existing Questions */}
      {listQuestion.length > 0 && listQuestion.map((questionItem, index) => (
         <QuestionCard
          key={questionItem._id} // Use question ID as the key
          question={questionItem}
          deleteQuestion={deleteQuestionID} // Pass the delete function
          editQuestion={editQuestion} // Pass the edit function (optional)
        />
      ))}
    </div>
  );
};

export default ListQuiz;
