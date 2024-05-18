
const Button: React.FC<{label:string}> = ({label}) => {
    return (
        <button className="bg-primary text-white py-2 px-4 rounded">
            {label}
        </button>
    );
};

export default Button;