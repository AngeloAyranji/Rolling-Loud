import React from "react";
import { CiDeliveryTruck, CiLock } from "react-icons/ci";

function Banner() {
  return (
    <div className="w-full flex items-center justify-center bg-[#121212] p-8 mb-20">
      <div className="grid max-w-[1400px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 bg-gradient-to-tr from-[#282828] to-[#363636] rounded-lg pr-4 pl-4">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <CiDeliveryTruck className="text-primary w-10 h-10 font-light" />
          <h3 className="uppercase text-white font-bold text-lg">Delivery</h3>
          <p className="text-center text-sm text-gray-400 pb-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            sed, iure sequi, reprehenderit
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <CiLock className="text-primary w-10 h-10" />
          <h3 className="uppercase text-white font-bold text-lg">Delivery</h3>
          <p className="text-center text-sm text-gray-400 pb-4 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            sed, iure sequi, reprehenderit
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <CiDeliveryTruck className="text-primary w-10 h-10" />
          <h3 className="uppercase text-white font-bold text-lg">Delivery</h3>
          <p className="text-center text-sm text-gray-400 pb-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            sed, iure sequi, reprehenderit
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <CiDeliveryTruck className="text-primary w-10 h-10" />
          <h3 className="uppercase text-white font-bold text-lg">Delivery</h3>
          <p className="text-center text-sm text-gray-400 pb-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            sed, iure sequi, reprehenderit
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
