
import {Avatar} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import MenuProfile from './MenuProfile';
import PrimaryButton from './PrimaryButton';
import SecandButton from './SecandButton';

const ProfileMenu = () => {
    const [isLogin , setisLogin] = useState(false)
    const [handlerMenu, setHandlerMenu] = useState(false)
    const menuRef = useRef(null);
    const avatarRef = useRef(null);

    const handleClickOutside = (event) => {
        if(menuRef.current && !menuRef.current.contains(event.target) && avatarRef.current && !avatarRef.current.contains(event.target)){
            setHandlerMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[handlerMenu]);


    return (
        <>  
            {!isLogin ? 
            (<> <PrimaryButton label='Sign in' size='100' to='login'/> <SecandButton label='Sign up' size = '100' to='register'/></>) :
            (<> 
                <Avatar ref={avatarRef} sx={{ width: 40, height: 40 }} onClick = {()=>{ setHandlerMenu(!handlerMenu) }} className='cursor-pointer'/> 
                {
                    handlerMenu && <div ref={menuRef}> <MenuProfile isOpen = {handlerMenu}/> </div> 
                     
                }
            </>
            ) }
            

        </>
    )
}

export default ProfileMenu;