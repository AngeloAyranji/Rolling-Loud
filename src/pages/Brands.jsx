import React from "react";
import Brand from "../components/Brand";
function Brands() {
  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <div className="max-w-[1400px] w-full p-4 md:p-8">
        <h1 className="text-xl xl:text-3xl font-bold text-white uppercase mt-12">
          our brands
        </h1>
        <p className="mt-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quod
          error incidunt fugiat, expedita corporis soluta rerum architecto, quae
          possimus ab perferendis maiores quam odit dicta reiciendis, tempore
          cupiditate nostrum.
        </p>
        <div className="w-full h-[1px] bg-gray-700 mt-8 mb-10 md:mb-14"></div>
        <div className="w-full flex flex-row flex-wrap justify-center align-start gap-8 md:gap-12">
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
          <Brand
            imgsrc={
              "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
            }
            name={"adidas"}
          />
        </div>
      </div>
    </div>
  );
}

export default Brands;
