import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../api/setting';
import { IUser } from '../types/userType';

const Setting = () => {
    const [settings, setSettings] = useState<IUser | null>(null);
    const [username, setUsername] = useState<string>();
    const [gmail, setGmail] = useState<string>();
    const [profileType, setProfileType] = useState<string>();
    const [about, setAbout] = useState<string>();
    const [website, setWebsite] = useState<string>();
    const [address, setAddress] = useState<string>();
const [dateOfBirth, setDateOfBirth] = useState<string>();
    const [socialLinks, setSocialLinks] = useState({
        facebook: 'https://facebook.com/',
        twitter: 'https://twitter.com/',
        linkedin: 'https://linkedin.com/',
    });
    const [level, setLevel] = useState<string>('Beginner');
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getSettings();
                const user = response.user;
                console.log("------------->"+user.about);
                
                setSettings(user ? user : '');
                setUsername(user.username  ? user.username : '');
                setGmail(user.email ? user.email : '');
                setProfileType(user.profileType ? user.profileType : '');
                setAbout(user.about ? user.about : '');
                setWebsite(user.website ? user.website : '');
                setAddress(user.address ? user.address : '');
                setDateOfBirth(user.dateOfBirth ? user.dateOfBirth : '');
                setSocialLinks(user.socialLinks ? user.socialLinks : '');
                setLevel(user.level);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch settings.');
            }
        };
      
        
        fetchSettings();
    }, []);

    const handleSaveAll = async () => {
        if (settings) {
            const updatedData = {
                ...settings,
                username,
                email: gmail,
                profileType,
                about,
                website,
                address,
                dateOfBirth,
                socialLinks,
                level,
            };
            try {
                await updateSettings(updatedData);
            } catch (err) {
                console.error(err);
                setError('Failed to update settings.');
            }
        }
    };

    const handleEditToggle = (section: string) => {
        setEditingSection(editingSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Profile Menu with Circular Image */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        <img
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold">{username || 'No Username'}</h2>
                        <p className="text-gray-600">{profileType || 'No Profile Type'}</p>
                        <p className="text-gray-600 mt-2">Level: {level || 'No Level Set'}</p>
                        <p className="text-gray-600">Date of Birth: {dateOfBirth || 'No Date Set'}</p>
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {/* Username Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-4">USERNAME</h4>
                    {editingSection === 'username' ? (
                        <div>
                            <input
                                type="text"
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-md"
                                onClick={() => handleEditToggle('username')}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>{username || 'No username set'}</p>
                            <button
                                className="text-blue-500 underline mt-2"
                                onClick={() => handleEditToggle('username')}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                {/* Gmail Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-4">GMAIL</h4>
                    {editingSection === 'gmail' ? (
                        <div>
                            <input
                                type="email"
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                value={gmail}
                                onChange={(e) => setGmail(e.target.value)}
                                placeholder="Gmail"
                            />
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-md"
                                onClick={() => handleEditToggle('gmail')}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>{gmail || 'No email provided'}</p>
                            <button
                                className="text-blue-500 underline mt-2"
                                onClick={() => handleEditToggle('gmail')}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Type Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-4">PROFILE TYPE</h4>
                    {editingSection === 'profileType' ? (
                        <div>
                            <input
                                type="text"
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                value={profileType}
                                onChange={(e) => setProfileType(e.target.value)}
                                placeholder="Profile Type"
                            />
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-md"
                                onClick={() => handleEditToggle('profileType')}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>{profileType || 'No profile type set'}</p>
                            <button
                                className="text-blue-500 underline mt-2"
                                onClick={() => handleEditToggle('profileType')}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold mb-4">ABOUT</h4>
                {editingSection === 'about' ? (
                    <div>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="About"
                        />
                        <button
                            className="bg-green-500 text-white py-2 px-4 mt-2 rounded-md"
                            onClick={() => handleEditToggle('about')}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600">{about}</p>
                        <button
                            className="text-blue-500 underline mt-2"
                            onClick={() => handleEditToggle('about')}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Website Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold mb-4">WEBSITE</h4>
                {editingSection === 'website' ? (
                    <div>
                        <input
                            type="text"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Website"
                        />
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                            onClick={() => handleEditToggle('website')}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-blue-500">{website || 'No website set'}</p>
                        <button
                            className="text-blue-500 underline mt-2"
                            onClick={() => handleEditToggle('website')}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Address Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold mb-4">ADDRESS</h4>
                {editingSection === 'address' ? (
                    <div>
                        <input
                            type="text"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                            onClick={() => handleEditToggle('address')}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>{address || 'No address provided'}</p>
                        <button
                            className="text-blue-500 underline mt-2"
                            onClick={() => handleEditToggle('address')}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Date of Birth Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold mb-4">DATE OF BIRTH</h4>
                {editingSection === 'dateOfBirth' ? (
                    <div>
                        <input
                            type="date"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                            onClick={() => handleEditToggle('dateOfBirth')}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>{dateOfBirth || 'No date of birth provided'}</p>
                        <button
                            className="text-blue-500 underline mt-2"
                            onClick={() => handleEditToggle('dateOfBirth')}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Social Links Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold mb-4">SOCIAL LINKS</h4>
                {editingSection === 'socialLinks' ? (
                    <div>
                        {Object.keys(socialLinks).map((key) => (
                            <div key={key} className="mb-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={socialLinks[key as keyof typeof socialLinks]}
                                    onChange={(e) =>
                                        setSocialLinks({
                                            ...socialLinks,
                                            [key]: e.target.value,
                                        })
                                    }
                                    placeholder={key}
                                />
                            </div>
                        ))}
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                            onClick={() => handleEditToggle('socialLinks')}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div>
                        {Object.keys(socialLinks).map((key) => (
                            <p key={key} className="mb-2 text-blue-500">
                                {socialLinks[key as keyof typeof socialLinks]}
                            </p>
                        ))}
                        <button
                            className="text-blue-500 underline mt-2"
                            onClick={() => handleEditToggle('socialLinks')}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Save All Button */}
            <div className="flex justify-center mb-6">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                    onClick={handleSaveAll}
                >
                    Save All
                </button>
            </div>

            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
};

export default Setting;
