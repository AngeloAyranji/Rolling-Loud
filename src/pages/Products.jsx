import React from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import ListProduct from "../components/ListProduct";
import { BsSliders } from "react-icons/bs";
import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";

function Products() {
  const [isSidebar, setIsSidebar] = useState(false);

  const handleSidebar = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div className="w-full md:mb-[200px] mb-20">
      <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
        <Breadcrumbs className="z-0" />
        <h2 className="text-xl xl:text-3xl font-bold text-white">HELLO</h2>
        <p className="max-w-[700px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
          veritatis placeat id soluta incidunt provident nostrum quibusdam amet
          dolor, excepturi eius, nihil quisquam. Debitis reprehenderit atque,
          suscipit quaerat impedit minima!
        </p>
        <div className="flex flex-row justify-between md:justify-start items-center w-full border-t-2 border-t-base-100 pt-6 space-x-8 md:space-x-0">
          <BsSliders
            className="w-6 h-6 font-thin text-[#A6ADBB] md:hidden"
            onClick={handleSidebar}
          />
          <div className="pl-0">
            <Select
              color="cyan"
              label="Sort By"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              className="ml-0"
            >
              <Option>Highest Price First</Option>
              <Option>Lowest Price First</Option>
              <Option>From A to Z</Option>
              <Option>From Z to A</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full relative mb-8">
        <Sidebar open={isSidebar} handleSidebar={handleSidebar} />
        <div className="w-full mx-auto flex items-center justify-center">
          <ListProduct />
        </div>
      </div>
    </div>
  );
}

export default Products;