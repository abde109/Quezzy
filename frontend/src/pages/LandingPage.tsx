import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import image_1 from "../assets/images/image_1.svg";
import PrimaryButton from "../components/PrimaryButton";
import RedCard from "../components/RedCard";

const LandingPage = () => {
    const listcard = [
        {
            title:'Companies',
            description:'Quezzy helps companies manage assessments and train employees efficiently.',
            icon: <LocationCityOutlinedIcon style={{ fontSize: 100 }} className='border border-white rounded-full p-4'/> 
        },
        {
            title:'Individuals',
            description:'Quezzy helps companies manage assessments and train employees efficiently.',
            icon: <LocationCityOutlinedIcon style={{ fontSize: 100 }} className='border border-white rounded-full p-4'/> 
        },
        {
            title:'Companies',
            description:'Quezzy helps companies manage assessments and train employees efficiently.',
            icon: <LocationCityOutlinedIcon style={{ fontSize: 100 }} className='border border-white rounded-full p-4'/> 
        },
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

                        <PrimaryButton label={"Join Us"} to={""} w='60' className=" animate-fadeInUp text-xl"/>
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

        <section className="relative bg-background bg-opacity-60 h-full">
            
                <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center gap-40'>
                    { listcard.map( (card,index) =>
                        <RedCard title={card.title}
                                description={card.description}
                                icon={card.icon}
                                key={index}/>) 
                    }
            
                </div>

                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>
                <h1>
                    hhhhhhhhhhhhhhhhhhhhh
                </h1>

        </section> 

        </>       
    );
}

export default LandingPage;