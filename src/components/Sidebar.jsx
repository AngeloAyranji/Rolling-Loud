import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Dropdown from "./Dropdown";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useFetch from "../hooks/useFetch";

const theme = createTheme({
  palette: {
    primary: {
      main: "#02DBE0",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function Sidebar({
  open,
  handleSidebar,
  setIsNew,
  setIsPromotion,
  setIsFeatured,
  setIsInStock,
  setPrice,
  categories,
  setCategories
}) {
  const {data: categoriesDB, loading, error} = useFetch("api/categories?populate=*");
  function valuetext(value) {
    return `${value} $`;
  }
  const [value, setValue] = useState([0, 2000]);

  const handleChangeSlider = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={
        open
          ? "fixed top-0 left-0 w-full h-screen bg-[#121212] overflow-y-scroll z-10 transition-transform md:static md:w-[320px] md:h-full md:overflow-y-auto pl-8 md:pl-0"
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
          <div className="flex flex-row justify-start items-center space-x-4 pl-2">
            <input
              type="checkbox"
              id="new"
              value="new"
              onChange={(e) => setIsNew(e.target.checked)}
              className="checked:bg-primary rounded-sm"
            />
            <label htmlFor="new">New</label>
          </div>
          <div className="flex flex-row justify-start items-center space-x-4 pl-2">
            <input
              type="checkbox"
              id="featured"
              value="featured"
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="checked:bg-primary rounded-sm"
            />
            <label htmlFor="featured">Featured</label>
          </div>
          <div className="flex flex-row justify-start items-center space-x-4 pl-2">
            <input
              type="checkbox"
              id="Promotion"
              value="Promotion"
              onChange={(e) => setIsPromotion(e.target.checked)}
              className="checked:bg-primary rounded-sm"
            />
            <label htmlFor="Promotion">Promotion</label>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-4 mt-8">
          <h3 className="text-white text-lg ">Availability</h3>
          <div className="flex flex-row justify-start items-center space-x-4 pl-2">
            <input
              type="checkbox"
              id="inStock"
              value="inStock"
              onChange={(e) => setIsInStock(e.target.checked)}
              className="checked:bg-primary rounded-sm"
            />
            <label htmlFor="inStock">In Stock</label>
          </div>
          <div className="flex flex-row justify-start items-center space-x-4 pl-2">
            <input
              type="checkbox"
              id="outOfStock"
              value="outOfStock"
              className="checked:bg-primary rounded-sm"
            />
            <label htmlFor="outOfStock">Out Of Stock</label>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-4 mt-8">
          <h3 className="text-white text-lg ">Price</h3>
          <div className="w-full max-w-[170px]">
            <ThemeProvider theme={theme}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChangeSlider}
                onChangeCommitted={(e, p) => setPrice(p)}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={2000}
                min={0}
              />
            </ThemeProvider>
          </div>
        </div>

        <Dropdown categoriesDB={categoriesDB} categories={categories} setCategories={setCategories} />
      </div>
    </div>
  );
}

export default Sidebar;
