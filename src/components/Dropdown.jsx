import { useState } from "react";
import { Fragment, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

function Dropdown({ title, subCategories }) {
  const [isOpen, setIsOpen] = useState(false);

  // const handleCategories = (checked, id) => {
  //   let x = categories;
  //   if (checked) x.push(id);
  //   else x = x.filter((item) => item != id);
  //   setCategories(x);
  // };
  
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    function handleTouchStart() {
      setIsTouchDevice(true);
    }

    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
  return (
    <Fragment>
      {isTouchDevice ? (
        <div className="relative overflow-visible">
          <div className="relative flex flex-row lg:justify-between items-center space-x-2 hover:text-primary lg:hover:border-b-2 border-primary cursor-pointer py-1 uppercase text-secondary-content z-10">
            <Link to={`/products/${title}`} className=" text-sm font-medium">{title}</Link>
            {subCategories && (
              <FiChevronDown
                className={
                  isOpen
                    ? " h-5 w-5 cursor-pointer rotate-180 ease-in-out duration-300"
                    : " h-5 w-5 cursor-pointer ease-in-out duration-300"
                }
                onClick={handleOpen}
              />
            )}
          </div>
          {subCategories && (
            <div
              className={
                isOpen
                  ? "w-fit lg:absolute lg:left-0 lg:top-0 mb-4 flex flex-col space-y-4 justify-start ease-in-out duration-300 z-0"
                  : "hidden"
              }
            >
              <div className="pt-0 lg:pt-[36px]">
                <div className="lg:bg-[#313131] lg:rounded-md p-4 flex flex-col space-y-4">
                  {subCategories?.map((sub, index) => (
                    <Link
                      key={index}
                      to={`/products/${title}/${sub?.attributes.title}`}
                      className="cursor-pointer text-secondary-content hover:text-primary font-medium text-sm uppercase whitespace-nowrap"
                    >
                      {sub.attributes.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="block relative overflow-visible"
          onMouseEnter={handleOpen}
          onMouseLeave={handleOpen}
        >
          <div className="relative flex flex-row lg:justify-between items-center space-x-2 hover:text-primary lg:hover:border-b-2 border-primary cursor-pointer py-1 uppercase text-secondary-content z-10">
            <Link to={`/products/${title}`} className=" text-sm font-medium">{title}</Link>
            {subCategories && (
              <FiChevronDown
                className={
                  isOpen
                    ? " h-5 w-5 cursor-pointer rotate-180 ease-in-out duration-300"
                    : " h-5 w-5 cursor-pointer ease-in-out duration-300"
                }
              />
            )}
          </div>
          {subCategories && (
            <div
              className={
                isOpen
                  ? "w-fit lg:absolute lg:left-0 lg:top-0 mb-4 flex flex-col space-y-4 justify-start ease-in-out duration-300 z-0"
                  : "hidden"
              }
            >
              <div className="pt-[8px] lg:pt-[36px]">
                <div className=" bg-[#313131] rounded-md p-4 flex flex-col space-y-4">
                  {subCategories?.map((sub, index) => (
                    <Link
                      key={index}
                      to={`/products/${title}/${sub.attributes.title}`}
                      className="cursor-pointer text-secondary-content hover:text-primary font-medium text-sm uppercase whitespace-nowrap"
                    >
                      {sub.attributes.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Dropdown;
