import React, { useEffect, useState } from 'react';
import { getUser } from '../api/profile'; // Adjust the import path as needed
import { IProfile } from '../types/profileType'; // Adjust the path to your type file
import QuizDo from '../components/QuizDo'; // Import your QuizDo component
import QuizActivityDashboard from '../components/QuizActivityDashboard'; // Import the new dashboard component
import profile_image from "../assets/images/profile.png";

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'quiz' | 'activity'>('profile'); // Add 'activity' tab for activity view

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUser();
                console.log('Settings API Response:', response); // Debug log
                setProfile(response.user);
            } catch (err) {
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Handle switching between tabs
    const handleTabClick = (tab: 'profile' | 'quiz' | 'activity') => {
        setActiveTab(tab);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Back to Home */}
            <div className="text-red-500 text-sm">
            <a href="/" className="font-bold border-b border-red-500 text-lg">
            back to home
            </a>
            </div>

            {/* Tabs Section */}
            <div className="flex mt-6">
                <p
                    className={`mr-6 font-bold ${activeTab === 'profile' ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleTabClick('profile')}
                    style={{ cursor: 'pointer' }}
                >
                    Profile
                </p>
                <p
                    className={`mr-6 font-bold ${activeTab === 'quiz' ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleTabClick('quiz')}
                    style={{ cursor: 'pointer' }}
                >
                    Quiz do
                </p>
                <p
                    className={`font-bold ${activeTab === 'activity' ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleTabClick('activity')}
                    style={{ cursor: 'pointer' }}
                >
                    Activity
                </p>
            </div>

            {/* Conditional Rendering: Show Profile, QuizDo, or Quiz Activity Dashboard based on activeTab */}
            {activeTab === 'profile' && (
                <div>
                    {/* Profile Info Card */}
                    {profile ? (
                        <div className="bg-white rounded-lg shadow-lg p-6 mt-4 grid grid-cols-3 gap-4">
                            {/* Left Column - Profile Image and Basic Info */}
                            <div className="flex flex-col items-start">
                                {/* Profile Image */}
                               
                          
                                <img
                                src={profile_image} // Replace with the actual image URL
                                alt={`${profile.username}'s profile`}
                                className="bg-gray-300 rounded-full h-48 w-48"
                                />
                                {/* Profile Image Placeholder */}
                                <p className="mt-2">
                                    <span className="font-bold">{profile.username || 'Unknown Username'}</span>
                                    <p>{profile.profileType || 'Unknown Profile Type'}</p>
                                </p>
                                <button
                                    className="bg-[#FF204E] text-white py-1 px-3 rounded-md mt-2"
                                    onClick={() => handleTabClick('activity')} // Switch to 'activity' tab on click
                                >
                                    View Activity
                                </button>
                            </div>

                            {/* Middle Column - Role and Account Info */}
                            <div>
                                <p className="font-bold">Ranking Level</p>
                                <p>{profile.level || 'No level provided'}</p>

                                <p className="font-bold">Account Type</p>
                                <p>{profile.profileType || 'No profile type provided'}</p>

                                <p className="font-bold mt-4">Address</p>
                                <p>{profile.address || 'No address provided'}</p>

                                <p className="font-bold mt-4">Website</p>
                                <p>{profile.website || 'No website provided'}</p>
                            </div>

                            {/* Right Column - Misc Info */}
                            <div>
                                <p className="font-bold">Email</p>
                                <p>{profile.email || 'No email provided'}</p>

                                <p className="font-bold">Date of Birth</p>
                                <p>{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'No date of birth provided'}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No profile data available.</p>
                    )}

                    {/* Sidebar, About Section, and Invite Section go here */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {/* Sidebar: Social Links */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="font-bold mb-4">SOCIAL LINKS</p>
                            {profile && profile.socialLinks ? (
                                <>
                                    {profile.socialLinks.facebook && (
                                        <div className="mb-2">
                                            <strong>Facebook:</strong> <a href={profile.socialLinks.facebook} className="text-blue-500">{profile.socialLinks.facebook}</a>
                                        </div>
                                    )}
                                    {profile.socialLinks.twitter && (
                                        <div className="mb-2">
                                            <strong>Twitter:</strong> <a href={profile.socialLinks.twitter} className="text-blue-500">{profile.socialLinks.twitter}</a>
                                        </div>
                                    )}
                                    {profile.socialLinks.linkedin && (
                                        <div className="mb-2">
                                            <strong>LinkedIn:</strong> <a href={profile.socialLinks.linkedin} className="text-blue-500">{profile.socialLinks.linkedin}</a>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p>No social links available.</p>
                            )}
                        </div>

                        {/* About Section */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="font-bold text-lg mb-2">ABOUT</p>
                            {profile?.about ? (
                                <p>{profile.about}</p>
                            ) : (
                                <p>No about information available.</p>
                            )}
                        </div>

                        {/* Invite Section */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <p className="font-bold  mb-4">Invite</p>
                            <input
                                type="text"
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Search"
                            />
                            {/* Placeholder invitees */}
                            <ul>
                                <li className="flex justify-between items-center mb-2">
                                    <span>Leo Messi</span>
                                    <button className="bg-[#FF204E] text-white py-1 px-3 rounded-md">Invite</button>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <span>Cristiano Ronaldo</span>
                                    <button className="bg-[#FF204E] text-white py-1 px-3 rounded-md">Invite</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Render QuizDo component when 'quiz' tab is active */}
            {activeTab === 'quiz' && <QuizDo />}

            {/* Render Quiz Activity Dashboard when 'activity' tab is active */}
            {activeTab === 'activity' && <QuizActivityDashboard />}
        </div>
    );
};

export default Profile;
