import { useNav } from "../utils/helpers";

const SecandButton: React.FC<{label:string ; w?:string ; h?:string ; to:string ; className?:string}> = ({label,w,h,to,className}) => {
    const nav = useNav();
    return (
        <button 
            className={` text-black rounded bg-slate-100 bg-opacity-50 border border-black hover:shadow hover:shadow-slate-400 hover:scale-105 px-${w} py-${h} ${className}`}
            onClick={()=>nav(to)}
            >
            {label}
        </button>
    );
};

export default SecandButton;