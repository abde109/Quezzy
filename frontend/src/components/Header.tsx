import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useNav } from '../utils/helpers';
import ProfileMenu from './ProfileMenu';
import DropdownMenu from './DropdownMenu';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nav = useNav();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleNavClick = (path: string) => {
    nav(path);
    closeDropdown(); // Close the dropdown when a navigation item is clicked
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 flex justify-between border-b border-t-slate-600 bg-white bg-opacity-85 backdrop-blur-md hidden md:flex">
        <h1 className="font-sans font-bold ml-5 md:ml-20 mt-5 mb-5 text-3xl"><span className="text-primary ">Que</span>zzy</h1>
        <nav className="flex items-center">
          <ul className='flex space-x-5 cursor-pointer font-bold'>
            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => handleNavClick('/')}>Home</li>
            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => handleNavClick('Quizzes')}> Quizzes </li>
            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => handleNavClick('Leaderboards')}>Leaderboards</li>
          </ul>
        </nav>
        <div className='flex place-self-center sm:mr-10 md:mr-20'>
          <ProfileMenu />
        </div>
      </header>
      {/* Mobile Navigation */}
      <div className="md:hidden ">
      <header className="sticky top-0 z-50 flex justify-between items-center border-b border-t-slate-600 bg-white bg-opacity-85 backdrop-blur-md">
      <h1 className="font-sans font-bold ml-5 md:ml-20 mt-5 mb-5 text-3xl"><span className="text-primary ">Que</span>zzy</h1>
        <button onClick={toggleDropdown} className="fixed top-6 right-4 z-50">
          {isDropdownOpen ? <CloseIcon/> : <MenuIcon/>}
        </button>
        {/* Dropdown Menu */}
        <DropdownMenu isOpen={isDropdownOpen} onClose={closeDropdown} />
      </header>
      </div>
    </>
  );
};

export default Header;
