import React from "react";
import { Fragment } from "react";
import { FaEthereum } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";

function HomeCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  return (
    <Fragment>
      {/* card */}
      <motion.div
        className="flex flex-col rounded-xl w-[150px] md:w-[190px] shadow-xl h-full lg:w-[300px] md:h-[320px] lg:h-[500px] cursor-grap group relative bg-gradient-to-br from-[#2c2c2c] to-[#171717] p-3 border-[2px] border-[#5c5c5c] overflow-hidden z-10"
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.26}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="absolute right-6 bottom-6 w-[50%] aspect-square rounded-full bg-cyan-400 brightness-90 blur-[80px] "></div>
        <div className="w-full h-full border-4 border-white rounded-xl flex flex-col z-10">
          <div className="w-full h-[75%] aspect-square"></div>
          <div className="w-full h-[25%] border-t-4 border-white p-4 flex flex-col justify-center space-y-4">
            <h3 className="text-white text-2xl font-bold uppercase tracking-widest">
              RL#01353
            </h3>
            <div className="flex flex-row space-x-2 items-center">
              <FaEthereum className="w-6 h-6 text-white" />
              <p>0.01 ETH</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default HomeCard;
