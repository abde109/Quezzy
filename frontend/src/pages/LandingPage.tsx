import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className='bg-background h-screen bg-opacity-25'>
            <h1>Landing Page 1</h1>
            <Link to='/login'></Link>
        </div>
    );
}

export default LandingPage;