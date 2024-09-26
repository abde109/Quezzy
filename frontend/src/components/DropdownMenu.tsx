import React from 'react';
import { useNav } from '../utils/helpers';
import ProfileMenu from './ProfileMenu';

import CloseIcon from '@mui/icons-material/Close';
interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({ isOpen, onClose }) => {
  const nav = useNav();

  const handleNavClick = (path: string) => {
    nav(path);
    onClose(); // Close the dropdown when a navigation item is clicked
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-opacity-100" onClick={onClose}></div>
          <div className="fixed top-0 right-0 z-50 h-screen w-80 bg-white">
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col items-start p-8">
              <ul className="space-y-4 w-full text-lg">
                <li className="cursor-pointer font-bold no-underline hover:underline hover:skew-y-3 hover:text-primary" onClick={() => handleNavClick('/')}>Home</li>
                <li className="cursor-pointer font-bold no-underline hover:underline hover:skew-y-3 hover:text-primary" onClick={() => handleNavClick('Quizzes')}>Quizzes</li>
                {/* <li className="cursor-pointer font-bold no-underline hover:underline hover:skew-y-3 hover:text-primary" onClick={() => handleNavClick('Leaderboards')}>Leaderboards</li> */}
                
                {/* <li className="cursor-pointer font-bold no-underline hover:underline hover:skew-y-3 hover:text-primary" onClick={() => handleNavClick('login')}>Sign In</li> */}
                {/* <li className="cursor-pointer font-bold no-underline hover:underline hover:skew-y-3 hover:text-primary" onClick={() => handleNavClick('register')}>Sign Up</li> */}
                {/* Include any additional links here */}
                <div className=" fixed pt-80">

                <li onClick={onClose} className='cursor-pointer py-20 pt-14 '>
                <ProfileMenu />
                </li>
              </div>
              </ul>


            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default DropdownMenu;
