import { Menu, Transition } from '@headlessui/react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../api/userApi';
import { useAppDispatch } from '../store';
import { killuser } from '../store/features/userSlice';


const MenuProfile:React.FC<{isOpen:boolean}> = ({isOpen}) => {

  const userState = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
      await logoutUser();
      dispatch(killuser());
  }


  const menu = [ {name:'Profile' , to:'Profile' , icon : <PersonOutlineOutlinedIcon />},
                 {name:'Dashboard' , to:'dashboard' , icon : <SpaceDashboardOutlinedIcon />},
                 {name:'Settings' , to:'settings' , icon : <SettingsOutlinedIcon />},
                 {name:'Logout' , to:'/' , icon : <LogoutOutlinedIcon /> , onClick:handleLogOut}
                ];

  return (
    <Menu as="div" className="relative top-12">
      <Transition
        as={Fragment}
        show={isOpen}
      >
        
        <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
        <Menu.Item>
                {() => (
                  <Link className='flex justify-center py-4' to={''}>
                    <div className='flex flex-col '>
                      <span className='text-base uppercase text-slate-700'>{userState.username}</span>
                      <span className='text-xs text-slate-400'>{userState.email}</span>
                    </div>
                  </Link>
                  
                )}
              </Menu.Item>
          {
            menu.map( (item,index) => 
            <div className="p-1" key={index}>
              <Menu.Item>
                {() => (
                  <Link to={item.to} onClick={item.name === 'Logout' ? item.onClick : undefined} className='block px-4 py-2 text-sm text-slate-600 hover:bg-primary hover:text-white hover:rounded hover:scale-110 hover:shadow-sm' >
                    <div className='flex justify-between'>
                      {item.name} {item.icon}
                    </div>
                  </Link>
                  
                )}
              </Menu.Item>
              </div>
            )}
            
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuProfile;