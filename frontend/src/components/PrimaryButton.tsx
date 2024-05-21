import { useNav } from "../utils/helpers";

const PrimaryButton: React.FC<{label:string ; w?:string ; h?:string ; to:string ; className?: string}> = ({label,w,h,to,className}) => {
    const nav = useNav();
    return (
        <button 
            className={`bg-primary text-white md:py-2 md:px-4 px-4 py-2 rounded hover:shadow hover:shadow-slate-400 hover:scale-105 px-${w} py-${h} ${className}`}
            onClick={() => nav(to) } 
        >
            <span className="md:text-base text-md">{label}</span>
        </button>
    );
};

export default PrimaryButton;