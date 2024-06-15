import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../api/userApi';
import backgroundImage from '../assets/images/background.png';
import success from '../assets/success.gif';
import Droplist from '../components/Droplist';
import PrimaryButton from '../components/PrimaryButton';

const roles = [
    {
      id: 1,
      name: 'Teacher',
    },
    {
      id: 2,
      name: 'Student',
    },
    {
      id: 3,
      name: 'Company',
    },
    {
        id: 4,
        name: 'Candidate',
      }
  ]

  const RegisterPage = () => {
    const [selected, setSelected] = useState(roles[100]); // Ensure selected is initialized correctly
    const [errorEmail, setErrorEmail] = useState('');
    const [errorRole, setErrorRole] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorUsername, setErrorUsername] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorUsername('');
      setErrorRole('');
      setErrorEmail('');
      setErrorPassword('');
  
      const formData = new FormData(e.target as HTMLFormElement);
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
      const repeatPassword = formData.get('Repeat_password');
  
      if (!selected) {
        setErrorRole('Must choose your role');
        return;
      }
  
      if (password !== repeatPassword) {
        setErrorPassword('Password does not match');
        return;
      }
  
      const datauser = {
        username,
        email,
        password,
        role: selected.id % 2 === 0 ? 'user' : 'admin',
        profileType: selected.name,
      };
  
      try {
        await createUser(datauser);
        setIsVerified(true);
        // navigate('/login'); // Navigate to login
      } catch (err: any) {
        const error = err.response.data.message
        if(error){
            if(error.email){
                setErrorEmail(error.email);
        }else if(error.password){
            setErrorPassword(error.password);
        }else if(error.username){
            setErrorUsername(error.username);
        }
        }
    };
}
  
    return (
      <div className="relative flex flex-col justify-center items-center min-h-screen bg-background bg-opacity-25">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.3 }}></div>
            <div className='relative'>
                <div className="border px-6 py-8 bg-white rounded-lg flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                    {isVerified ? (
                        <>
                        <img src={success} alt="success" />
                        <span className='text-gray-600 mb-6 text-base sm:text-lg md:text-xl'>
                            Registration Successful. Redirecting to 
                            <Link className='px-2 text-gray-600 mb-10 text-xl hover:text-gray-800 underline' to={'/login'}>
                                Login
                            </Link></span>
                        </>
                    ) : (
                        <>
                        <h2 className="text-2xl font-mono font-bold text-primary mb-4 sm:text-3xl md:text-4xl">Register</h2>
                        <h4 className="text-gray-600 mb-6 text-base sm:text-lg md:text-xl">Create Account</h4>
                        <form onSubmit={handleSubmit} id="registerForm" className="">
                            <div className='mb-4'>
                            <div className="relative">
                                <PermIdentityIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{ width: 20, height: 20 }}/>
                                <input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                autoComplete="username"
                                required
                                className="w-full md:w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                                />
                            </div>
                            <span className='text-xs text-primary'>{errorUsername}</span>
                            </div>
                            <div className='mb-6 mt-6'>
                            <div className="relative">
                                <EmailOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
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
                            </div>
                            <div className='mb-6'>
                            <div className="relative">
                                <VpnKeyOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
                                <input 
                                type="password"
                                id="Repeat_password"
                                name="Repeat_password"
                                placeholder="Repeat Password"
                                autoComplete="repeat-password"
                                required
                                className="w-full md:w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input"
                                />
                            </div>
                            <span className='text-xs text-primary'>{errorPassword}</span>
                            </div>
                            <div className='mb-6'>
                            <Droplist roles={roles} selected={selected} setSelected={setSelected} />
                            <span className='text-xs text-primary'>{errorRole}</span>
                            </div>
                            <div className='flex flex-col items-center'>
                            <PrimaryButton label="Register New Account" w='' h={'4'} to={''} className='mb-12 w-full'/>
                            <Link className='text-gray-600 mb-10 text-sm hover:text-gray-800' to={'/login'}>
                                Already have an account?
                            </Link>
                            </div>
                        </form>
                        
                        </>
                    )}
                    <div className='absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg top-2 left-2 pointer-events-none'></div>
            </div>
        </div>
      </div>
    );
  };
  

export default RegisterPage;