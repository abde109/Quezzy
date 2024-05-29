import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SportsMartialArtsOutlinedIcon from '@mui/icons-material/SportsMartialArtsOutlined';
import image_1 from "../assets/images/image_1.svg";
import image_2 from "../assets/images/image_2.png";
import PrimaryButton from "../components/PrimaryButton";
import RedCard from "../components/RedCard";
import ToggleP from '../components/ToggleP';

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
            title: '1. Discover New Horizons with Quezzy',
            description: 'Unlock endless learning opportunities and expand your knowledge today.'
        },
        {
            title: '1. Discover New Horizons with Quezzy',
            description: 'Unlock endless learning opportunities and expand your knowledge today.'
        }
    ];

    return (
        <>
            <section className='bg-background bg-opacity-25 pb-8 md:pb-16 lg:pb-32'>
                <div className='flex flex-col md:flex-row mt-8 md:mt-10 lg:mt-20'>
                    <div className="md:w-1/2 flex justify-center mt-0 md:mt-8 lg:mt-16">
                        <div className="w-full px-4 md:px-8 lg:px-12">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold animate-fadeInUp">
                                Unlock Your Professional and Educational Potential with <span className="text-primary">Que</span>zzy
                            </h1>
                            <p className="text-sm md:text-base font-mono font-normal mt-4 mb-6 md:mb-10 lg:mb-12 w-full md:w-2/3 animate-fadeInUp">
                                Quezzy is a versatile tool for creating and managing quizzes and exams, ideal for educators, companies, and individuals preparing for job interviews or skill assessments.
                            </p>
                            <PrimaryButton label={"Join Us"} to={""} w='10' h='2' className="animate-fadeInUp text-lg md:text-xl lg:text-2xl" />
                        </div>
                    </div>
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

            <section className="bg-background bg-opacity-60 py-8 md:py-16 lg:py-24">
                <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-40 md:p-8'>
                    {listcard.map((card, index) => (
                        <RedCard
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                            key={index}
                        />
                    ))}
                </div>

                <div className='flex flex-col md:flex-row mt-8 md:mt-16 lg:mt-20 py-20 md:py-8 lg:py-10 pb-8 md:pb-10 lg:pb-12'>
                    <div className='relative w-full md:w-1/2'>
                        <div className='grid grid-rows-2 h-full px-6 md:px-10 lg:px-20'>
                            <div className='bg-primary w-24 h-24 md:w-40 md:h-40 rounded-lg self-start'></div>
                            <div className='bg-primary w-24 h-24 md:w-40 md:h-40 rounded-lg self-end justify-self-end'></div>
                        </div>
                        <div className='absolute inset-0 flex justify-center items-center mt-6 md:mt-8 lg:mt-10 pt-6 md:pt-8 lg:pt-10'>
                            <img
                                src={image_2}
                                alt="Circular content"
                                className="h-64 w-64 object-cover sm:h-full sm:w-full lg:h-full lg:w-full animate-float lg:pl-4"
                            />
                        </div>
                    </div>

                    <div className='text-lg md:text-2xl lg:text-4xl font-bold font-mono mb-4 px-4 md:px-10 lg:px-20 py-8'>
                        <h2 className=' text-4xl  md:text-xl lg:text-2xl font-bold font-mono mb-2 pt-16 lg:mb-6 px-4 lg:px-10 text-center md:text-left'>
                            Simplify your learning experience with <span className='text-primary'>Que</span>zzy
                        </h2>
                        <p className=' font-mono px-4 md:px-5 lg:px-10 mb-4 lg:mb-8 text-sm md:text-md text-center md:text-left'>
                            Discover new horizons in education. The world of knowledge awaits; seize its opportunities now!
                        </p>
                        {listToggleP.map((item, index) => (
                            <ToggleP title={item.title} description={item.description} key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default LandingPage;
