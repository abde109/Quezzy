import { useNav } from "../utils/helpers";

const PrimaryButton: React.FC<{label:string ; w?:string ; h?:string ; to:string ; className?: string}> = ({label,w,h,to,className}) => {
    const nav = useNav();
    return (
        <button 
            className={`bg-primary text-white py-2 px-4 rounded hover:shadow hover:shadow-slate-400 hover:scale-105 w-${w} py-${h} ${className}`}
            onClick={() => nav(to) } 
        >
            {label}
        </button>
    );
};

export default PrimaryButton;