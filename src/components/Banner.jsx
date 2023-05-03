import { CiDeliveryTruck, CiLock } from "react-icons/ci";
import { SiKlarna } from "react-icons/si";
import { TfiHeadphoneAlt } from "react-icons/tfi";

function Banner() {
  return (
    <div className="w-full flex items-center justify-center p-8 mb-20">
      <div className="grid max-w-[1400px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 bg-gradient-to-tr from-[#282828] to-[#363636] rounded-lg pr-4 pl-4">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <div className="h-20 flex flex-col items-center justify-center space-y-2 mb-2 mt-2">
            <div className="h-10 w-full flex items-center justify-center">
              <TfiHeadphoneAlt className="text-primary w-8 h-8" />
            </div>
            <h3 className="uppercase text-white font-bold text-lg">
              Live Chat
            </h3>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-center text-sm text-gray-400 pb-4 ">
              Experience seamless customer service and support with our live
              chat feature, available 24/7 to assist you with any inquiries or
              concerns
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <div className="h-20 flex flex-col items-center justify-center space-y-2 mb-2 mt-2">
            <div className="h-10 w-full flex items-center justify-center">
              <CiDeliveryTruck className="text-primary w-10 h-10" />
            </div>
            <h3 className="uppercase text-white font-bold text-lg">Delivery</h3>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-center text-sm text-gray-400 pb-4">
              Sit back and relax while we handle your delivery with care,
              ensuring your package arrives safely and on time.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <div className="h-20 flex flex-col items-center justify-center space-y-2 mb-2 mt-2">
            <div className="h-10 w-full flex items-center justify-center">
              <CiLock className="text-primary w-10 h-10" />
            </div>
            <h3 className="uppercase text-white font-bold text-lg">Security</h3>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-center text-sm text-gray-400 pb-4">
              Shop with confidence knowing that your payment information is safe
              and secure with our encrypted payment processing system
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4 mb-2">
          <div className="h-20 flex flex-col items-center justify-center space-y-2 mb-2 mt-2">
            <div className="h-10 w-full flex items-center justify-center">
              <SiKlarna className="text-primary w-8 h-8" />
            </div>
            <h3 className="uppercase text-white font-bold text-lg h-10">
              Klarna
            </h3>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-center text-sm text-gray-400 pb-4">
              Shop now, pay later with Klarna - flexible and convenient payment
              options available in Europe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
