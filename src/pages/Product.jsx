import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { CiDeliveryTruck, CiLock } from "react-icons/ci";
import { Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Select, Option } from "@material-tailwind/react";
import remarkGfm from "remark-gfm";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { addToCart } from "../redux/cartReducer";
import useFetch from "../hooks/useFetch";
import { useRegionChecker } from "../hooks/regionChecker";
import Loading from "../components/Loading";
import { MdAddShoppingCart } from "react-icons/md";
import Rating from "../components/Rating";
import useCrypto from "../hooks/useCrypto";
import { ethers } from "ethers";
import Card from "../components/Card";

function Product() {
  const [price, setPrice] = useState(null);
  const [supply, setSupply] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [waitTrx, setWaitTrx] = useState(false);
  const [trx, setTrx] = useState(null);

  const { productName: tokenId } = useParams();

  const { ticketName, currency, contract, address, handleWalletConnect } =
    useCrypto();

  useEffect(() => {
    if (contract != null) {
      handlePrice();
      handleSupply();
    }
  }, [contract]);

  const handlePrice = async () => {
    let tmpPrice = await contract.getPrice(tokenId);
    tmpPrice = parseInt(tmpPrice._hex, 16).toString();
    tmpPrice = ethers.utils.formatUnits(tmpPrice, 18);
    setPrice(tmpPrice);
  };

  const handleSupply = async () => {
    let tmpSupply = await contract.getSupply(tokenId);
    tmpSupply = parseInt(tmpSupply._hex);
    setSupply(tmpSupply);
  };

  const handleMint = async () => {
    setWaitTrx(true);
    const options = {
      value: ethers.utils.parseEther((parseFloat(price) * quantity).toString()),
    };
    contract.mint(tokenId, quantity, options).then((tx) => {
      console.log(tx);
      setTrx(tx);
      setWaitTrx(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>Ticket {tokenId}</title>
      </Helmet>

      <div className="flex w-full mx-auto p-4 pt-8 md:p-8">
        <div className="flex flex-col space-y-8 w-full mx-auto max-w-[1400px]">
          <Breadcrumbs
            separator=" › "
            aria-label="breadcrumb"
            className="!bg-transparent !text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
            color="cyan"
          >
            <Link
              to="/"
              className="text-secondary-content hover:text-primary duration-150 ease-in"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-secondary-content hover:text-primary duration-150 ease-in"
            >
              Tickets
            </Link>
            <Link
              to={`/product/${tokenId}`}
              className="text-secondary-content hover:text-primary duration-150 ease-in"
            >
              RL #{tokenId}
            </Link>
          </Breadcrumbs>
          <div className=" flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center mt-8 lg:mt-12 lg:space-x-8 xl:space-x-14">
            <Card tokenId={tokenId} price={price} />

            <div className="flex flex-col space-y-4 mt-12 lg:mt-0 max-w-[520px] lg:max-w-none">
              ROLLING LOUD #{tokenId}
              <h2 className="text-xl text-secondary-content font-bold">
                {ticketName(tokenId)}
              </h2>
              <div className="divider"></div>
              <p className="text-xl text-primary font-semibold tracking-wide">
                {price != null ? price : "---"} {currency}
              </p>
              <div className="pt-4 pb-4 flex flex-row justify-start space-x-4 items-center">
                <div className="flex text-xl h-full flex-row justify-between p-2 border rounded-lg border-primary items-center w-[100px] text-secondary-content px-3">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                  {supply <= 0 ? 0 : quantity}
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev >= supply ? supply : prev + 1
                      )
                    }
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <button
                  className={
                    supply <= 0 || waitTrx == true
                      ? "btn btn-disabled btn-primary w-full max-w-[250px] flex items-center justify-center space-x-4"
                      : "btn btn-primary w-full max-w-[250px] flex items-center justify-center space-x-4"
                  }
                  onClick={() => {
                    if (address != null) handleMint();
                    else handleWalletConnect();
                  }}
                >
                  <p>
                    {address != null
                      ? waitTrx == false
                        ? "Mint"
                        : "Minting..."
                      : "Connect Wallet"}
                  </p>
                  <MdAddShoppingCart className="w-5 h-5 font-extralight" />
                </button>
              </div>
              {/*
              <div className="divider"></div>
              <div className="flex flex-row space-x-4 items-center pt-4">
                <CiLock className="w-10 h-10 text-secondary-content text-sm" />
                <div className="flex flex-col space-y-1">
                  <p className="uppercase text-secondary-content">
                    Secure payments
                  </p>
                  <p className="text-xs">
                    All payments made from SkyShop are 100% secure
                  </p>
                </div>
              </div>
              <div className="flex flex-row space-x-4 items-center">
                <CiDeliveryTruck className="w-10 h-10 text-secondary-content" />
                <div className="flex flex-col space-y-2">
                  <p className="uppercase text-secondary-content text-sm">
                    fast deliveries
                  </p>
                  <p className="text-xs">
                    All deliveries take 3-5 business days
                  </p>
                </div>
              </div>
                */}
            </div>
          </div>

          {/* extra infos and related products */}
          <div className="w-full mx-auto p-4 md:p-8 border-2 border-primary rounded-lg flex flex-col space-y-4 pt-8">
            <h3 className="text-secondary-content text-lg font-semibold tracking-wide uppercase">
              Concert Description
            </h3>
            <div className="w-full h-[2px] rounded-full bg-secondary-content/[0.5]"></div>
            <ReactMarkdown
              className="prose text-secondary-content lg:text-lg tracking-wide min-w-full"
              remarkPlugins={[remarkGfm]}
            >
              Rolling Loud, an electrifying music festival, pulsates with the
              heartbeats of passionate fans amid an expansive sea of energy.
              Embracing hip-hop's finest, the event unites stars and emerging
              talents alike, delivering powerhouse performances and
              unforgettable memories. With colossal stages, booming bass, and
              ecstatic crowds, Rolling Loud sets the stage for euphoric euphony.
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
