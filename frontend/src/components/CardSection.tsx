import React from 'react';

interface CardProps {
    title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
    return (
        <div className="bg-white text-black px-4 py-6 sm:px-6 rounded-lg shadow-md text-center hover:bg-gray-100 cursor-pointer transition duration-300 mb-4 sm:mb-6 w-full sm:w-48 h-48 flex items-center justify-center">
            <p className="font-bold text-lg sm:text-xl">{title}</p>
        </div>
    );
};

const CardSection: React.FC = () => {
    return (
        <div className="bg-[#FF204E] py-8 sm:py-12 px-4 sm:px-6">
            <h1 className="text-white text-center mb-8 sm:mb-10 font-bold text-xl sm:text-2xl md:text-4xl">We Are Here to Serve You</h1>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 lg:space-x-12 xl:space-x-16">
                {/* Student Card */}
                <Card title="Student" />

                {/* Teacher Card */}
                <Card title="Teacher" />

                {/* Enterprise Card */}
                <Card title="Enterprise" />

                {/* Candidate Card */}
                <Card title="Candidate" />
            </div>
        </div>
    );
};

export default CardSection;
