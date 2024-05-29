import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';


const RedCard:React.FC<{title:string, description:string, icon:any}> = ({title,description,icon}) =>{
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    return(
        <motion.div 
            ref={ref}
            initial={{opacity:0}}
            transition={{duration:1}}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -100 }}
            className="w-72 h-72 rounded-lg bg-primary flex flex-col justify-center items-center text-white">
                {icon}
                <h3 className="text-2xl font-mono mb-4 mt-6">{title}</h3>
                <p className="text-xs text-center font-mono px-4">
                    {description}
                </p>
        </motion.div>
    )
}

export default RedCard;