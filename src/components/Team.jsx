import React from "react";
import person from "../assets/Images/Person.png";
import { AiOutlineInstagram } from "react-icons/ai";

function Team() {
  return (
    <div className="w-full mx-auto flex flex-col px-8 lg:px-20 mb-20 md:mt-20 mt-10">
      <h2 className="font-extrabold text-white text-3xl uppercase mb-4">
        team of <span className="text-primary">pilots</span>
      </h2>
      <p className="text-white max-w-2xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium,
        quod commodi aspernatur saepe quibusdam libero, minus magnam dolor
        voluptates nulla dignissimos, ipsam exercitationem! Architecto, quaerat
        nostrum? Eos nulla accusamus a!
      </p>

      {/* Image Slider */}
      <div className="w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full pt-14 md:pt-28 flex flex-row justify-start md:space-x-[70px] space-x-8 pb-10 snap-mandatory snap-x">
        {/* Images to map */}
        <div className="flex flex-col justify-center items-center snap-center">
          <div className="w-[170px] h-[170px] md:w-[300px] md:h-[300px] rounded-full border border-primary relative group cursor-pointer bg-gradient-to-t from-primary/20 to-transparent mb-4">
            <div className="absolute w-full h-[400px] bottom-0 left-0 rounded-b-full z-20 overflow-hidden">
              <img
                src={person}
                alt=""
                className="md:h-[330px] md:w-[330px] h-[190px] w-[190px] object-cover object-bottom absolute bottom-0 left-0 group-hover:scale-110 duration-300 ease-in-out"
              />
            </div>
          </div>
          <h3 className="text-lg md:text-xl text-center font-semibold text-secondary-content max-w-[150px] md:max-w-sm mb-2">
            Chirstopher Ibrahim
          </h3>
          <div className="flex flex-row justify-center space-x-2 items-center w-full hover:text-secondary duration-150 ease-in cursor-pointer">
            <AiOutlineInstagram className="text-xl md:text-2xl" />
            <p className=" text-md md:text-lg">christopher.ibrahim</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center snap-center">
          <div className="w-[170px] h-[170px] md:w-[300px] md:h-[300px] rounded-full border border-primary relative group cursor-pointer bg-gradient-to-t from-primary/20 to-transparent mb-4">
            <div className="absolute w-full h-[400px] bottom-0 left-0 rounded-b-full z-20 overflow-hidden">
              <img
                src={person}
                alt=""
                className="md:h-[330px] md:w-[330px] h-[190px] w-[190px] object-cover object-bottom absolute bottom-0 left-0 group-hover:scale-110 duration-300 ease-in-out"
              />
            </div>
          </div>
          <h3 className="text-lg md:text-xl text-center font-semibold text-secondary-content max-w-[150px] md:max-w-sm mb-2">
            Chirstopher Ibrahim
          </h3>
          <div className="flex flex-row justify-center space-x-2 items-center w-full hover:text-secondary duration-150 ease-in cursor-pointer">
            <AiOutlineInstagram className="text-xl md:text-2xl" />
            <p className=" text-md md:text-lg">christopher.ibrahim</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center snap-center">
          <div className="w-[170px] h-[170px] md:w-[300px] md:h-[300px] rounded-full border border-primary relative group cursor-pointer bg-gradient-to-t from-primary/20 to-transparent mb-4">
            <div className="absolute w-full h-[400px] bottom-0 left-0 rounded-b-full z-20 overflow-hidden">
              <img
                src={person}
                alt=""
                className="md:h-[330px] md:w-[330px] h-[190px] w-[190px] object-cover object-bottom absolute bottom-0 left-0 group-hover:scale-110 duration-300 ease-in-out"
              />
            </div>
          </div>
          <h3 className="text-lg md:text-xl text-center font-semibold text-secondary-content max-w-[150px] md:max-w-sm mb-2">
            Chirstopher Ibrahim
          </h3>
          <div className="flex flex-row justify-center space-x-2 items-center w-full hover:text-secondary duration-150 ease-in cursor-pointer">
            <AiOutlineInstagram className="text-xl md:text-2xl" />
            <p className=" text-md md:text-lg">christopher.ibrahim</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
