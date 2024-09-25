import React from 'react';
import googlePlayIcon from "../assets/images/google-play.png";
import appleStoreIcon from "../assets/images/apple-store.png";
import phoneImage from "../assets/images/your-phone-image.png";
// Update with actual path

const AppDownloadSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-[#FF204E] to-[#D70027] p-4 rounded-lg shadow-lg">
            {/* Mobile Image on the left */}
            <div className="flex-1 flex justify-center mb-4 md:mb-0">
                <img 
                    src={phoneImage} 
                    alt="Phone Mockup" 
                    className="w-48 h-auto" 
                />
            </div>

            {/* Icons and description on the right */}
            <div className="flex-1 flex flex-col items-start md:ml-2">
                <h2 className="text-2xl font-bold text-white mb-1">
                    Download Our App Now!
                </h2>
                <h3 className="text-xl font-semibold text-white mb-1">
                    Quezzy
                </h3>
                <p className="text-md text-white mb-1">
                    Experience seamless navigation, exclusive features,
                </p>
                <p className="text-md text-white mb-1">
                    and personalized content right at your fingertips.
                </p>
                <p className="text-md text-white mb-4">
                    Get started today and unlock your potential!
                </p>
                <div className="flex items-center">
                    <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                        <img src={googlePlayIcon} alt="Google Play Store" className="w-32 h-32 object-contain mr-2" />
                    </a>
                    <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                        <img src={appleStoreIcon} alt="Apple App Store" className="w-32 h-32 object-contain" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AppDownloadSection;
