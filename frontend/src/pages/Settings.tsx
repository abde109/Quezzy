import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../api/setting';
import profile_image from "../assets/images/profile.png";
import { IUser } from '../types/userType';

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
    const [role, setRole] = useState<string>(''); // No editing for role
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
                setRole(user.role ?? '');
              
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
            const updatedRole = profileType === "Student" || profileType === "Candidate" ? 'user' : settings.role;

            const updatedData = {
                ...settings,
                username,
                email: gmail, // Ensure `email` is correctly used here
                profileType,
                about,
                address,
                dateOfBirth,
                socialLinks,
                level,
                contactNumber,
                membershipStatus,
                website,
                role: updatedRole,
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
                                alt={'s profile'}
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
            {editing && (profileType === "Company" || profileType === "Teacher") ? (
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


