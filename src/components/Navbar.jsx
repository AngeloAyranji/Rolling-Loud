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
import Logo from "../assets/Images/LogoSky.png";
import Cart from "./Cart";
import Dropdown from "./Dropdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ navigation, setNavigation }) {
  const navigate = useNavigate();
  const location = useLocation();

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
                {/* Mobile menu button*/}
                {/* <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                </Disclosure.Button> */}
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
                <div className="hidden 2xl:ml-6 2xl:block">
                  <div className="flex space-x-4 items-center">
                    {nav.map((item) => (
                      <Dropdown
                        key={item.name}
                        title={item.name}
                        href={item.href}
                        subCategories={item.sub}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 2xl:static 2xl:inset-auto 2xl:ml-6 2xl:pr-0">
                <button
                  type="button"
                  className=" ml-3 relative rounded-full bg-[#121212] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <span className="sr-only">View cart</span>
                  <ShoppingCartIcon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                  <div className="absolute flex top-[-3px] right-[-2px] h-4 w-3 rounded-full bg-primary  justify-center text-center items-center">
                    <p className=" text-white text-sm">{products.length}</p>
                  </div>
                </button>

                {opena && <Cart handleOpen={handleOpen} />}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:text-white">
                      <span className="sr-only">Open user menu</span>
                      <BsPerson className="h-5 w-5 sm:h-6 sm:w-6 rounded-full" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-[100] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/country"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Change Region
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {localStorage.getItem("jwt") !== null && (
                              <a
                                href="/orders"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Orders
                              </a>
                            )}
                          </>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {/* isLoggedIn condition */}
                            {localStorage.getItem("jwt") === null ? (
                              <a
                                href="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign in
                              </a>
                            ) : (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                                onClick={handleLogOut}
                              >
                                {" "}
                                Sign out
                              </div>
                            )}
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
