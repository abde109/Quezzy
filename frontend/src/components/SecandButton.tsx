import { useNav } from "../utils/helpers";

const SecandButton: React.FC<{label:string , size:string,to:string}> = ({label,size,to}) => {
    const nav = useNav();
    return (
        <button 
            className={`py-2 text-black px-4 rounded bg-slate-100 border border-black hover:shadow hover:shadow-slate-400 hover:scale-105 w-[${size}px]`}
            onClick={()=>nav(to)}
            >
            {label}
        </button>
    );
};

export default SecandButton;