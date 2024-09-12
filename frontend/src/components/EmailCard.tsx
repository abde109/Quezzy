import React, { useState } from 'react';

const EmailCard: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Email submitted:', email);
    };

    return (
        <div className="w-full bg-[#D9D9D9] py-8">
            <div className="max-w-lg mx-auto bg-[#D9D9D9] text-black px-6 py-8 rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-left mb-4 w-full">
                    Stay Updated! Join our mailing list
                </h2>
                <p className="text-lg md:text-xl text-left mb-6">
                    Get the latest updates, news, and exclusive offers delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col items-start space-y-4 w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-white rounded-md px-4 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                    />
                    <button
                        type="submit"
                        className="bg-[#FF204E] text-white font-medium py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 w-full"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailCard;

