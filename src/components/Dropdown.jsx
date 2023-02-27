import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Dropdown() {
  const filters = [
    {
      id: 1,
      title: "dropdown",
    },
    {
      id: 2,
      title: "dropdown",
    },
    {
      id: 3,
      title: "dropdown",
    },
    {
      id: 4,
      title: "dropdown",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {};

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full flex flex-col space-y-4 mt-8 z-10">
      <div className="flex flex-row justify-between items-center w-[200px]">
        <h3 className="text-white text-md ">Engine</h3>
        <FiChevronDown
          className={
            isOpen
              ? "text-white h-5 w-5 cursor-pointer rotate-180 ease-in-out duration-300"
              : "text-white h-5 w-5 cursor-pointer ease-in-out duration-300"
          }
          onClick={handleOpen}
        />
      </div>
      <div
        className={
          isOpen
            ? "w-full mb-4 flex flex-col space-y-4 justify-start h-full overflow-y-hidden ease-in-out duration-300"
            : "w-full mb-4 flex flex-col space-y-4 justify-start h-0 overflow-y-hidden ease-in-out duration-300"
        }
      >
        {filters?.map((item) => (
          <div
            className="flex flex-row justify-start space-x-4 pl-2"
            key={item.id}
          >
            <input
              type="checkbox"
              id={item.id}
              value={item.id}
              onChange={handleChange}
              className=""
            />
            <label htmlFor={item.id}>{item.title}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
