import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { CiDeliveryTruck, CiLock } from "react-icons/ci";
import { Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Select, Option } from "@material-tailwind/react";
import remarkGfm from "remark-gfm";
import { addToCart } from "../redux/cartReducer";
import useFetch from "../hooks/useFetch";
import { useRegionChecker } from "../hooks/regionChecker";
import Loading from "../components/Loading";
import { parseLink } from "../utils/utils";
import { MdAddShoppingCart } from "react-icons/md";
import Rating from "../components/Rating";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Helmet } from "react-helmet";

function Product() {
  const dispatch = useDispatch();

  const { region, currency } = useRegionChecker();

  const products = useSelector((state) => state.cart.products);

  const { productName } = useParams();

  const { data: product, loading } = useFetch(
    `api/products/?populate[image]=*&populate[brand]=*&populate[categories]=*&populate[subcategories]=*&populate[options]=*&filters[region][$eq]=${region}&filters[title][$eq]=${productName}`
  );

  const { data: reviews } = useFetch(`api/reviews?populate[product]=*&filters[product][title][$eq]=${productName}`)
    console.log(reviews)
  const [mainImg, setMainImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allowedQuantity, setAllowedQuantity] = useState(0);
  const [markdown, setMarkdown] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedProduct({
        price: product[0]?.attributes.options[0].price,
        quantity: product[0]?.attributes.options[0].quantity,
        option: product[0]?.attributes.options[0].title,
        id: product[0]?.attributes.options[0].id
      });
      setMarkdown(product[0]?.attributes.longDescription);
      setMainImg(product[0]?.attributes.image.data[0].attributes.url);
    }
  }, [product]);

  const calculateAllowedQuantity = () => {
    if (product) {
      const item = products.find(
        (x) => x.id === product[0]?.id && x.option === selectedProduct?.option
      );
      if (!item) {
        setAllowedQuantity(selectedProduct?.quantity);
      } else {
        setAllowedQuantity(selectedProduct?.quantity - item.quantity);
      }
    }
  };

  const handePriceChange = (value) => {
    setQuantity(1);
    setSelectedProduct({
      price: value[0],
      quantity: value[1],
      option: value[2],
      id: value[3],
    });
  };

  useEffect(() => {
    calculateAllowedQuantity();
  }, [selectedProduct, products]);

  const Add = () => {
    setQuantity(1);
    calculateAllowedQuantity();
    if (product[0]?.attributes.type === "promotion") {
      dispatch(
        addToCart({
          id: product[0].id,
          name: product[0].attributes.title,
          img: product[0].attributes.image.data[0].attributes.url,
          price:
            selectedProduct?.price -
            (selectedProduct?.price *
              product[0].attributes.discountPercentage) /
              100,
          option: selectedProduct?.option,
          optionId: selectedProduct?.id,
          optionName: product[0].attributes.option_name,
          quantity,
        })
      );
    } else {
      dispatch(
        addToCart({
          id: product[0].id,
          name: product[0].attributes.title,
          img: product[0].attributes.image.data[0].attributes.url,
          price: selectedProduct?.price,
          option: selectedProduct?.option,
          optionId: selectedProduct?.id,
          optionName: product[0].attributes.option_name,
          quantity,
        })
      );
    }
  };
  return (
    <>
      <Helmet>
        <title>{productName}</title>
      </Helmet>
      {!loading && product ? (
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
                className="text-secondary-content hover:text-primary duration-150 ease-in"
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
                  className="text-secondary-content hover:text-primary duration-150 ease-in"
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
              <Link
                to={`/product/${parseLink(product[0]?.attributes.title)}`}
                className="text-secondary-content hover:text-primary duration-150 ease-in"
              >
                {product[0]?.attributes.title.charAt(0).toUpperCase() +
                  product[0]?.attributes.title.slice(1)}
              </Link>
            </Breadcrumbs>
            <div className=" flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center mt-8 lg:mt-12 lg:space-x-8 xl:space-x-14">
              {/*image div*/}
              <div className="flex flex-col space-y-4 md:items-start justify-center items-center w-full max-w-[520px] lg:max-w-[440px]">
                <div className="relative w-full aspect-square border-primary border rounded-lg overflow-hidden bg-secondary-content">
                  <img
                    src={mainImg}
                    alt={product[0]?.attributes.title}
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
                      className="w-[100px] h-[100px] aspect-square border-primary border rounded-lg cursor-pointer bg-secondary-content"
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
                {product[0]?.attributes.brand.data !== null && (
                  <p className="uppercase font-bold text-xs">
                    {product[0]?.attributes.brand.data.attributes.name}
                  </p>
                )}
                <h2 className="text-xl text-secondary-content font-bold">
                  {product[0]?.attributes.title}
                </h2>
                {product[0]?.attributes.type !== "preorder" && (
                  <>
                    {selectedProduct?.quantity === 0 ? (
                      <p className="line-through text-xs lg:text-sm">
                        Out Of Stock
                      </p>
                    ) : (
                      <p className="text-green-500 text-xs lg:text-sm">
                        In Stock
                      </p>
                    )}
                  </>
                )}

                <div className="divider"></div>
                {product[0]?.attributes.type === "promotion" ? (
                  <div className="flex flex-row space-x-4">
                    <p className="text-xl text-neutral line-through font-semibold tracking-wide">
                      {selectedProduct?.price}
                      {currency}
                    </p>
                    <p className="text-xl text-primary font-semibold tracking-wide">
                      {selectedProduct?.price -
                        (selectedProduct?.price *
                          product[0].attributes.discountPercentage) /
                          100}
                      {currency}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl text-primary font-semibold tracking-wide">
                    {selectedProduct?.price}
                    {currency}
                  </p>
                )}

                <p className="text-secondary-content">
                  {product[0]?.attributes.shortDescription}
                </p>

                {product[0]?.attributes.options.length === 1 &&
                product[0]?.attributes.options[0].title === "Default" ? (
                  <></>
                ) : (
                  <div className="w-full mb-4">
                    <Select
                      variant="standard"
                      label={product[0]?.attributes.option_name}
                      color="cyan"
                      className="text-secondary-content"
                      onChange={handePriceChange}
                    >
                      {product[0]?.attributes.options.map((sub, index) => (
                        <Option
                          value={[sub.price, sub.quantity, sub.title, sub.id]}
                          key={index}
                        >
                          {sub.title}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
                <div className="pt-4 pb-4 flex flex-row justify-start space-x-4 items-center">
                  <div className="flex text-xl h-full flex-row justify-between p-2 border rounded-lg border-primary items-center w-[100px] text-secondary-content px-3">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                      }
                    >
                      <AiOutlineMinus />
                    </button>
                    {allowedQuantity === 0 ? 0 : quantity}
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          prev >= allowedQuantity ? allowedQuantity : prev + 1
                        )
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <button
                    className={
                      allowedQuantity === 0
                        ? "btn btn-disabled btn-primary w-full max-w-[250px] flex items-center justify-center space-x-4"
                        : "btn btn-primary w-full max-w-[250px] flex items-center justify-center space-x-4"
                    }
                    onClick={() => Add(quantity)}
                  >
                    <p> Add to Cart</p>
                    <MdAddShoppingCart className="w-5 h-5 font-extralight" />
                  </button>
                </div>
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
              </div>
            </div>

            {/* Ratings */}
            <div className="w-full mx-auto flex flex-col space-y-4 pt-8">
              <h3 className="text-secondary-content text-xl font-semibold tracking-wide uppercase">
                Reviews
              </h3>
              <div className="w-full h-[2px] rounded-full bg-secondary-content/[0.5]"></div>
              {reviews?.map((review) => (
                <Rating review={review.attributes} />
              ))}
            </div>

            {/* extra infos and related products */}
            <div className="w-full mx-auto p-4 md:p-8 border-2 border-primary rounded-lg flex flex-col space-y-4 pt-8">
              <h3 className="text-secondary-content text-lg font-semibold tracking-wide uppercase">
                Technical Characteristics
              </h3>
              <div className="w-full h-[2px] rounded-full bg-secondary-content/[0.5]"></div>
              <ReactMarkdown
                className="prose text-secondary-content lg:text-lg tracking-wide min-w-full"
                remarkPlugins={[remarkGfm]}
              >
                {markdown}
              </ReactMarkdown>
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
