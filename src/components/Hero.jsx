import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Carousel, IconButton } from "@material-tailwind/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Hero() {
  const { data: videoUrl } = useFetch("api/hero-video?populate=*");
  const { data: imagesUrl } = useFetch("api/hero-image?populate=*");

  return (
    <div className="w-full h-[720px] md:h-[900px] flex justify-center items-center relative mb-20">
      <Carousel
        autoplay="true"
        autoplayDelay={10000}
        loop="true"
        className="w-full  absolute left-0 top-0 overflow-hidden"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            loop="true"
            className="!absolute top-2/4 -translate-y-2/4 left-4 hidden md:block"
          >
            <BiChevronLeft strokeWidth={2} className="w-6 h-6" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            loop="true"
            className="!absolute top-2/4 -translate-y-2/4 !right-4 hidden md:block"
          >
            <BiChevronRight strokeWidth={2} className="w-6 h-6" />
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <video
          src={videoUrl?.attributes.video.data.attributes.url}
          autoPlay
          loop
          muted
          playsInline
          type="video/mp4"
          className="w-full h-full object-cover object-center brightness-[0.4]"
        ></video>
        <img
          src={imagesUrl?.attributes.image.data[1].attributes.url}
          className="w-full h-full object-cover object-center brightness-[0.4]"
        />
        <img
          src={imagesUrl?.attributes.image.data[2].attributes.url}
          className="w-full h-full object-cover object-center brightness-[0.4]"
        />
      </Carousel>
      <div className="absolute bottom-0 w-full h-[300px] md:h-[400px] bg-gradient-to-t from-[#121212] to-transparent z-[5]"></div>
      <div className="flex flex-col z-10">
        <h1 className="font-planet text-[50px] md:text-[70px] lg:text-[120px] text-white">
          <span className="text-primary">SKY</span>SHOP
        </h1>
        <div className="flex flex-row">
          <Link to="/products">
            <button className="btn btn-primary btn-outline text-secondary-content lg:btn-lg">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
