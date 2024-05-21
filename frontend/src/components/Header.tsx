import React from 'react';
import { useNav } from '../utils/helpers';
import MenuHeader from './MenuHeader';
import ProfileMenu from './ProfileMenu';



const Header: React.FC = () => {
  const nav = useNav();
  return (
    <header className="sticky top-0 z-50 flex justify-between border-b border-t-slate-600 bg-white bg-opacity-85 backdrop-blur-md">
      <h1 className="font-sans font-bold ml-5 md:ml-20 mt-5 mb-5 text-3xl"><span className="text-primary ">Que</span>zzy</h1>
      <nav className="flex items-center">
        <div className='hidden lg:block'>
          <ul className='flex space-x-5 cursor-pointer font-bold'>
            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => nav('/')}>Home</li>
            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => nav('Quizzes')}> Quizzes </li>
            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => nav('Leaderboards')}>Leaderboards</li>
          </ul>
        </div>

      </nav>
      <div className='flex place-self-center sm:mr-10 md:mr-20 hidden lg:block'>
        <ProfileMenu />
        {/* <PermIdentityOutlinedIcon /> */}
        {/* <SearchOutlinedIcon /> */}
      </div>

      
        <div className='flex place-self-center sm:mr-10 md:mr-20 lg:hidden cursor-pointer'>
          <MenuHeader />
        </div>

      

    </header>
  );
};

export default Header;
