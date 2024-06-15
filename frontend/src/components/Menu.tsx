import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../store/features/menuSlice';
import { useNav } from '../utils/helpers';
import ProfileMenu from './ProfileMenu';

const Menu: React.FC<{}> = () => {
    const nav = useNav();
    const dispatch = useDispatch();

    return(
        <div className='fixed inset-0 z-50 bg-white border border-black py-20 px-20 translate-x-40 flex flex-col justify-between h-screen '>
            <CloseOutlinedIcon onClick={() => dispatch(toggleMenu()) }/>
            <div>
                <h1 className="font-sans font-bold md:ml-20 mt-5 mb-5 text-3xl"><span className="text-primary ">Que</span>zzy</h1>
                <nav className="flex ">
                    <div className=''>
                        <ul className='flex space-y-10 cursor-pointer font-bold flex-col'>
                            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => nav('/')}>Home</li>
                            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => nav('Quizzes')}> Quizzes </li>
                            <li className='no-underline hover:underline hover:skew-y-3 hover:text-primary' onClick={() => nav('Leaderboards')}>Leaderboards</li>
                        </ul>
                    </div>

                </nav>
            
            </div>
            <div className='flex flex-col w-40 gap-5'>
            <ProfileMenu />
            </div>
        </div>
    )
}

export default Menu;