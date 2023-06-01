import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Carousel, IconButton } from "@material-tailwind/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { container } from "../utils/motion";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import Loading from "./Loading";
function Hero() {
  const { data: videoUrl } = useFetch("api/hero-video?populate=*");
  const { data: imagesUrl } = useFetch("api/hero-image?populate=*");

  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
    const video = document.getElementById("herovid");
    video.play();
  };
  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <></>
      )}
      <div className="w-full aspect-[16/14] sm:aspect-[16/9] flex justify-center items-center relative mb-20">
        <Carousel
          loop={true}
          className="w-full absolute left-0 top-0 overflow-hidden"
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
            <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
            id="herovid"
            onCanPlay={handleLoading}
            src={videoUrl?.attributes.video.data.attributes.url}
            autoPlay
            muted
            playsInline
            type="video/mp4"
            className="w-[100%] h-[100%] object-cover object-center brightness-[1]"
          ></video>
          {imagesUrl?.attributes.image.data &&
            imagesUrl?.attributes.image.data.map((item, index) => (
              <img
                key={index}
                src={item.attributes.url}
                className="w-full h-full object-cover object-center brightness-[0.4]"
              />
            ))}
        </Carousel>
        <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-[#121212] to-transparent z-[5]"></div>
        <motion.div
          className="flex flex-row absolute top-[64%] sm:top-[60%] sm:left-[25%] left-[12%] z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 3.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Link to="/products">
            <button className="btn btn-primary btn-outline text-secondary-content lg:btn-lg">
              Explore
            </button>
          </Link>
        </motion.div>
      </div>
    </Fragment>
  );
}

export default Hero;
