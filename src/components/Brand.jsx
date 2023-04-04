import React from "react";

function Brand({ imgsrc, name }) {
  return (
    <div className="flex flex-col space-y-4 w-[130px] md:w-[200px]">
      <div className="w-full aspect-square rounded-full border-2 border-primary overflow-hidden hover:animate-pulse cursor-pointer hover:border-secondary ease-in duration-700">
        <img
          src={imgsrc}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <h2 className="font-semibold text-secondary-content uppercase text-center text-lg">
        {name}
      </h2>
    </div>
  );
}

export default Brand;
