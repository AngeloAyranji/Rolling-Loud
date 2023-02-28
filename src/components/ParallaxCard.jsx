import React from "react";
import drone from "../assets/Images/droneimage.png";

import { useMotionValue, useTransform, motion } from "framer-motion";
function ParallaxCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [30, -30]);
  return (
    <div className="w-full mx-auto flex items-center justify-center max-w-[1400px] p-14">
      <div style={{ perspective: 2000 }}>
        <motion.div
          style={{ x, y, rotateX, rotateY, z: 100 }}
          drag
          dragElastic={0.18}
          dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
          className="flex flex-col items-center md:items-start md:flex-row rounded-lg bg-[#121212] border-2 border-primary cursor-grab w-full mb-10 drop-shadow-xl"
        >
          <div className="flex flex-col space-y-4 w-full lg:w-[60%] p-8">
            <h2 className="font-extrabold text-white text-3xl">
              DIRECT DEPENDECIES <span className="text-primary">FRAMER</span>
            </h2>
            <p className="text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium, quod commodi aspernatur saepe quibusdam libero, minus
              magnam dolor voluptates nulla dignissimos, ipsam exercitationem!
              Architecto, quaerat nostrum? Eos nulla accusamus a!
            </p>
            <button className="btn btn-primary w-[120px] text-white">
              EXPLORE
            </button>
          </div>
          <div className="flex justify-center items-center w-[270px] md:w-[40%] h-[250px]">
            <div className="relative w-full h-full">
              <motion.div
                style={{ x, y, rotateX, rotateY, z: 1000 }}
                className="absolute md:right-[-20px] md:top-[-20px] top-10"
              >
                <img
                  src={drone}
                  className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.77)]"
                  draggable={false}
                ></img>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ParallaxCard;
