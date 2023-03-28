import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch"

function Hero() {

  const {data: videoUrl} = useFetch("api/hero-video?populate=*");
  const {data: imagesUrl} = useFetch("api/hero-image?populate=*");

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="carousel w-full h-full absolute left-0 top-0">
        <div id="slide1" className="carousel-item relative w-full">
            <video
              src={videoUrl?.attributes.video.data.attributes.url}
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
            src={imagesUrl?.attributes.image.data[1].attributes.url}
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
            src={imagesUrl?.attributes.image.data[2].attributes.url}
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
