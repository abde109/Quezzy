

const RedCard:React.FC<{title:string, description:string, icon:any}> = ({title,description,icon}) =>{

    return(
        <div className="w-72 h-72 rounded-lg bg-primary flex flex-col justify-center items-center text-white">
            {icon}
            <h3 className="text-2xl font-mono mb-4 mt-6">{title}</h3>
            <p className="text-xs text-center font-mono">
                {description}
            </p>
        </div>
    )
}

export default RedCard;