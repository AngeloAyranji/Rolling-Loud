import { Link } from "react-router-dom";
import drone from "../assets/Images/future.png";
function ParallaxCard() {
  return (
    <div className="w-full flex justify-center px-8 mt-40">
      <div className="w-full mx-auto flex items-center justify-center max-w-[1400px] mb-12">
        <div className="flex flex-col items-center md:items-start md:flex-row rounded-lg bg-[#121212] border-4 border-primary w-full mb-10 relative">
          <div className="flex flex-col space-y-4 w-full md:w-[60%] p-8 z-10 drop-shadow-xl">
            <h2 className="font-extrabold text-white text-3xl">
              WELCOME TO <span className="text-primary">ROLLING LOUD</span>
            </h2>
            <p className="text-white">
              We are thrilled to invite you to the most electrifying event of
              the year – Rolling Loud Festival 2023! Prepare to be swept away by
              a tidal wave of pulsating beats, mind-blowing performances, and an
              atmosphere that will leave you breathless. Get ready to experience
              the ultimate musical journey like never before. Join us at Rolling
              Loud Festival 2023 and let the music take you on an unforgettable
              journey. Mark your calendars, spread the word, and get ready to
              elevate your festival experience to new heights. We can't wait to
              see you there!
            </p>
            <button className="btn btn-primary w-[120px] text-white">
              <Link to="/products">EXPLORE</Link>
            </button>
          </div>
          <div className="flex justify-center items-center w-[95%] max-w-[300px] md:w-[300px] relative md:absolute md:right-8 md:bottom-0 md:translate-y-0 z-0">
            <img src={drone} alt="" className="opacity-100 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParallaxCard;
