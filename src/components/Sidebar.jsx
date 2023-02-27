import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Dropdown from "./Dropdown";

function Sidebar({ open, handleSidebar }) {
  const handleChange = () => {};
  return (
    <div
      className={
        open
          ? "fixed top-0 left-0 w-full h-screen bg-[#121212] overflow-y-scroll z-10 transition-transform md:static md:w-[320px] md:h-full md:overflow-y-auto"
          : "fixed top-0 left-0 w-full h-screen bg-[#121212] translate-x-[-100%] overflow-y-scroll transition-transform md:static md:w-[320px] md:h-full md:translate-x-0 md:overflow-y-auto"
      }
    >
      <div className="w-full h-full flex flex-col space-y-4 p-4 lg:pl-8 2xl:pl-14">
        <div className="w-full flex flex-row justify-between items-center mb-8 border-b-2 border-b-base-100 h-20">
          <h2 className="text-white font-bold text-md uppercase">
            144 products
          </h2>
          <div className="text-white md:hidden">
            <AiOutlineClose className="w-6 h-6" onClick={handleSidebar} />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-4 mt-8">
          <h3 className="text-white text-lg ">Filter by</h3>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="new"
              value="new"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="new">New</label>
          </div>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="featured"
              value="featured"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="featured">Featured</label>
          </div>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="Promotion"
              value="Promotion"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="Promotion">New</label>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-4 mt-8">
          <h3 className="text-white text-lg ">Availability</h3>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="inStock"
              value="inStock"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="inStock">In Stock</label>
          </div>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="outOfStock"
              value="outOfStock"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="outOfStock">Out Of Stock</label>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-4 mt-8">
          <h3 className="text-white text-lg ">Price</h3>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="inStock"
              value="inStock"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="inStock">In Stock</label>
          </div>
          <div className="flex flex-row justify-start space-x-4 pl-2">
            <input
              type="checkbox"
              id="outOfStock"
              value="outOfStock"
              onChange={handleChange}
              className=""
            />
            <label htmlFor="outOfStock">Out Of Stock</label>
          </div>
        </div>

        <Dropdown />
        <Dropdown />
        <Dropdown />
        <Dropdown />
      </div>
    </div>
  );
}

export default Sidebar;
