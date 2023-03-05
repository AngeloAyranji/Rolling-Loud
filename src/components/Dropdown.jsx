import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Dropdown({ categoriesDB, categories, setCategories }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategories = (checked, id) => {
    let x = categories;
    if(checked) x.push(id);
    else x = x.filter((item) => item != id)
    setCategories(x)
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full flex flex-col space-y-4 mt-8 z-10">
      <div className="flex flex-row justify-between items-center w-[180px]">
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
        {categoriesDB?.map((item, index) => (
          <div
            className="flex flex-row justify-start space-x-4 items-center pl-2"
            key={index}
          >
            <input
              type="checkbox"
              id={item.attributes.title}
              value={item.attributes.title}
              onChange={(e) => handleCategories(e.target.checked, item.id)}
              className="checked:bg-primary rounded-sm"
            />
            <label htmlFor={item.id}>{item.attributes.title}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
