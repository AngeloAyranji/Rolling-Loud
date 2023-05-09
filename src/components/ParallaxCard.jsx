import { Link } from "react-router-dom";
import drone from "../assets/Images/droneimage.png";
function ParallaxCard() {
  return (
    <div className="w-full flex justify-center px-8">
      <div className="w-full mx-auto flex items-center justify-center max-w-[1400px] mb-12">
        <div className="flex flex-col items-center md:items-start md:flex-row rounded-lg bg-[#121212] border-2 border-primary w-full mb-10 drop-shadow-xl">
          <div className="flex flex-col space-y-4 w-full lg:w-[60%] p-8">
            <h2 className="font-extrabold text-white text-3xl">
              FIRST-PERSON <span className="text-primary">VIEW</span>
            </h2>
            <p className="text-white">
              FPV flying serves up an incredible real-time experience, and the
              perspective has several big advantages. You get more precision,
              which is crucial for racing drones, and a cinematic perspective
              that you don’t get from the ground. Plus, it’s just a lot of fun.
              Photographers and videographers take advantage of FPV’s immersive,
              exciting experience to capture shots they’d never be able to get
              from terra firma.
            </p>
            <button className="btn btn-primary w-[120px] text-white">
              <Link to="/products">EXPLORE</Link>
            </button>
          </div>
          <div className="flex justify-center items-center w-[270px] md:w-[40%] h-[250px]">
            <div className="relative w-full h-full">
              <div className="absolute md:right-[-20px] md:top-[-20px] top-10">
                <img src={drone} className=""></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParallaxCard;
