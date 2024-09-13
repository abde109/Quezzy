import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Quezzy */}
                    <div>
                        <h3 className="text-2xl font-bold mb-2">
                            <span className="text-[#FF204E]">Que</span>
                            <span className="text-black">zzy</span>
                        </h3>
                        <p className="text-gray-700 text-lg">
                            Quezzy is your ultimate destination for engaging and interactive educational quizzes. 
                            Designed to make learning fun and effective.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-lg">
                            <li><a href="#" className="text-gray-700 hover:text-[#FF204E]">Home</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-[#FF204E]">About Us</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-[#FF204E]">Contact Us</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-[#FF204E]">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Small Features */}
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Small Features</h3>
                        <ul className="space-y-1 text-gray-700 text-lg">
                            <li>1. Live Chat Support</li>
                            <li>2. User Analytics</li>
                            <li>3. Search Functionality</li>
                            <li>4. Bookmarking</li>
                            <li>5. Notification System</li>
                            <li>6. Feedback Form</li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Icons and Copyright */}
                <div className="mt-12 text-center">
                    <div className="space-x-6 mb-4">
                        <a href="https://facebook.com" className="text-gray-700 hover:text-[#FF204E]" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook text-2xl"></i>
                        </a>
                        <a href="https://instagram.com" className="text-gray-700 hover:text-[#FF204E]" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram text-2xl"></i>
                        </a>
                        <a href="https://twitter.com" className="text-gray-700 hover:text-[#FF204E]" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter text-2xl"></i>
                        </a>
                        <a href="https://whatsapp.com" className="text-gray-700 hover:text-[#FF204E]" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp text-2xl"></i>
                        </a>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Copyright © 2024 Quezzy. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
