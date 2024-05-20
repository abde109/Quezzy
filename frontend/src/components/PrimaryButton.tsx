import { useNav } from "../utils/helpers";

const PrimaryButton: React.FC<{label:string , size:string,to:string}> = ({label,size,to}) => {
    const nav = useNav();
    return (
        <button 
            className={`bg-primary text-white py-2 px-4 rounded hover:shadow hover:shadow-slate-400 hover:scale-105 w-[${size}px] mx-4`}
            onClick={() => nav(to) } 
        >
            {label}
        </button>
    );
};

export default PrimaryButton;