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
            title:'Companies',
            description:'Quezzy helps companies manage assessments and train employees efficiently.',
            icon: <LocationCityOutlinedIcon style={{ fontSize: 100 }} className='border border-white rounded-full p-4'/> 
        },
        {
            title:'Individuals',
            description:'Use Quezzy quizzes and materials to prep for exams and boost knowledge.',
            icon: <SportsMartialArtsOutlinedIcon style={{ fontSize: 100 }} className='border border-white rounded-full p-4'/> 
        },
        {
            title:'Teachers',
            description:'Create custom quizzes and track student progress with Quezzy.',
            icon: <SchoolOutlinedIcon style={{ fontSize: 100 }} className='border border-white rounded-full p-4'/> 
        },
    ]

    const listToggleP = [
        {
            title:'1. Discover New Horizons with Quezzy',
            description:'Unlock endless learning opportunities and expand your knowledge today.'
        },
        {
            title:'1. Discover New Horizons with Quezzy',
            description:'Unlock endless learning opportunities and expand your knowledge today.'
        },
        {
            title:'1. Discover New Horizons with Quezzy',
            description:'Unlock endless learning opportunities and expand your knowledge today.'
        }
    ]
    return (
        <>
        <section className='bg-background  bg-opacity-25 h-full pb-64'>
            <div className='flex flex-row mt-20'>
                <div className="w-1/2 flex justify-center mt-32">
                    <div className="w-full pl-44">
                        <h1 className="text-5xl font-mono font-bold animate-fadeInUp">
                            Unlock Your Professional and Educational Potential with <span className="text-primary">Que</span>zzy
                        </h1>
                        <p className="text-sm font-mono font-normal mt-4 mb-10 w-2/3 animate-fadeInUp">
                        Quezzy is a versatile tool for creating and managing quizzes and exams, ideal for educators, companies, and individuals preparing for job interviews or skill assessments.
                        </p>

                        <PrimaryButton label={"Join Us"} to={""} w='10' h='2' className=" animate-fadeInUp text-xl"/>
                    </div>
                </div>
                <div className='w-1/2 flex justify-center'>
                    <div className="w-140 h-140">
                        <img
                        src={image_1}
                        alt="Circular content"
                        className="w-full h-full object-cover animate-float"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className=" bg-background bg-opacity-60">
            
                <div className='left-1/2 transform -translate-y-1/2 flex flex-row justify-center gap-40'>
                    { listcard.map( (card,index) =>
                        <RedCard title={card.title}
                                description={card.description}
                                icon={card.icon}
                                key={index}/>) 
                    }
            
                </div>

                <div className='flex flex-row'>
                    <div className='relative w-1/2'>
                        
                        <div className='grid grid-rows-2 h-full px-52'>
                            
                            <div className='bg-primary w-40 h-40 rounded-lg self-start'></div>
                            <div className='bg-primary w-40 h-40 rounded-lg self-end justify-self-end'></div>
                        </div>

                        <div className='absolute inset-0 flex justify-center items-center mt-10'>
                            <img 
                                src={image_2}
                                alt="image_2" 
                                sizes='' 
                                className="z-10 object-cover animate-float"
                            />
                        </div>
                    </div>
                    
                    <div className='w-1/2'>
                        <h2 className='text-4xl font-bold font-mono mb-12 px-10'>
                            Simplify your learning experience with <span className='text-primary'>Que</span>zzy
                        </h2>
                        <p className='font-mono px-14 mb-20 text-md'>
                            Discover new horizons in education. The world of knowledge awaits; seize its opportunities now!
                        </p>
                        {
                            listToggleP.map((item,index) => {
                                return <ToggleP title={item.title} description={item.description} key={index}/>
                            
                            })
                        }
                    </div>
                </div>

        </section> 

        </>       
    );
}

export default LandingPage;