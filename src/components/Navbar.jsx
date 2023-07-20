import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsPerson } from "react-icons/bs";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Images/rollingloudlogo.png";
import Cart from "./Cart";
import Dropdown from "./Dropdown";
import useCrypto from "../hooks/useCrypto";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ navigation, setNavigation }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { address, handleWalletConnect } = useCrypto();

  const [opena, setOpena] = useState(false);

  const [openMobile, setOpenMobile] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const handleOpen = () => {
    setOpena(!opena);
  };

  const handleMenu = () => {
    setOpenMobile(!openMobile);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");

    navigate("/");
  };

  const handleCurrentNav = (current) => {
    let tmpNav = navigation;
    tmpNav.map((x) =>
      x.name.toLowerCase() === current.toLowerCase()
        ? (x.current = true)
        : (x.current = false)
    );
    setNavigation(tmpNav);
  };

  useEffect(() => {
    const productsprefix = "/products/";
    if (location.pathname === "/") handleCurrentNav("home");
    else if (location.pathname.startsWith(productsprefix))
      handleCurrentNav(location.pathname.substring(productsprefix.length));
    else handleCurrentNav("");
  }, []);

  const [nav, setNav] = useState([]);

  useEffect(() => {
    setNav(navigation);
  }, [navigation]);

  return (
    <Disclosure
      as="nav"
      className="bg-[#121212] fixed top-0 left-0 right-0 z-[10000]"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-[1400px] px-2 md:px-6 2xl:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center 2xl:hidden">
                <div className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {openMobile ? (
                    <XMarkIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      onClick={() => handleMenu()}
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      onClick={() => handleMenu()}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center 2xl:items-stretch 2xl:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" onClick={() => handleCurrentNav("Home")}>
                    <img
                      className="block h-10 w-auto 2xl:hidden"
                      src={Logo}
                      alt="Skyshop"
                    />
                    <img
                      className="hidden h-8 w-auto 2xl:block "
                      src={Logo}
                      alt="Skyshop"
                    />
                  </Link>
                </div>
                <Link to="/">
                <div className="hidden 2xl:ml-6 2xl:block">
                  <div className="flex space-x-4 items-center">
                    Home
                  </div>
                </div>
                </Link>
                <Link to="/products">
                <div className="hidden 2xl:ml-6 2xl:block">
                  <div className="flex space-x-4 items-center">
                    Tickets
                  </div>
                </div>
                </Link>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 2xl:static 2xl:inset-auto 2xl:ml-6 2xl:pr-0">
                {address == null ? (<button onClick={() => handleWalletConnect()}>
                  Connect Wallet
                </button>) : (
                  <>
                  <div>{address.slice(0, 6) + '...' + address.slice(-4)}</div>
                  <div>
                    <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
                  </div>
                  </>   
                )}
              </div>
            </div>
          </div>

          {openMobile && (
            <div className="2xl:hidden">
              <div className="space-y-1 pl-4 pt-2 pb-3">
                {nav.map((item, index) => (
                  <Dropdown
                    key={index}
                    handleMenu={handleMenu}
                    title={item.name}
                    href={item.href}
                    subCategories={item.sub}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Disclosure>
  );
}
