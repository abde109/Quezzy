import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SportsMartialArtsOutlinedIcon from '@mui/icons-material/SportsMartialArtsOutlined';
import image_1 from "../assets/images/image_1.svg";
import image_2 from "../assets/images/image_2.svg";
import image_3 from "../assets/images/image_3.svg";
import PrimaryButton from "../components/PrimaryButton";
import RedCard from "../components/RedCard";
import ToggleP from '../components/ToggleP';
import CardSection from '../components/CardSection';
import Footer from '../components/Footer';
import EmailCard from '../components/EmailCard';
import QuizCategories from '../components/QuizCategories';

const LandingPage = () => {
    const listcard = [
        {
            title: 'Companies',
            description: 'Quezzy helps companies manage assessments and train employees efficiently.',
            icon: <LocationCityOutlinedIcon style={{ fontSize: '4rem' }} className='border border-white rounded-full p-4' />
        },
        {
            title: 'Individuals',
            description: 'Use Quezzy quizzes and materials to prep for exams and boost knowledge.',
            icon: <SportsMartialArtsOutlinedIcon style={{ fontSize: '4rem' }} className='border border-white rounded-full p-4' />
        },
        {
            title: 'Teachers',
            description: 'Create custom quizzes and track student progress with Quezzy.',
            icon: <SchoolOutlinedIcon style={{ fontSize: '4rem' }} className='border border-white rounded-full p-4' />
        },
    ];

    const listToggleP = [
        {
            title: '1. Discover New Horizons with Quezzy',
            description: 'Unlock endless learning opportunities and expand your knowledge today.'
        },
        {
            title: '2. Discover New Horizons with Quezzy',
            description: 'Unlock endless learning opportunities and expand your knowledge today.'
        },
        {
            title: '3. Discover New Horizons with Quezzy',
            description: 'Unlock endless learning opportunities and expand your knowledge today.'
        }
    ];

    const keyFeatures = [
        {
            title: 'Create and manage quizzes with ease.',
            description: 'Effortlessly create and manage quizzes with an intuitive interface.'
        },
        {
            title: 'Get instant results and detailed feedback.',
            description: 'Receive immediate results and in-depth feedback to improve learning.'
        },
        {
            title: 'Invite friends to join and challenge them.',
            description: 'Invite friends to participate in quizzes and engage in friendly competition.'
        },
    ];

    return (
        <>
            <section className='bg-background bg-opacity-25 pb-8 md:pb-16 lg:pb-72'>
                <div className='flex flex-col md:flex-row mt-8 md:mt-10 lg:mt-20'>
                    {/* Left Section */}
                    <div className="md:w-1/2 flex justify-center mt-0 md:mt-8 lg:mt-16 lg:ml-24">
                        <div className="w-full px-4 md:px-8 lg:px-12">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold animate-fadeInUp leading-tight">
                                Unlock Your Professional and Educational Potential with <span className="text-primary">Que</span>zzy
                            </h1>
                            <p className="text-sm md:text-base font-mono font-normal mt-4 mb-6 md:mb-10 lg:mb-12 w-full md:w-2/3 animate-fadeInUp leading-relaxed">
                                Quezzy is a versatile tool for creating and managing quizzes and exams, ideal for educators, companies, and individuals preparing for job interviews or skill assessments.
                            </p>
                            <PrimaryButton label={"Join Us"} to={""} w='10' h='2' className="animate-fadeInUp text-lg md:text-xl lg:text-2xl" />
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className='md:w-1/2 flex justify-center mt-6 md:mt-8 lg:mt-0'>
                        <div className="w-full h-full max-w-xs md:max-w-none">
                            <img
                                src={image_1}
                                alt="Circular content"
                                className="max-w-xs max-h-xs md:max-w-sm md:max-h-sm lg:max-w-md lg:max-h-md xl:max-w-lg xl:max-h-lg mx-auto animate-float"
                            />
                        </div>
                    </div>
                </div>
                
            </section>
            
            <section className="bg-background bg-opacity-60 py-4 md:py-8 lg:py-20">
                {/* Cards Section */}
                
                <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-40 md:p-8 lg:-translate-y-1/2 lg:transform lg:left-1/2'>
                    {listcard.map((card, index) => (
                        <RedCard
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                            key={index}
                        />
                    ))}
                </div>
                
                {/* Image Left - Text Right */}
                <div className='flex flex-col md:flex-row items-center justify-center md:py-0 mt-0 md:mt-0 py-4'>
                    {/* Image on the left */}
                    <div className='relative md:w-1/2 flex justify-center items-center mb-6 md:mb-0'>
                        <div className='w-full h-full max-w-xs md:max-w-none'>
                            <img
                                src={image_3}
                                alt="Educational Quiz Platform"
                                className="h-64 md:h-96 w-auto lg:z-10 object-cover mx-auto"
                            />
                        </div>
                    </div>

                    {/* Text on the right */}
                    <div className='text-sm md:text-base lg:text-lg font-serif mb-2 px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center md:items-start md:w-1/2'>
                        <h1 className='text-lg md:text-xl lg:text-2xl font-bold mb-4 text-center md:text-left text-black'>
                            Elevate Your Learning with <span className='text-primary'>Que</span>zzy
                        </h1>
                        <p className='px-2 md:px-4 lg:px-6 mb-4 lg:mb-6 text-center md:text-left text-black leading-relaxed'>
                            Discover how Quezzy transforms education for teachers, students, companies, and candidates:
                        </p>
                        <div className='mt-4 space-y-3'>
                            {keyFeatures.map((feature, index) => (
                                <ToggleP
                                    title={feature.title}
                                    description={feature.description}
                                    key={index}
                                    py={4}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Text Left - Image Right */}
                <div className='flex flex-col md:flex-row items-center justify-center py-6 md:py-6 lg:py-10'>
                    {/* Text on the left */}
                    <div className='text-sm md:text-base lg:text-lg font-serif mb-4 px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center md:items-start md:w-1/2'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center md:text-left text-black'>
                            Simplify your learning experience with <span className='text-primary'>Que</span>zzy
                        </h1>
                        <p className='mb-4 lg:mb-6 text-center md:text-left text-black leading-relaxed'>
                            Discover new horizons in education. The world of knowledge awaits; seize its opportunities now!
                        </p>
                        <div className='mt-4 space-y-3'>
                            {listToggleP.map((item, index) => (
                                <ToggleP
                                    title={item.title}
                                    description={item.description}
                                    key={index}
                                    py={4}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Image on the right */}
                    <div className='relative md:w-1/2 flex justify-center items-center mt-6 md:mt-0'>
                        <div className='w-full h-full max-w-xs md:max-w-none'>
                            <img
                                src={image_2}
                                alt="Educational Image"
                                className="h-64 md:h-auto w-auto mx-auto object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <CardSection />
                </div>
                <div>
                    <QuizCategories />
                    <EmailCard />
                </div>
                
                <div>
                    <Footer />
                </div>
            </section>
        </>
    );
};

export default LandingPage;
