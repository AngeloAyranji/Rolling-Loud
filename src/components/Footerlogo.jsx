import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import logo from "../assets/Images/rollingloudlogo.png";
function Footerlogo() {
  return (
    <footer className="footer footer-center p-10 text-primary-content flex flex-col items-center justify-center">
      <div>
        <div className="flex items-center justify-center mt-4">
          <img src={logo} alt="" className="w-[200px]" />
        </div>
        <p className="font-bold mt-8">
          Rolling Loud Ltd. <br />
          The Largest Hip-Hop Festival in the World.
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.instagram.com/skyshop.fpv/" target="_blank">
            <AiOutlineInstagram className="w-[28px] h-[28px] text-white hover:scale-105 ease-in duration-150 cursor-pointer" />
          </a>
          <a href="https://www.facebook.com/skyshop.fpv" target="_blank">
            <AiFillFacebook className="w-[28px] h-[28px] text-white hover:scale-105 ease-in duration-150 cursor-pointer" />
          </a>
          <a href="https://wa.me/+96170124129" target="_blank">
            <AiOutlineWhatsApp className="w-[28px] h-[28px] text-white hover:scale-105 ease-in duration-150 cursor-pointer" />
          </a>
        </div>
      </div>
      <div className="w-[50%] h-[2px] mt-10">
        <div className="bg-primary w-full h-full"></div>
      </div>
    </footer>
  );
}

export default Footerlogo;
