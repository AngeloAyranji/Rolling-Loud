import React from "react";
import ParallaxCard from "./ParallaxCard";
import bgImg from "../assets/Images/bg-lens-black.png";
import Banner from "./Banner";
import classNames from "classnames";

function About() {
  const buttonText =
    "hsfhsahd ajs fjahfja fjahajhj hjhajfhas hjsfh jfhjjhfasjhas asjfh asjh";
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full justify-center items-center flex p-12 lg:p-20 ">
        <div className="flex max-w-[1400px]">
          <ParallaxCard />
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full min-h-[400px] mb-20">
        <div className="flex flex-col space-y-4 bg-[#fbfbfb] p-8 xl:pr-24 xl:pl-[116px]">
          <h2 className="text-2xl font-extrabold text-black uppercase mb-4 max-w-[400px]">
            Lorem ipsum dolor sit amet{" "}
            <span className="text-primary">consectetur</span>
          </h2>
          <p className="text-[#121212]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            repellat quis quas recusandae nostrum, ab natus delectus quae
            accusamus perspiciatis odio autem modi? Doloremque ipsa accusamus
            dolor dicta, quibusdam rem!
          </p>
          <p className="text-[#121212]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            repellat quis quas recusandae nostrum, ab natus delectus quae
            accusamus perspiciatis odio autem modi? Doloremque ipsa accusamus
            dolor dicta, quibusdam rem!
          </p>
          <button className="mt-4 btn btn-primary w-36">OUR TEAM</button>
        </div>
        <div className="flex w-full max-h-96 max-w-[700px] relative items-end p-8">
          <img
            src={bgImg}
            alt=""
            className="brightness-[0.27] object-cover absolute left-0 top-0 h-full w-full"
          />
          <div className="z-10">
            <h2 className="text-2xl font-extrabold text-white uppercase mb-8 max-w-[400px] tracking-wider">
              HALALALALAAL<span className="text-primary"> eifhowhf</span>
            </h2>
            <div className="flex flex-row space-x-4 justify-start items-center">
              <button className="bg-[#121212] border-white border-2 rounded-lg text-white text-md tracking-wide p-4 bg-blend-color-burn uppercase">
                About
              </button>
              <button className="btn btn-primary glass">Heelo</button>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </div>
  );
}

export default About;
