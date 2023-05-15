import { Fragment, useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { parseLink } from "../utils/utils";
import { isMobile } from "react-device-detect";

function Dropdown({ title, href, subCategories, handleMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      {isMobile ? (
        <div className="relative overflow-visible">
          <div className="relative flex flex-row 2xl:justify-between items-center space-x-2 hover:text-primary 2xl:hover:border-b-2 border-primary cursor-pointer py-1 uppercase text-secondary-content z-10">
            <div className="" role="btn" onClick={() => handleMenu()}>
              <Link to={href} className="text-sm 2xl:text-xs font-bold">
                {title}
              </Link>
            </div>
            {subCategories.length > 0 && (
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
          {subCategories.length > 0 && (
            <div
              className={
                isOpen
                  ? "w-fit 2xl:absolute 2xl:left-0 2xl:top-0 2xl:mb-4 flex flex-col 2xl:space-y-4 justify-start ease-in-out duration-300 z-0"
                  : "hidden"
              }
            >
              <div className="pt-0 2xl:pt-[36px]">
                <div className="2xl:bg-[#313131] 2xl:rounded-md 2xl:p-4 p-2 flex flex-col 2xl:space-y-4 space-y-2">
                  {subCategories?.map((sub, index) => (
                    <div role="btn" onClick={() => handleMenu()}>
                      <Link
                        key={index}
                        to={`/products/${parseLink(title)}/${parseLink(
                          sub?.attributes.title
                        )}`}
                        className="cursor-pointer text-secondary-content hover:text-primary text-xs uppercase font-semibold whitespace-nowrap"
                      >
                        {sub?.attributes.title}
                      </Link>
                    </div>
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
          <div className="relative flex flex-row 2xl:justify-between items-center space-x-1 hover:text-primary 2xl:hover:border-b-2 border-primary cursor-pointer py-1 uppercase text-secondary-content z-10">
            <div className="" role="btn" onClick={() => handleMenu()}>
              <Link to={href} className=" text-xs font-bold">
                {title}
              </Link>
            </div>
            {subCategories.length > 0 && (
              <FiChevronDown
                className={
                  isOpen
                    ? " h-5 w-5 cursor-pointer rotate-180 ease-in-out duration-300"
                    : " h-5 w-5 cursor-pointer ease-in-out duration-300"
                }
              />
            )}
          </div>
          {subCategories.length > 0 && (
            <div
              className={
                isOpen
                  ? "w-fit 2xl:absolute 2xl:left-0 2xl:top-0 mb-4 flex flex-col space-y-4 justify-start ease-in-out duration-300 z-0"
                  : "hidden"
              }
            >
              <div className="pt-[8px] 2xl:pt-[36px]">
                <div className=" bg-[#313131] rounded-md p-4 flex flex-col space-y-4">
                  {subCategories?.map((sub, index) => (
                    <div role="btn" onClick={() => handleMenu()}>
                      <Link
                        key={index}
                        to={`/products/${parseLink(title)}/${parseLink(
                          sub.attributes.title
                        )}`}
                        className="cursor-pointer text-secondary-content hover:text-primary font-medium text-sm uppercase whitespace-nowrap"
                      >
                        {sub.attributes.title}
                      </Link>
                    </div>
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
