import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../api/setting';
import { IUser } from '../types/userType';
import profile_image from "../assets/images/profile.png";
const Setting = () => {
    const [settings, setSettngs] = useState<IUser | null>(null);
    const [username, setUsername] = useState<string>('');
    const [gmail, setGmail] = useState<string>('');
    const [profileType, setProfileType] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('1990-01-01');
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        twitter: '',
        linkedin: '',
    });
    const [membershipStatus, setMembershipStatus] = useState<string>('Active');
    const [contactNumber, setContactNumber] = useState<string>('');
    const [role, setRole] = useState<string>('user'); // No editing for role
    const [level, setLevel] = useState<string>('Beginner');
    const [editing, setEditing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Options for profile types and ranking levels
    const profileTypes = ['Teacher', 'Student', 'Company', 'Candidate'];
    const rankingLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getSettings();
                const user = response.user;
        
                // Update individual states
                setUsername(user.username ?? '');
                setGmail(user.email ?? '');
                setProfileType(user.profileType ?? '');
                setAbout(user.about ?? '');
                setWebsite(user.website ?? '');
                setAddress(user.address ?? '');
                setAddress(user.address ?? '');
                setDateOfBirth(user.dateOfBirth ?? '1990-01-01');
                setSocialLinks(user.socialLinks ?? { facebook: '', twitter: '', linkedin: '' });
                setMembershipStatus(user.membershipStatus ?? 'Active');
                setContactNumber(user.contactNumber ?? '');
                setRole(user.role ?? 'user');
                setLevel(user.level ?? 'Beginner');
                
                // Update `settings` state as well
                setSettngs(user);
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
                email: gmail, // Ensure `email` is correctly used here
                profileType: role === 'admin' ? profileType : settings.profileType, // Only admin can edit
                
                about,
                address,
                dateOfBirth,
                socialLinks,
                level,
                contactNumber,
                membershipStatus,
                website,
            };
            try {
                await updateSettings(updatedData);
                alert('Settings updated successfully!');
                setEditing(false); 
            } catch (err) {
                console.error(err);
                setError('Failed to update settings.');
            }
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="text-red-500 text-sm">
                <a href="/">back to home</a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mt-4 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-start">
                <img
                                src={profile_image} // Replace with the actual image URL
                                alt={"iamge"}
                                className="bg-gray-300 rounded-full h-48 w-48"
                                /> 
                    {/* Profile Image Placeholder */}

                    <p className="font-bold mt-2">{username}</p>
                    <p>{profileType}</p>
                    <button className="bg-red-500 text-white py-1 px-3 rounded-md mt-2">View Activity</button>
                </div>

                <div>
                    <p className="font-bold">Ranking Level</p>
                    {editing ? (
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        >
                            {rankingLevels.map((rank) => (
                                <option key={rank} value={rank}>{rank}</option>
                            ))}
                        </select>
                    ) : (
                        <p>{level}</p>
                    )}
                     <p className="font-bold mt-4">Profile Type</p>
                    {editing && role === "admin" ? (
                        <select
                            value={profileType}
                            onChange={(e) => setProfileType(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        >
                            {profileTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    ) : (
                        <p>{profileType}</p>
                    )}
                    <p className="font-bold mt-4">Address</p>
{editing ? (
    <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded-lg w-full"
    />
) : (
    <p>{address || 'N/A'}</p>  // If address is empty, display 'N/A'
)}
 <p className="font-bold mt-4">Web site</p>
{editing ? (
    <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border p-2 rounded-lg w-full"
    />
) : (
    <p>{website || 'N/A'}</p>  // If address is empty, display 'N/A'
)}
                </div>

                <div>
                    <p className="font-bold">Membership Status</p>
                    {editing ? (
                        <select
                            value={membershipStatus}
                            onChange={(e) => setMembershipStatus(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    ) : (
                        <p>{membershipStatus}</p>
                    )}
                    <p>Email: {editing ? (
                        <input
                            type="email"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        />
                    ) : (
                        gmail
                    )}</p>
                    <p>Contact Number: {editing ? (
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        />
                    ) : (
                        contactNumber || 'N/A'
                    )}</p>
                    <p className="font-bold mt-4">Date of Birth</p>
                    {editing ? (
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        />
                    ) : (
                        dateOfBirth
                    )}
                                        
                    <p className="font-bold mt-4">Role</p>
                    <p>{role}</p> {/* Role is now read-only */}
                   
                    
                </div>
            </div>

            {/* Editable Section */}
            <div className="flex mt-6">
                <p className="text-red-500 font-bold mr-6">Profile</p>
                <p className="text-gray-500">Quiz do</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="font-bold text-lg mb-2">ABOUT</p>
                    {editing ? (
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="border p-2 rounded-lg w-full"
                        />
                    ) : (
                        <p>{about}</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="font-bold text-lg mb-2">Social Links</p>
                    {Object.entries(socialLinks).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            {editing ? (
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                                    className="border p-2 rounded-lg w-full"
                                />
                            ) : (
                                <p>{key}: <a href={value} className="text-blue-500">{value}</a></p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit and Save Button */}
            <div className="flex justify-between mt-6">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                    onClick={() => setEditing(!editing)}
                >
                    {editing ? 'Cancel Edit' : 'Edit'}
                </button>
                {editing && (
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={handleSaveAll}
                    >
                        Save All Changes
                    </button>
                )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Setting;
























































































































































































































{/*
import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../api/setting';
import { IUser } from '../types/userType';

const Setting = () => {
    const [settings, setSettings] = useState<IUser | null>(null);
    const [username, setUsername] = useState<string>('');
    const [gmail, setGmail] = useState<string>('');
    const [profileType, setProfileType] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('1990-01-01');
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
                setSettings(user);
                setUsername(user.username || '');
                setGmail(user.email || '');
                setProfileType(user.profileType || '');
                setAbout(user.about || about);
                setWebsite(user.website || '');
                setAddress(user.address || address);
                setDateOfBirth(user.dateOfBirth || dateOfBirth);
                setSocialLinks(user.socialLinks || socialLinks);
                setLevel(user.level || 'Beginner');
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
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl mx-auto">
         
                <div className="flex flex-col items-center space-y-10 mb-10">
              
                    <div className="w-60 h-60 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        <img
                            alt="Profile"
                            className="w-full h-full object-cover"
                            // src={profileImageUrl || '/default-profile.png'} // Add a default image or URL
                        />
                    </div>

                  
                    <div className="flex flex-col items-start w-full max-w-4xl space-y-6">
                    
                        <div className="flex flex-col space-y-2 w-full">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold">USERNAME</h4>
                                {editingSection === 'username' ? (
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            className="p-2 border border-gray-300 rounded-md text-sm"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                        />
                                        <button
                                            className="bg-[#FF204E] text-white py-2 px-4 rounded-md text-sm"
                                            onClick={() => handleEditToggle('username')}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm text-gray-600">{username || 'No username set'}</p>
                                        <button
                                            className="text-blue-500 underline text-sm"
                                            onClick={() => handleEditToggle('username')}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 w-full">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold">GMAIL</h4>
                                {editingSection === 'gmail' ? (
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="email"
                                            className="p-2 border border-gray-300 rounded-md text-sm"
                                            value={gmail}
                                            onChange={(e) => setGmail(e.target.value)}
                                            placeholder="Gmail"
                                        />
                                        <button
                                            className="bg-[#FF204E] text-white py-2 px-4 rounded-md text-sm"
                                            onClick={() => handleEditToggle('gmail')}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm text-gray-600">{gmail || 'No gmail set'}</p>
                                        <button
                                            className="text-blue-500 underline text-sm"
                                            onClick={() => handleEditToggle('gmail')}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 w-full">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold">PROFILE TYPE</h4>
                                {editingSection === 'profileType' ? (
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            className="p-2 border border-gray-300 rounded-md text-sm"
                                            value={profileType}
                                            onChange={(e) => setProfileType(e.target.value)}
                                            placeholder="Profile Type"
                                        />
                                        <button
                                            className="bg-[#FF204E] text-white py-2 px-4 rounded-md text-sm"
                                            onClick={() => handleEditToggle('profileType')}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm text-gray-600">{profileType || 'No profile type set'}</p>
                                        <button
                                            className="text-blue-500 underline text-sm"
                                            onClick={() => handleEditToggle('profileType')}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 w-full">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold">ADDRESS</h4>
                                {editingSection === 'address' ? (
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            className="p-2 border border-gray-300 rounded-md text-sm"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Address"
                                        />
                                        <button
                                            className="bg-[#FF204E] text-white py-2 px-4 rounded-md text-sm"
                                            onClick={() => handleEditToggle('address')}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm text-gray-600">{address || 'No address provided'}</p>
                                        <button
                                            className="text-blue-500 underline text-sm"
                                            onClick={() => handleEditToggle('address')}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6">
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold mb-4">SKILLS</h4>
                        {editingSection === 'skills' ? (
                            <div>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    placeholder="Skills"
                                />
                                <button
                                    className="bg-[#FF204E] text-white py-2 px-4 mt-2 rounded-md"
                                    onClick={() => handleEditToggle('skills')}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600">{level}</p>
                                <button
                                    className="text-blue-500 underline mt-2"
                                    onClick={() => handleEditToggle('skills')}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
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
                                    className="bg-[#FF204E] text-white py-2 px-4 mt-2 rounded-md"
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

                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold mb-4">WEBSITE</h4>
                        {editingSection === 'website' ? (
                            <div>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Website"
                                />
                                <button
                                    className="bg-[#FF204E] text-white py-2 px-4 mt-2 rounded-md"
                                    onClick={() => handleEditToggle('website')}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600">{website || 'No website provided'}</p>
                                <button
                                    className="text-blue-500 underline mt-2"
                                    onClick={() => handleEditToggle('website')}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h4 className="text-lg font-semibold mb-4">DATE OF BIRTH</h4>
                    {editingSection === 'dateOfBirth' ? (
                        <div className="flex items-center gap-3">
                            <input
                                type="date"
                                className="p-2 border border-gray-300 rounded-md text-sm"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            <button
                                className="bg-[#FF204E] text-white py-2 px-4 rounded-md text-sm"
                                onClick={() => handleEditToggle('dateOfBirth')}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-600">{dateOfBirth}</p>
                            <button
                                className="text-blue-500 underline"
                                onClick={() => handleEditToggle('dateOfBirth')}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h4 className="text-lg font-semibold mb-4">SOCIAL LINKS</h4>
                    {Object.entries(socialLinks).map(([platform, link]) => (
                        <div key={platform} className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <h4 className="font-bold capitalize">{platform}</h4>
                                <p className="ml-4 text-sm text-gray-600">{link}</p>
                            </div>
                            {editingSection === platform ? (
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        className="p-2 border border-gray-300 rounded-md text-sm"
                                        value={link}
                                        onChange={(e) => setSocialLinks({
                                            ...socialLinks,
                                            [platform]: e.target.value
                                        })}
                                        placeholder={`${platform} link`}
                                    />
                                    <button
                                        className="bg-[#FF204E] text-white py-2 px-4 rounded-md text-sm"
                                        onClick={() => handleEditToggle(platform)}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="text-blue-500 underline text-sm"
                                    onClick={() => handleEditToggle(platform)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-[#FF204E] text-white py-2 px-6 rounded-md text-lg"
                        onClick={handleSaveAll}
                    >
                        Save All Changes
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-md">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Setting;
*/}