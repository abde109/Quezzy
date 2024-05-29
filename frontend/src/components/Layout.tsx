import Footer from "./Footer";
import Header from "./Header";

const Layout:React.FC<{children:string}> = ({ children }) => {
    return (
        <div>
        <Header />
        {children}
        <Footer />
        </div>
    );
};

export default Layout;