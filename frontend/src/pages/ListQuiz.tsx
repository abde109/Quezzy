import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IQuestion, createQuestion, getQuestions } from '../api/IQuestion';
import { createQuiz, getQuizById } from '../api/IQuizApi';
import { QuestionOption } from '../api/questionOption';
import Alert from '../components/Alert';
import PrimaryButton from "../components/PrimaryButton";
import QuestionCard from '../components/QuestionCard';
import ToggleP from '../components/ToggleP';

const ListQuiz: React.FC = () => { 


      const listInstruction = [
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
      ];
      


      const navigate = useNavigate();
      const { quizId } = useParams<{ quizId: string }>();
      const [selectedOption, setSelectedOption] = useState<string>();
      const [selectedOptionAnswer, setSelectedOptionAnswer] = useState<string>();
      const [selectedOptionQuestion, setSelectedOptionQuestion] = useState<string>();
      const [answer, setanswer] = useState('');
      const [listAnswers, setListAnswers] = useState<QuestionOption[]>([]);
      const [errorAnswer, setErrorAnswer] = useState<string>('');
      const [editIndex, setEditIndex] = useState<number | null>(null);
      const [editText, setEditText] = useState<string>('');
      const [Title, setTitle] = useState<string>() 
      const [Description, setDescription] = useState<string>()
      const userState = useSelector((state: any) => state.user);
      const [alertKey, setAlertKey] = useState<number>(0);
      const [alertType, setAlertType] = useState<'success' | 'warning' | 'error'>('error');
      const [alertMessage, setAlertMessage] = useState<string>('');
      const [isDisabled, setIsDisabled] = useState<boolean>(false);
      const [quiz, setquiz] = useState<any>()
      const [question, setquestion] = useState<string>()
      const [imageFile, setImageFile] = useState<File | null>(null);
      const [imageUrl, setImageUrl] = useState<string>('');
      const [listQuestion , setlistQuestion] = useState<IQuestion[]>([])


      const fetchQuestions = async (quizId: string) => {
            try {
                  const questions = await getQuestions(quizId);
                  setlistQuestion(questions);
                  
            } catch (error) {
                  console.error('Error fetching questions:', error);
            }
      };

                  
 
      const handleSend = () => {
            if (!selectedOptionQuestion) {
                  setErrorAnswer("Please select 'Correct' or 'Wrong' before sending the answer.")
                  return;
            }
            if (answer.trim()) {
                  errorAnswer && setErrorAnswer('');
                  const newAnswer: QuestionOption = { text: answer, isCorrect: selectedOptionQuestion === 'Correct' };
                  const updatedAnswers = [...listAnswers, newAnswer];
                  setListAnswers(updatedAnswers);
                  setanswer('');
            }
      };

      const handleEdit = (index: number, text: string) => {
            setEditIndex(index);
            setEditText(text);
      };

      const saveEdit = (index: number) => {
            if (editText.trim().length === 0) { 
                  setErrorAnswer("is Empty set the Answer")
                  return;
            }
            errorAnswer && setErrorAnswer('');
            const updatedAnswers = listAnswers.map((item, i) => i === index ? { ...item, text: editText } : item);
            setListAnswers(updatedAnswers);
            setEditIndex(null);
            setEditText('');
            };

      
      const handleOptionChange = (changeEvent: any) => {
            setSelectedOption(changeEvent);
      };

      const handleOptionChangeAnswer = (changeEvent: any) => {
            setSelectedOptionAnswer(changeEvent);
      };

      const handleOptionChangeQuestion = (changeEvent: any) => {
            setSelectedOptionQuestion(changeEvent);
      };

      const deleteAnswer = (index: number) => { 
            const updatedAnswers = listAnswers.filter((_, i) => i !== index);
            setListAnswers(updatedAnswers);
      }

      const saveQuestion = async () => {

            let imageUploadUrl = '';
            if (imageFile) {
                  imageUploadUrl = await handleImageUpload(imageFile);
            }
            
            try {
                  if (listAnswers.length > 1) { 

                        const questionData = {
                              content: question,
                              options: listAnswers,
                              imageUrl: imageUploadUrl,
                              quizId: quiz._id,
                        }
      
                        const questionQuery = await createQuestion(questionData)
                        console.log(questionQuery);
                        setquestion('');
                        setImageFile(null);
                        setImageUrl('');
                        setListAnswers([]);
                        fetchQuestions(quiz._id)
                  } else {
                        setErrorAnswer('set menimum 2 answer')
                  }
                  
            } catch (error) {
                  console.error('Error creating quiz:', error);
            }
            
      }

      const setQuiz = async () => {
            try {

                  if (!Title?.trim() || !Description?.trim()) {
                        setAlertType('warning');
                        setAlertMessage('Please fill in the title and description');
                        setAlertKey(prev => prev + 1);
                  } else if (!selectedOption?.trim() || !selectedOptionAnswer?.trim()) {
                        setAlertType('warning');
                        setAlertMessage('Please select the status of answers');
                        setAlertKey(prev => prev + 1);
                  } else {
                        const quizData = {
                              title: Title,
                              description: Description,
                              isPublic: selectedOption === 'publish',
                              allowedUsers: [],
                              showAnswers: selectedOptionAnswer === 'show answer' ? 'show' : 'hide',
                              createdBy: userState.userID
                        };

                        const quizReq = await createQuiz(quizData);
                        setquiz ( quizReq );
                        setAlertType('success');
                        if (isDisabled) {
                              setAlertMessage('Your successfully Update a quiz');
                        }else{
                              setAlertMessage('Your successfully created a quiz');
                        }
                        
                        setAlertKey(prev => prev + 1);
                        setIsDisabled(true);

                        navigate(`/list/${quizReq._id}`);

                  }
            } catch (error) {
                  console.error('Error creating quiz:', error);
            }
      };




      const randerQuestion = ({ text, isCorrect, index }: { text: string, isCorrect: boolean, index: number }) => {
            return (
            <span key={index} className=''>
                  <div className='flex flex-col'>
                  <div className='flex flex-row items-center text-lg'>
                  {
                        !isCorrect ? <HighlightOffIcon className='text-primary mx-2' sx={{ width: 20, height: 20 }} />
                        : <CheckCircleOutlineIcon className='text-green-500 mx-2' sx={{ width: 20, height: 20 }} />
                  }
                  {editIndex === index ? (
                        <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full md:w-full px-3 py-1 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary "
                        />
                  ) : (
                        text
                  )}
                  </div>

                  <div>
                  {editIndex === index ? (
                        <span
                        className='text-sm px-5 underline text-gray-500 hover:text-gray-700 cursor-pointer'
                        onClick={() => saveEdit(index)}
                        >
                        save
                        </span>
                  ) : (
                        <>
                        <span
                        className='text-sm px-5 underline text-gray-500 hover:text-gray-700 cursor-pointer'
                        onClick={() => handleEdit(index, text)}
                        >
                        edit
                        </span>
                        <span
                        className='text-sm underline text-gray-500 hover:text-gray-700 cursor-pointer'
                        onClick={() => deleteAnswer(index)}
                        >
                        delete
                        </span>
                        </>
                  )}
                  </div>
                  </div>
            </span>
            );
      };

            const handleImageUpload = async (file: File) => {
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
      
      
            useEffect(() => {
            if (quizId) {
                  const fetchQuizAndQuestions = async () => {
                        try {
                              const fetchedQuiz = await getQuizById(quizId);
                              setTitle(fetchedQuiz.title)
                              setDescription(fetchedQuiz.description)
                              setIsDisabled(true);
                              handleOptionChange(fetchedQuiz.isPublic ? 'publish' : 'private')
                              handleOptionChangeAnswer(fetchedQuiz.showAnswers === 'show' ? 'show answer' : 'hide answer')
                              setquiz(fetchedQuiz);
                              fetchQuestions(quizId);
                        } catch (error) {
                        console.error('Error fetching quiz and questions:', error);
                        }
                  };
                  fetchQuizAndQuestions();
            }
            }, [quizId]);




      return (
            
            <div className="bg-background flex flex-col px-40 gap-36 py-20 items-center">
                  <Alert key={alertKey} type={alertType} message={alertMessage} />

                  
                  <div className="w-full h-1/2 flex flex-col">
                        <span className="font-bold px-6 py-4 text-xl">Create Quiz</span>
                        <div className=" bg-white rounded-xl flex flex-col py-10 px-10 gap-6">
                              <input 
                                    type="text"
                                    id="titleQuiz"
                                    name="titleQuiz"
                                    placeholder="Title"
                                    autoComplete="text"
                                    required
                                    value={Title}
                                    className={`w-full md:w-full px-10 py-3 border ${isDisabled ? 'border-gray-500 bg-gray-200 cursor-not-allowed' : 'border-gray-300'} border-opacity-40 rounded-sm focus:outline-none ${isDisabled ? '' : 'focus:border-primary focus:ring-1 focus:ring-primary'} bg-input`}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isDisabled}
                              />
                              <textarea
                                    id="descriptionQuiz"
                                    name="descriptionQuiz"
                                    placeholder="Description"
                                    autoComplete="text"
                                    required
                                    value={Description}
                                    className="w-full md:w-full px-10 py-3 h-44 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                                    onChange={(e) => setDescription(e.target.value)}
                              />

                              <div className="flex flex-row gap-10 justify-center">
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
                                                      publish
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
                                                      private
                                                      </label>
                                          
                                    </div>
                                    </div>
                                    
                                    <div className="border border-primary">
                                          
                                    </div>
                                    <div className="flex justify-start">
                                          <div className="flex flex-row gap-6">
                                                <input 
                                                      type="radio"
                                                      id="show answer"
                                                      name="status"
                                                      value="show answer"
                                                      checked={selectedOptionAnswer === 'show answer'}
                                                      onChange={() => handleOptionChangeAnswer('show answer')}
                                                      className="hidden"
                                                      />
                                                      <label
                                                            htmlFor="show answer"
                                                            className={`flex items-center cursor-pointer font-mono ${selectedOptionAnswer === 'show answer' ? 'text-black' : 'text-gray-500'}`}
                                                      >
                                                      <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionAnswer === 'show answer' ? 'border-background bg-primary' : 'border-input'}`}></span>
                                                      show answer
                                                      </label>
                                                <input 
                                                      type="radio"
                                                      id="hide answer"
                                                      name="status"
                                                      value="hide answer"
                                                      checked={selectedOptionAnswer === 'hide answer'}
                                                      onChange={() => handleOptionChangeAnswer('hide answer')}
                                                      className="hidden"
                                                      />
                                                      <label
                                                            htmlFor="hide answer"
                                                            className={`flex items-center cursor-pointer font-mono ${selectedOptionAnswer === 'hide answer' ? 'text-black' : 'text-gray-500'}`}
                                                      >
                                                      <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionAnswer === 'hide answer' ? 'border-background bg-primary' : 'border-input'}`}></span>
                                                      hide answer
                                                      </label>
                                          
                                    </div>
                              </div>
                              
                              </div>

                              

                              <PrimaryButton className= { `md:mx-4  mx-4` } label='Save Quiz' action={setQuiz} w='6' h='3'/>

                              

                        </div>
                  </div>
                  
                  {
                        isDisabled ? <div className="w-full flex flex-col">
                        <span className="font-bold px-6 py-4 text-xl">Create Question</span>
                        <div className="bg-white rounded-xl flex flex-col py-10 px-10 gap-6">
                              <span className='text-primary'>{errorAnswer}</span>
                              <input 
                                    type="text"
                                    id="question"
                                    value={question}
                                    name="question"
                                    placeholder="Write your Question  here"
                                    autoComplete="text"
                                    required
                                    className="w-full md:w-full px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                                    onChange={(e) => setquestion(e.target.value)}
                                    />
                                  {!imageUrl && (
                                    <div className="flex items-center justify-center w-full mb-4">
                                          <label className="flex flex-col items-center px-4 py-6 rounded-lg tracking-wide uppercase cursor-pointer text-zinc-600 hover:text-zinc-800">
                                                <CloudUploadIcon fontSize="large" />
                                                <span className="mt-2 text-base leading-normal">Upload an image</span>
                                                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                                            if (e.target.files) {
                                                                  setImageFile(e.target.files[0]);
                                                                  setImageUrl(URL.createObjectURL(e.target.files[0]));
                                                            }
                                                      }} />
                                          </label>
                                          </div>
                                          )}

                                    {imageUrl && (
                                          <div className='flex items-center justify-center w-full mb-4'>
                                                <div className="relative w-1/3 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                                                <img src={imageUrl} alt="Uploaded" className="h-auto object-cover rounded w-full" />
                                                <div 
                                                      className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-40 rounded w-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                                                >
                                                <label className="flex flex-col items-center px-4 py-6 rounded-lg tracking-wide uppercase cursor-pointer text-zinc-600 hover:text-zinc-800">
                                                      <CloudUploadIcon fontSize="large" />
                                                      <span className="mt-2 text-base leading-normal">Upload an image</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => { if (e.target.files) {
                                                      setImageFile(e.target.files[0]);
                                                      setImageUrl(''); 
                                                      }
                                                      }} />
                                                </label>
                                                </div>
                                                <button 
                                                      onClick={() => { setImageFile(null); setImageUrl(''); }} 
                                                      className="absolute top-2 right-2  text-white rounded-full p-2"
                                                >
                                                      &#x2715;
                                                </button>
                                                </div>
                                          </div>
                                          )}






                              {listAnswers.map((item, index) => (
                                    randerQuestion({ text: item.text , isCorrect: item.isCorrect , index })
                              ))}
                              <div className="relative">
                                    <input 
                                          type="text"
                                          id="answer"
                                          value={answer}
                                          name="answer"
                                          placeholder="Write your answer here"
                                          autoComplete="text"
                                          required
                                          className="w-full md:w-full px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                                          onChange={(e) => setanswer(e.target.value)}
                                    />
                                    <SendIcon
                                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${answer.trim().length === 0 ? 'cursor-not-allowed': 'hover:text-primary cursor-pointer'} `}
                                          sx={{ width: 20, height: 20 }}
                                          onClick={handleSend}
                                    />
                              </div>
                              
                              <div className='flex flex-row justify-between'>
                              
                                    <div className='flex flex-row gap-10'>
                                          <input 
                                                type="radio"
                                                id="Correct"
                                                name="status"
                                                value="Correct"
                                                checked={selectedOptionQuestion === 'Correct'}
                                                onChange={() => handleOptionChangeQuestion('Correct')}
                                                className="hidden"
                                          />
                                          <label
                                                htmlFor="Correct"
                                                className={`flex items-center cursor-pointer font-mono ${selectedOptionQuestion === 'Correct' ? 'text-black' : 'text-gray-500'}`}
                                          >
                                          <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionQuestion === 'Correct' ? 'border-background bg-primary' : 'border-input'}`}></span>
                                                Correct
                                          </label>
                                          <input 
                                                type="radio"
                                                id="Wrong"
                                                name="status"
                                                value="Wrong"
                                                checked={selectedOptionQuestion === 'Wrong'}
                                                onChange={() => handleOptionChangeQuestion('Wrong')}
                                                className="hidden"
                                          />
                                          <label
                                                htmlFor="Wrong"
                                                className={`flex items-center cursor-pointer font-mono ${selectedOptionQuestion === 'Wrong' ? 'text-black' : 'text-gray-500'}`}
                                          >
                                          <span className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${selectedOptionQuestion === 'Wrong' ? 'border-background bg-primary' : 'border-input'}`}></span>
                                                Wrong
                                          </label>
                                    </div>
                                    <PrimaryButton className='md:mx-4 mx-4' label='Save Answer' action={saveQuestion} w='6' h='3'/>
                              </div>

                              


                        </div>

                        </div> : <div className='flex flex-col w-full'>
                                    {listInstruction.map((item, index) => (
                                          <ToggleP title={item.title} description={item.description} key={index} py={6} />
                                    ))}
                              </div>
                  }

                  
                  {
                        listQuestion.length > 0 && listQuestion.map((question, index) => (
                        <QuestionCard key={index} question={question} />
                        ))
                        }
                  
                  
            </div>
      )
}

export default ListQuiz

