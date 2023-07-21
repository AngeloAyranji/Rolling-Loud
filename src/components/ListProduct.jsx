import { Fragment, useState } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { Link } from "react-router-dom";
import { BigNumber } from "ethers";
import useCrypto from "../hooks/useCrypto";
import { useEffect } from "react";
import { ethers } from "ethers";

function ListProduct({ products, loading }) {
  const [tokenIds, setTokenIds] = useState([]);
  const [prices, setPrices] = useState([]);

  const { contract } = useCrypto();

  useEffect(() => {
    if(contract != null) {
      handleMaxId()
    }
  }, [contract])

  useEffect(() => {
    if(tokenIds.length > 0) {
      handlePrice()
    }
  }, [tokenIds])

  const handleMaxId = async () => {
    const maxTokenId = await contract.getMaxTokenId();
    const sanitizedHexString = maxTokenId._hex.slice(2);
    const resultNumber = parseInt(sanitizedHexString, 16);
    
    setTokenIds(Array.from({ length: resultNumber  }, (_, index) => index));
  }

  const handlePrice = async () => {
    const tmpPrice = []
    for(let i = 0; i < tokenIds.length; i++) {
      let _price = await contract.getPrice(tokenIds[i]);
      _price = parseInt(_price._hex, 16).toString();
      _price = ethers.utils.formatUnits(_price, 18)
      tmpPrice.push(_price);
    }
    
    setPrices(tmpPrice)
  }

  return (
    <div className="grid grid-cols-2 md:gap-8 xl:gap-14 2xl:gap-8 2xl:grid-cols-3 gap-4 p-4 justify-start">
      <Fragment>
        {tokenIds.map((tokenId, index) => (
          <Link to={`/product/${tokenId}`}>
            <Card tokenId={tokenId} price={prices[index]} />
          </Link>
        ))}
      </Fragment>

    </div>
  );
}

export default ListProduct;
