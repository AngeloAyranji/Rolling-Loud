import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";

function SocialsMenu() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className={
        open
          ? "fixed bottom-0 right-4 md:h-[88px] h-[130px]  bg-black flex flex-col jusitfy-center items-center rounded-t-md transition-transform duration-300 z-50"
          : "fixed bottom-0 right-4 md:h-[88px] h-[130px] bg-black flex flex-col jusitfy-center items-center md:translate-y-[56px] translate-y-[103px]  rounded-t-md transition-transform duration-300 z-50"
      }
    >
      <div
        className="h-[32px] md:h-[50px] flex justify-center items-center px-2 pl-3 cursor-pointer"
        onClick={handleOpen}
      >
        <p className="text-xs uppercase font-semibold">Chat&nbsp; </p>
        <p className="hidden md:inline-block text-xs uppercase font-semibold">
          directly with us
        </p>
        <FiChevronDown
          className={
            open
              ? " h-5 w-5  rotate-180 ease-in-out duration-300 ml-4"
              : " h-5 w-5  ease-in-out duration-300 ml-4"
          }
        />
      </div>
      <div className="w-full h-full bg-black flex flex-col md:flex-row justify-between md:justify-center items-center md:space-x-10 md:space-y-0  px-4 md:py-2 py-4">
        <BsWhatsapp className="w-6 h-6 text-secondary-content hover:text-green-500 ease-in duration-150 cursor-pointer" />
        <BsMessenger className="w-6 h-6 text-secondary-content hover:text-blue-500 ease-in duration-150 cursor-pointer" />
      </div>
    </div>
  );
}

export default SocialsMenu;
