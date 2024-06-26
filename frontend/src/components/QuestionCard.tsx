import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IQuestion } from '../api/IQuestion';


const QuestionCard = ({ question }: { question: IQuestion }) => {

  const handleEdit = () => {
    console.log(`Edit question with id: ${question._id}`);
  };

  const handleDelete = () => {
    console.log(`Delete question with id: ${question._id}`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background">
      <div className='relative w-full'>
        <div className="border px-6 py-8 bg-white rounded-lg w-full">
          <h1 className="text-3xl mb-4">{question.content}</h1>
          {question.imageUrl && <img src={question.imageUrl} alt="Question" className="mb-4" />}
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
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <div className='absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg top-2 left-2 pointer-events-none'></div>
      </div>
    </div>
  );
}

export default QuestionCard;
