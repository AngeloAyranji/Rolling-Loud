import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Footerlogo from "../components/Footerlogo";
import SocialsMenu from "../components/SocialsMenu";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";

const Layout = ({ children }) => {
  const location = useLocation();

  const { data: categories } = useFetch(
    `api/categories/?populate[subcategories]=*`
  );

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: false, sub: [] },
  ]);

  useEffect(() => {
    if (categories && navigation.length <= 4) {
      let tmpNav = navigation;
      categories.map((cat) => {
        if (
          !navigation.find(
            (nav) =>
              nav.name.toLowerCase() === cat.attributes.title.toLowerCase()
          )
        )
          tmpNav.push({
            name: cat.attributes.title,
            href: `/products/${cat.attributes.title}`,
            current: false,
            sub: cat.attributes.subcategories.data,
          });
      });
      if (!navigation.find((nav) => nav.name.toLowerCase() === "brands")) {
        tmpNav.push({
          name: "Brands",
          href: "/brands",
          current: false,
          sub: [],
        });
      }

      setNavigation(tmpNav);
    }
  }, [categories]);

  return (
    <>
      {!categories ? (
        <Loading />
      ) : (
        <>
          {location.pathname !== "/country" && (
            <>
              <Navbar navigation={navigation} setNavigation={setNavigation} />
              <SearchBar />
            </>
          )}
          {children}
          {location.pathname !== "/login" &&
            location.pathname !== "/country" &&
            location.pathname !== "/register" && (
              <>
                <SocialsMenu />
                <Banner />
                <Footerlogo />
                <Footer navigation={navigation} />
              </>
            )}
        </>
      )}
    </>
  );
};

export default Layout;
