import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Footerlogo from "../components/Footerlogo";
import SocialsMenu from "../components/SocialsMenu";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {children}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          <SocialsMenu />
          <Banner />
          <Footerlogo />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
