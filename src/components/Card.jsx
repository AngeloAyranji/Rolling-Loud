import { useState, Fragment } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegionChecker } from "../hooks/regionChecker";
import { addToCart } from "../redux/cartReducer";
import { updateQuantity } from "../redux/cartReducer";
import { FaEthereum } from "react-icons/fa";
import useCrypto from "../hooks/useCrypto";

function Card({ tokenId, price }) {
  const navigate = useNavigate();

  const { currency, ticketName } = useCrypto();

  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);


  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const CloseToast = () => {
    setShowToast(false);
  };


  return (
    <Fragment>
      {/* card */}
      <div className="flex flex-col rounded-xl w-[150px] md:w-[190px] shadow-xl h-full lg:w-[300px] md:h-[320px] lg:h-[500px] cursor-pointer group relative bg-gradient-to-br from-[#2c2c2c] to-[#171717] p-3 border-[2px] border-[#5c5c5c] overflow-hidden">
        <div className="absolute right-6 bottom-6 w-[50%] aspect-square rounded-full bg-cyan-400 brightness-90 blur-[80px] "></div>
        <div className="w-full h-full border-4 border-white rounded-xl flex flex-col z-10">
          <div className="w-full h-[75%] aspect-square"></div>
          <div className="w-full h-[25%] border-t-4 border-white p-4 flex flex-col justify-center space-y-4">
            <h3 className="text-white text-2xl font-bold uppercase tracking-widest">
            RL #{tokenId}
            </h3>
            <div className="flex flex-row space-x-2 items-center">
              <FaEthereum className="w-6 h-6 text-white" />
              <p>{price != null ? price : "---"} {currency}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Card;
