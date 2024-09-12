import React from 'react';

// Define TypeScript interface for CategoryCard props
interface CategoryCardProps {
  title: string;
  description: string;
  backgroundColor: string;
}

// Define CategoryCard component with typed props
const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, backgroundColor }) => {
  return (
    <div 
      className="p-4 rounded-md shadow-lg flex flex-col items-start text-white"
      style={{ backgroundColor, width: '200px', height: '200px' }} // Adjusted size for better mobile responsiveness
    >
      <div className="mb-3">
        {/* Display the first letter of the title as a visual element */}
        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full">
          <span className="text-center text-lg font-semibold text-red-600">{title.charAt(0)}</span>
        </div>
      </div>
      <h2 className="font-bold text-lg mb-1">{title}</h2>
      <p className="text-xs">{description}</p>
    </div>
  );
};

// Sample data for quiz categories
const quizCategories = [
  {
    title: 'Math',
    description: 'Sky was cloudless and of a deep dark blue spectacle before us was indeed.',
    backgroundColor: '#FF204E', // Red background color
  },
  {
    title: 'English',
    description: 'Even the all-powerful Pointing has no control about the blind texts.',
    backgroundColor: '#FF204E', // Red background color
  },
  {
    title: 'Science',
    description: 'Unorthographic life One day however a small line of blind text.',
    backgroundColor: '#FF204E', // Red background color
  },
  {
    title: 'Bangla',
    description: 'However a small line of blind text by the name.',
    backgroundColor: '#FF204E', // Red background color
  },
  {
    title: 'General Knowledge',
    description: 'Text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
    backgroundColor: '#FF204E', // Red background color
  },
];

// Define QuizCategories component
const QuizCategories: React.FC = () => {
  return (
    <section className="p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full max-w-4xl px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Explore Our Quiz Categories</h1>
        <button className="border border-black px-4 py-2 rounded-full text-sm md:text-base">Explore All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {quizCategories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            description={category.description}
            backgroundColor={category.backgroundColor}
          />
        ))}
      </div>
    </section>
  );
};

export default QuizCategories;
