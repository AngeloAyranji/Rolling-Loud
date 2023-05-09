import React, { useEffect, useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import useFetch from "../hooks/useFetch";

function Team() {
  const { data: teams } = useFetch(`api/teams/?populate[image]=*`);

  return (
    <div className="w-full mx-auto flex items-center justify-center">
      <div className="w-full mx-auto max-w-[1400px] flex flex-col px-8 mb-20 md:mt-20 mt-10">
        <h2 className="font-extrabold text-white text-3xl uppercase mb-4">
          team of <span className="text-primary">pilots</span>
        </h2>
        {/* Image Slider */}
        <div
          className="w-full overflow-x-scroll scrollbar-custom pt-12 flex flex-row justify-start md:space-x-[70px] space-x-8 pb-10"
          id="image-track"
        >
          {/* Images to map */}
          {teams?.map((team, index) => (
            //
            <div
              key={index}
              className="flex flex-col justify-center items-center snap-center"
            >
              <div className="aspect-[2/3] h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-lg border border-primary relative bg-none">
                <img
                  src={team.attributes.image.data.attributes.url}
                  alt={team.attributes.description}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl md:text-2xl text-center text-secondary-content max-w-[150px] md:max-w-sm mb-2 font-genos font-normal">
                {team.attributes.title}
              </h3>
              <a href={team.attributes.url} rel="noreferrer" target={"_blank"}>
                <div className="flex flex-row justify-center space-x-2 items-center w-full hover:text-secondary duration-150 ease-in cursor-pointer font-genos font-light">
                  <AiOutlineInstagram className="text-xl md:text-2xl" />
                  <p className=" text-md md:text-lg">
                    {team.attributes.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
