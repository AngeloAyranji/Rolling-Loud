import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";

function SocialsMenu() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="fixed bottom-4 right-4 rounded-full bg-secondary flex flex-col items-center justify-center space-y-4 p-4 transition-transform z-[1000]">
      <TfiHeadphoneAlt
        className="text-secondary-content w-6 h-6 cursor-pointer"
        onClick={handleOpen}
      />
      <a
        href="https://m.me/Skyshop.fpv"
        className={
          open
            ? "text-secondary-content w-6 h-6 cursor-pointer hover:text-blue-500"
            : "hidden"
        }
      >
        <BsMessenger className="w-full h-full" />
      </a>
      <a
        href="https://wa.me/+96170124129"
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
