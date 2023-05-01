import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { CiDeliveryTruck, CiLock } from "react-icons/ci";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactMakrdown from "react-markdown";
import { addToCart } from "../redux/cartReducer";
import useFetch from "../hooks/useFetch";
import { useRegionChecker } from "../hooks/regionChecker";
import Loading from "../components/Loading";
import { parseLink } from "../utils/utils";
import { Select, Option } from "@material-tailwind/react";

function Product() {
  const dispatch = useDispatch();

  const { region } = useRegionChecker();

  const products = useSelector((state) => state.cart.products);

  const { productName } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetch(
    `api/products/?populate[image]=*&populate[brand]=*&populate[categories]=*&populate[subcategories]=*&populate[options][populate]=*&filters[region][$eq]=${region}&filters[title][$eq]=${productName}`
  );
  console.log(product);
  const [mainImg, setMainImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [price, setPrice] = useState(0);
  const [optionsMap, setOptionsMap] = useState(new Map());
  const [canCheckout, setCanCheckout] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImg(product[0]?.attributes.image.data[0].attributes.url);
      setPrice(product[0]?.attributes.price);
      // if (product[0].attributes.options.length === 0) {
      //   setCanCheckout(true);
      // }
    }
  }, [product]);

  const handePriceChange = (value) => {
    setOptionsMap(new Map(optionsMap.set(value[0], value[1])));
    let sum = 0;
    optionsMap.forEach(function (value, key) {
      sum += value;
    });
    console.log("sum: ", sum, product[0]?.attributes.price);
    setPrice(product[0]?.attributes.price + sum);
    if (product[0].attributes.options.length === optionsMap.size) {
      setCanCheckout(true);
    }
  };

  const checkAvailability = (quantityValue) => {
    if (product) {
      const prod = products.find((x) => x.id === product[0].id);
      if (!prod && product[0].attributes.quantity > 0) {
        dispatch(
          addToCart({
            id: product[0].id,
            name: product[0].attributes.title,
            img: product[0].attributes.image.data[0].attributes.url,
            price: price,
            options: optionsMap,
            quantity,
          })
        );
      } else {
        if (prod) {
          if (quantityValue + prod.quantity <= product[0].attributes.quantity) {
            dispatch(
              addToCart({
                id: product[0].id,
                name: product[0].attributes.title,
                img: product[0].attributes.image.data[0].attributes.url,
                price: price,
                options: optionsMap,
                quantity,
              })
            );
          }
        }
      }
    }
  };
  return (
    <>
      {!loading && product ? (
        <div className="flex w-full mx-auto p-4 pt-8 md:p-8">
          <div className="flex flex-col space-y-8 w-full mx-auto max-w-[1400px]">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
            >
              <Link to="/">Home</Link>
              <Link
                to={`/products/${parseLink(
                  product[0]?.attributes.categories.data[0].attributes.title
                )}`}
              >
                {product[0]?.attributes.categories.data[0].attributes.title
                  .charAt(0)
                  .toUpperCase() +
                  product[0]?.attributes.categories.data[0].attributes.title.slice(
                    1
                  )}
              </Link>
              {product[0]?.attributes.subcategories.data.length > 0 && (
                <Link
                  to={`/products/${parseLink(
                    product[0]?.attributes.categories.data[0].attributes.title
                  )}/${parseLink(
                    product[0]?.attributes.subcategories.data[0].attributes
                      .title
                  )}`}
                >
                  {
                    product[0]?.attributes.subcategories.data[0].attributes
                      .title
                  }
                </Link>
              )}
              <Link to={`/product/${parseLink(product[0]?.attributes.title)}`}>
                {product[0]?.attributes.title.charAt(0).toUpperCase() +
                  product[0]?.attributes.title.slice(1)}
              </Link>
            </Breadcrumbs>
            <div className=" flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center mt-8 lg:mt-12 lg:space-x-8 xl:space-x-14">
              {/*image div*/}
              <div className="flex flex-col space-y-4 md:items-start justify-center items-center w-full max-w-[520px] lg:max-w-[440px]">
                <div className="relative w-full aspect-square border-primary border rounded-lg overflow-hidden">
                  <img
                    src={mainImg}
                    alt="Product Image"
                    className="object-cover object-center w-full h-full"
                  />
                  <div className="flex flex-row space-x-2 justify-end items-center absolute top-4 right-4 hover:text-black  duration-150 ease-in cursor-pointer">
                    <FiHeart className="" />
                    <p className="text-sm uppercase">Add to Wishlist</p>
                  </div>
                </div>
                <div className="flex w-full mx-auto space-x-2 overflow-x-auto lg:scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-gray-600 scrollbar-track-rounded-full pb-4">
                  {product[0]?.attributes.image.data.map((item, index) => (
                    <div
                      className="w-[100px] h-[100px] aspect-square border-primary border rounded-lg cursor-pointer"
                      key={index}
                    >
                      <img
                        src={item.attributes.url}
                        alt=""
                        className="object-cover object-center w-full h-full rounded-lg"
                        onClick={(e) => setMainImg(e.target.src)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-4 mt-12 lg:mt-0 max-w-[520px] lg:max-w-none">
                <p className="uppercase font-bold text-xs">
                  {product[0]?.attributes.brand.data.attributes.name}
                </p>
                <h2 className="text-xl text-secondary-content font-bold">
                  {product[0]?.attributes.title}
                </h2>
                {product[0]?.attributes.quantity === 0 ? (
                  <p className="line-through text-xs lg:text-sm">
                    Out Of Stock
                  </p>
                ) : (
                  <p className="text-green-500 text-xs lg:text-sm">In Stock</p>
                )}

                <div className="w-full h-1 rounded-full bg-base-100"></div>
                <p className="text-xl text-primary font-semibold tracking-wide">
                  {price}
                  {"$"}
                </p>

                <p className="text-secondary-content">
                  {product[0]?.attributes.shortDescription}
                </p>

                {/* {product[0].attributes.options.length &&
                  product[0].attributes.options?.map((item, index) => (
                    <div key={index} className="max-w-[300px] mb-4">
                      <Select
                        variant="standard"
                        label={item.option}
                        color="cyan"
                        className="text-secondary-content mb-4"
                        onChange={handePriceChange}
                      >
                        {item.suboption.map((sub) => (
                          <Option
                            value={[item.option, sub.price]}
                            key={sub.suboption}
                          >
                            {sub.suboption}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  ))} */}
                <div className="pt-8 pb-8 flex flex-row justify-start space-x-4 items-center">
                  <div className="flex h-full flex-row justify-between p-2 border rounded-lg border-primary items-center w-[90px] text-secondary-content pl-4 pr-4">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                      }
                    >
                      -
                    </button>
                    {product[0]?.attributes.quantity === 0 ? 0 : quantity}
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          prev == product[0]?.attributes.quantity
                            ? prev
                            : prev + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={
                      (product[0].attributes.quantity === 0 && !isAvailable) ||
                      canCheckout === false
                        ? "btn btn-disabled btn-primary w-full max-w-[250px]"
                        : "btn btn-primary w-full max-w-[250px]"
                    }
                    onClick={() => checkAvailability(quantity)}
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
                    <p className="text-xs">
                      All deliveries take 3-5 business days
                    </p>
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
                {product[0]?.attributes.longDescription}
              </ReactMakrdown>
              <p className="link">Cick here for the whole product info</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Product;
