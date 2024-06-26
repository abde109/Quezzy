import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../api/userApi';
import backgroundImage from '../assets/images/background.png';
import PrimaryButton from '../components/PrimaryButton';
import SecandButton from '../components/SecandButton';
import { useAppDispatch } from '../store';
import { initializeUser } from '../store/features/userSlice';
import { useNav } from '../utils/helpers';


const LoginPage = () => {
    
    const navigate = useNav();
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const dispatch = useAppDispatch();

      
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
            setErrorEmail('');
           setErrorPassword('');
      
          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get('email');
          const password = formData.get('password');
      
          const datauser = {
            email,
            password
          };
      
          try {
                const user = await getUser(datauser);
                navigate('/');
                dispatch(initializeUser(user));
                // const auth = await authUser()
                // console.log(auth)
            
          } catch (err: any) {
            const errMessage = await JSON.parse(err.request.response).message;
            if(errMessage.email){
                setErrorEmail(errMessage.email)
            }else if(errMessage.password){
                setErrorPassword(errMessage.password)
            }
            
        };
    }

    

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen bg-background bg-opacity-25">
            <div
                className="absolute inset-0  bg-center"
                style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.3 }}
            ></div>
            <div className='relative'>
            
            <div className="border px-6 py-8 bg-white rounded-lg flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                <h1 className="text-5xl font-semibold mb-12">
                    <span className="text-primary">Que</span>zzy
                </h1>

                <h2 className="text-2xl font-mono font-bold text-primary mb-4 sm:text-3xl md:text-4xl">
                    Login
                </h2>

                <h4 className='text-gray-600 mb-10'>
                Sign in to your account
                </h4>
                <form onSubmit={handleLogin} id="loginForm" method="post" className="">
                    <div className='mb-6 mt-6'>
                        {/* <label htmlFor="email" className="opacity-30">Email address</label> */}
                        <div className="relative">
                        <AccountCircleOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                autoComplete="email"
                                required
                                className="w-full md:w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                            />
                            
                        </div>
                        <span className='text-xs text-primary'>{errorEmail}</span>
                    </div>

                    <div className='mb-6'>
                        {/* <label htmlFor="email" className="opacity-30">Email address</label> */}
                        <div className="relative">
                        <VpnKeyOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="password"
                                required
                                className="w-full md:w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input" 
                            />
                          
                            
                        </div>
                        <span className='text-xs text-primary'>{errorPassword}</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <PrimaryButton label="Login" w={'120'} h={'4'} to={''} className='mb-4'/>
                        <Link className='text-gray-600 mb-10 text-sm hover:text-gray-800' to={'/forgetpassword'}>
                        I forgot my password. Click here to reset
                        </Link>
                        <SecandButton label="Register New Accout" w={'120'} h={'4'} to={'/register'} />
                    </div>

                </form>
                <div className='absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg top-2 left-2 pointer-events-none'> </div>
            </div>
        </div>
        
    </div>
    );
};

export default LoginPage;