import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Footerlogo from "../components/Footerlogo";
import SocialsMenu from "../components/SocialsMenu";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

const Layout = ({ children }) => {
  const location = useLocation();

  const { data: categories, loading } = useFetch(`api/categories`);

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: false },
  ]);

  useEffect(() => {
    if (location.pathname === '/') handleCurrent("Home")
    else handleCurrent('')
  }, [location])

  useEffect(() => {
    if (categories && navigation.length <= 4) {
      let tmpNav = navigation;
      categories.map((cat) => {
        if (
          !navigation.find((nav) => nav.name.toLowerCase() === cat.attributes.title.toLowerCase())
        )
          tmpNav.push({
            name:
              cat.attributes.title.charAt(0).toUpperCase() +
              cat.attributes.title.slice(1),
            href: `/products/${cat.attributes.title}`,
            current: false,
          });
      });
      setNavigation(tmpNav);
    }
  }, [categories]);

  useEffect(() => {
    console.log(1)
  }, [navigation])

  const handleCurrent = (current) => {
    let tmpNav = navigation;
    tmpNav.map((x) => x.name === current ? x.current = true : x.current = false);

    setNavigation(tmpNav);
  }

  return (
    <>
      {!categories ? (
        <Loading />
      ) : (
        <>
          <Navbar navigation={navigation} />
          {children}
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <>
                <SocialsMenu />
                <Banner />
                <Footerlogo />
                <Footer />
              </>
            )}
        </>
      )}
    </>
  );
};

export default Layout;
