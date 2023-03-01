import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";

function SocialsMenu() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="fixed bottom-4 right-4 rounded-full bg-secondary flex flex-col items-center justify-center space-y-4 p-4 transition-transform">
      <TfiHeadphoneAlt
        className="text-secondary-content w-6 h-6 cursor-pointer"
        onClick={handleOpen}
      />
      <a
        href=""
        className={
          open
            ? "text-secondary-content w-6 h-6 cursor-pointer hover:text-blue-500"
            : "hidden"
        }
      >
        <BsMessenger className="w-full h-full" />
      </a>
      <a
        href=""
        className={
          open
            ? "text-secondary-content w-6 h-6 cursor-pointer hover:text-green-400"
            : "hidden"
        }
      >
        <BsWhatsapp className="w-full h-full" />
      </a>
    </div>
  );
}

export default SocialsMenu;
