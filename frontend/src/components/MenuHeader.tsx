
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../store/features/menuSlice';
import Menu from './Menu';

const MenuHeader = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    const isOpen = useSelector((state:any) => state.menu.isOpen);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
    }
        window.addEventListener('resize', handleResize);
            handleResize();
        
            return () => window.removeEventListener('resize', handleResize);


    },[]);


    return (
        <>
            <div className=''>
                <MenuOutlinedIcon onClick={() => dispatch(toggleMenu())} />
            </div>
            {isMobile && isOpen && <Menu />}
        </>
    )
}

export default MenuHeader;