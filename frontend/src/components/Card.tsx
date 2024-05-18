const Cart:React.FC<{title:string, soustitle:string, description:string}> = ({title,soustitle,description}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <h3 className="text-lg font-semibold text-gray-600">{soustitle}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    );
}

export default Cart;