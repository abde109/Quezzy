import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/background.png';
import PrimaryButton from '../components/PrimaryButton';

const RegisterPage = () => {
    return (
        <div className="relative flex flex-col justify-center items-center h-screen bg-background bg-opacity-25 ">
            <div
                className="absolute inset-0  bg-center"
                style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.3 }}
            ></div>
            <div className='relative'>
            
            <div className="border px-10 py-20 bg-white rounded-lg flex flex-col items-center">
                {/* <h1 className="text-5xl font-semibold mb-12">
                    <span className="text-primary">Que</span>zzy
                </h1> */}

                <h2 className="text-2xl font-mono font-bold text-primary">
                Register
                </h2>

                <h4 className='text-gray-600 mb-10'>
                Create Account
                </h4>

                <form action="#" method="post" className="">


                <div className='mb-6 mt-6'>
                        {/* <label htmlFor="email" className="opacity-30">Email address</label> */}
                        <div className="relative">
                        <AccountCircleOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
                            <input 
                                type="username"
                                id="username"
                                name="username"
                                placeholder="username"
                                autoComplete="username"
                                required
                                className="flex w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input " 
                            />
                            
                        </div>
                    </div>


                    <div className='mb-6 mt-6'>
                        {/* <label htmlFor="email" className="opacity-30">Email address</label> */}
                        <div className="relative">
                        <EmailOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                autoComplete="email"
                                required
                                className="flex w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input " 
                            />
                            
                        </div>
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
                                className="flex w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input " 
                            />
                          
                            
                        </div>
                    </div>

                    <div className='mb-6'>
                        {/* <label htmlFor="email" className="opacity-30">Email address</label> */}
                        <div className="relative">
                        <VpnKeyOutlinedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{width:20 , height:20}}/>
                            <input 
                                type="password"
                                id="Repeat_password"
                                name="Repeat_password"
                                placeholder="Repeat Password"
                                autoComplete="Repeat_password"
                                required
                                className="flex w-120 px-10 py-3 border border-gray-300 border-opacity-40 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-input " 
                            />
                          
                            
                        </div>
                    </div>

                    <div className='flex flex-col items-center'>
                        <PrimaryButton label="Register New Account" w='' h={'4'} to={''} className='mb-12 w-full'/>
                        <Link className='text-gray-600 mb-10 text-sm hover:text-gray-800' to={'/login'}>
                            Already have an account?
                        </Link>
                        
                    </div>

                </form>
                <div className='absolute -inset-2 border-r-8 border-b-8 border-primary rounded-lg top-2 left-2 pointer-events-none'> </div>
            </div>
        </div>
        
    </div>
    );
};

export default RegisterPage;