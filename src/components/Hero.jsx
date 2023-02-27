import React from "react";
import bgVid from "../assets/Videos/pexels-mikhail-nilov-6981411.mp4";
import { Link } from "react-router-dom";

function Hero() {
  const images = [
    "https://cdn.pixabay.com/photo/2021/03/25/09/10/fog-6122490_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/11/06/05/15/uav-4605203__340.jpg",
    "https://cdn.pixabay.com/photo/2018/04/01/19/36/body-of-water-3281906__340.jpg",
  ];
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="carousel w-full h-full absolute left-0 top-0">
        <div id="slide1" className="carousel-item relative w-full">
          <video
            src={bgVid}
            autoPlay
            loop
            muted
            className="w-full object-cover object-center brightness-[0.4]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle hidden md:flex">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle hidden md:flex">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src={images[1]}
            className="w-full object-cover object-center brightness-[0.4]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle hidden md:flex">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle hidden md:flex">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src={images[2]}
            className="w-full object-cover object-center brightness-[0.4]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle hidden md:flex">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle hidden md:flex">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-[#121212] to-transparent"></div>
      <div className="flex flex-col z-[1] space-y-4 lg:space-y-8">
        <h1 className="font-planet text-[50px] md:text-[70px] lg:text-[120px] text-white">
          <span className="text-primary">SKY</span>SHOP
        </h1>
        <div className="flex flex-row space-x-4">
          <Link to="/products">
            <button className="btn btn-primary btn-outline text-secondary-content lg:btn-lg">
              Explore
            </button>
          </Link>
          <Link to="/products">
            <button className="btn btn-primary btn-outline text-white lg:btn-lg">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
