import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineWhatsApp,
} from "react-icons/ai";
function Footerlogo() {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content flex flex-col items-center justify-center">
      <div>
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-[30px] lg:text-[50px] font-planet uppercase">
            skyshop
          </h1>
        </div>
        <p className="font-bold mt-8">
          SKYSHOP Ltd. <br />
          Providing reliable tech since 2019
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
    </footer>
  );
}

export default Footerlogo;
