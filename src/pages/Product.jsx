import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { CiDeliveryTruck, CiLock } from "react-icons/ci";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { useLocation, Link } from "react-router-dom";
import ReactMakrdown from "react-markdown";


function Product() {
  const { state: product } = useLocation();

  const [mainImg, setMainImg] = useState(
    process.env.REACT_APP_BACKEND_URL +
      product?.product.image.data[0].attributes.url.substring(1)
  );
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleImg = (e) => {
    setMainImg(e.target.src);
  };

  return (
    <div className="flex w-full mx-auto p-4 pt-8 md:p-8">
      <div className="flex flex-col space-y-8 w-full mx-auto max-w-[1400px]">
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
        >
          <Link to="/">Home</Link>
          <Link
            to={`/products/${product.product.categories.data[0].attributes.title}`}
          >
            {product.product.categories.data[0].attributes.title}
          </Link>
          <Link
            to={`/product/${product.product.title}`}
            state={{ product: product.product, product_id: product.product_id }}
          >
            {product.product.title}
          </Link>
        </Breadcrumbs>
        <div className=" flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center mt-8 lg:mt-12 lg:space-x-8 xl:space-x-14">
          {/*image div*/}
          <div className="flex flex-col space-y-4 md:items-start justify-center items-center w-full max-w-[520px] lg:max-w-[440px]">
            <div className="relative w-full aspect-square border-primary border rounded-lg overflow-hidden">
              <img
                src={mainImg}
                alt=""
                className="object-cover object-center w-full h-full"
              />
              <div className="flex flex-row space-x-2 justify-end items-center absolute top-4 right-4 hover:text-black  duration-150 ease-in cursor-pointer">
                <FiHeart className="" />
                <p className="text-sm uppercase">Add to Wishlist</p>
              </div>
            </div>
            <div className="flex w-full mx-auto space-x-2 overflow-x-auto lg:scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-gray-600 scrollbar-track-rounded-full pb-4">
              {product?.product.image.data.map((item, index) => (
                <div
                  className="w-[100px] h-[100px] aspect-square border-primary border rounded-lg cursor-pointer"
                  key={index}
                >
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_URL +
                      item.attributes.url.substring(1)
                    }
                    alt=""
                    className="object-cover object-center w-full h-full rounded-lg"
                    onClick={handleImg}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-12 lg:mt-0 max-w-[520px] lg:max-w-none">
            <p className="uppercase font-bold text-xs">
              {product.product.manufacturer}
            </p>
            <h2 className="text-xl text-secondary-content font-bold">
              {product.product.title}
            </h2>
            {product.product.quantity === 0 ? (
              <p className="line-through text-xs lg:text-sm">Out Of Stock</p>
            ) : (
              <p className="text-green-500 text-xs lg:text-sm">In Stock</p>
            )}

            <div className="w-full h-1 rounded-full bg-base-100"></div>
            <p className="text-xl text-primary font-semibold tracking-wide">
              {product.product.price}
              {"$"}
            </p>
            <p className="text-secondary-content">
              {product.product.shortDescription}
            </p>
            <div className="pt-8 pb-8 flex flex-row justify-start space-x-4 items-center">
              <div className="flex h-full flex-row justify-between p-2 border rounded-lg border-primary items-center w-[90px] text-secondary-content pl-4 pr-4">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                {product.product.quantity === 0 ? 0 : quantity}
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev == product.product.quantity ? prev : prev + 1
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className={
                  product.product.quantity === 0
                    ? "btn btn-disabled btn-primary w-full max-w-[250px]"
                    : "btn btn-primary w-full max-w-[250px]"
                }
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product?.product_id,
                      name: product?.product.title,
                      img: product?.product.image.data[0].attributes.url.substring(
                        1
                      ),
                      price: product?.product.price,
                      quantity,
                    })
                  )
                }
              >
                Add to Cart
              </button>
            </div>
            <div className="w-full h-1 rounded-full bg-base-100"></div>
            <div className="flex flex-row space-x-4 items-center pt-4">
              <CiLock className="w-10 h-10 text-secondary-content text-sm" />
              <div className="flex flex-col space-y-2">
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
                <p className="text-xs">All deliveries take 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* extra infos and related products */}
        <div className="w-full mx-auto p-4 md:p-8 border-2 border-primary rounded-lg flex flex-col space-y-4 pt-8">
          <h3 className="text-secondary-content text-lg text-semibold tracking-wide uppercase">
            Technical Characteristics
          </h3>
          <div className="w-full h-[2px] rounded-full bg-secondary-content/[0.5]"></div>
          <ReactMakrdown className="">
            {product.product.longDescription}
          </ReactMakrdown>
          <p className="link">Cick here for the whole product info</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
