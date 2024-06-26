
import { Avatar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MenuProfile from './MenuProfile';
import PrimaryButton from './PrimaryButton';
import SecandButton from './SecandButton';

const ProfileMenu = () => {

    const userState = useSelector((state: any) => state.user);

    // const [isLogin , setisLogin] = useState(userState.isAuth)
    const [handlerMenu, setHandlerMenu] = useState(false)
    const menuRef = useRef <HTMLDivElement> (null);
    const avatarRef = useRef <HTMLDivElement> (null);

    const handleClickOutside = (event:any) => {
        if(menuRef.current && !menuRef.current.contains(event.target) && avatarRef.current && !avatarRef.current.contains(event.target)){
            setHandlerMenu(false);
        }
    }

    // useEffect(() => {
    //     setisLogin(userState.isAuth)
    //     console.log(userState + ', userState')
    // },[userState])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[handlerMenu]);


    return (
        <>  
            {!userState.isAuth ? 
            (<> <PrimaryButton className='md:mx-4  mx-4' label='Sign in' to='login' w='6' h='3'/> <SecandButton label='Sign up' to='register' w='6' h='3'/></>) :
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