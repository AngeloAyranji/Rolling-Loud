import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useRegionChecker } from "../hooks/regionChecker";
import Loading from "../components/Loading";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { Input, Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { addPromo, removePromo } from "../redux/promoCodeReducer";
import { updateQuantity, removeItem } from "../redux/cartReducer";
import useFetch from "../hooks/useFetch";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const { currency, country } = useRegionChecker();

  const { decodedToken } = useJwt(localStorage.getItem("jwt"));

  const products = useSelector((state) => state.cart.products);
  const promoCode = useSelector((state) => state.promo.promoCode);

  const [showToast, setShowToast] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const onChange = ({ target }) => setPromoInput(target.value);

  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [productsURL, setProductsURL] = useState("");
  const [productsDB, setProductsDB] = useState(null);

  const { data: prod } = useFetch(productsURL !== "" ? productsURL : null);
  const { data: shipping } = useFetch(
    `api/shippings/?filters[code][$eq]=${country}`
  );

  useEffect(() => {
    fetchProductsDB();
  }, [products]);

  useEffect(() => {
    if (prod !== undefined && prod !== null) setProductsDB(prod);
  }, [prod]);


  const fetchProductsDB = () => {
    let url = `api/products?populate[options]=*`;

    products.forEach((product, index) => {
      url += `&filters[$or][${index}][id][$eq]=${product.id}`;
    });

    setProductsURL(url);
  };

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.price * item.quantity));
    return total;
  };

  const discountedPrice = () => {
    if (promoCode !== null) {
      if (promoCode[0].attributes?.isFixed_Amount) {
        return promoCode[0].attributes?.discount;
      } else {
        return (
          totalPrice() *
          (1 - (1 - promoCode[0].attributes?.discount / 100))
        ).toFixed(2);
      }
    }

    return 0;
  };

  const deliveryPrice = () => {
    if (shipping) {
      if (
        shipping[0]?.attributes.free_shipping_threshold !== null &&
        totalPrice() - discountedPrice() >
          shipping[0]?.attributes.free_shipping_threshold
      )
        return 0;
      else return shipping[0]?.attributes.shipping_price;
    } else {
      return 0;
    }
  };

  const handleCheckout = async () => {
    if (localStorage.getItem("jwt")) {
      setLoadingCheckout(true);

      const productList = products.map((prd) => {
        return {
          id: prd.id,
          quantity: prd.quantity,
          optionId: prd.optionId,
        };
      });

      const payload = {
        items: productList,
        promoCode: promoCode !== null ? promoCode[0].attributes?.code : null,
        userId: decodedToken?.id,
        country: country,
      };

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      };

      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "api/stripePayment",
          payload,
          config
        );

        window.location.replace(res.data.session.url);
        
      } catch (err) {
        if (err.response.data.error === "Promo Code Expired") {
          dispatch(removePromo());
        } else if (err.response.data.optionId && err.response.data.itemId) {
          if (err.response.data.quantity <= 0) {
            dispatch(
              removeItem({
                id: err.response.data.itemId,
                optionId: err.response.data.optionId,
              })
            );
          } else {
            dispatch(
              updateQuantity({
                optionId: err.response.data.optionId,
                quantity: err.response.data.quantity,
              })
            );
            fetchProductsDB();
          }
        }
      }
      setLoadingCheckout(false);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const checkAvailability = (item, type) => {
    const itemDB = productsDB.find((product) => product.id === item.id);
    const optionDB = itemDB.attributes.options.find(
      (option) => option.id === item.optionId
    );

    if (type === "increment" && optionDB.quantity - item.quantity > 0) {
      dispatch(
        updateQuantity({
          optionId: item.optionId,
          quantity: item.quantity + 1,
        })
      );
    } else if (type === "decrement" && item.quantity > 1) {
      dispatch(
        updateQuantity({
          optionId: item.optionId,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handlePromoCode = async () => {
    if (promoCode === null) {
      try {
        const code = document.getElementById("promocode").value;
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `api/promotions/?filters[code][$eq]=${code}`
        );
        if (res.data.data.length) {
          dispatch(addPromo(res.data.data));
        }
      } catch (err) {
        handleToast();
        console.log(err);
        dispatch(removePromo());
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      {!loadingCheckout ? (
        <Fragment>
          {/* Toast here */}
          <div
            className={
              showToast ? "fixed right-4 bottom-4 z-[10000]" : "hidden"
            }
          >
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center space-x-2"
              role="alert"
            >
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">Invalid Promo Code</span>
              <span className="">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => {
                    setShowToast(false);
                  }}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full mx-auto flex justify-center items-center">
            <div className="max-w-[1400px] w-full">
              <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
                <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb"
                  className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
                >
                  <Link to="/">Home</Link>
                  <Link to={`/checkout`}>Checkout</Link>
                </Breadcrumbs>
                <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
                  Checkout
                </h2>
                <div className="h-[2px] w-full bg-primary"></div>

                <div className="mt-8 w-full border-b-[2px] pb-8 border-b-base-100">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {products.map((product, index) => (
                        <li key={index} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-sm lg:text-base font-medium text-white">
                                <Link
                                  to={`/product/${encodeURIComponent(
                                    product.name
                                  )}`}
                                  className="line-clamp-3 text-white mb-2"
                                >
                                  {product.name}
                                </Link>
                                <p className="ml-4 text-base lg:text-xl min-w-[50px]">
                                  {product.price * product.quantity} {currency}
                                </p>
                              </div>
                              {product.option !== "Default" && (
                                <p className="text-sm">{product.option}</p>
                              )}
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center">
                                <p className="">Qty : </p>
                                <div
                                  role="button"
                                  className="hover:text-primary duration-100 ease-in mx-2"
                                  onClick={() =>
                                    checkAvailability(product, "decrement")
                                  }
                                >
                                  <AiOutlineMinus className="" />
                                </div>
                                <p>{product.quantity}</p>
                                <div
                                  role="button"
                                  className="hover:text-primary duration-100 ease-in mx-2"
                                  onClick={() =>
                                    checkAvailability(product, "increment")
                                  }
                                >
                                  <AiOutlinePlus className="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      {products.length === 0 && (
                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                          <div className="mx-auto max-w-screen-sm text-center">
                            <h1 className="mb-4 text-3xl tracking-tight font-extrabold lg:text-5xl text-secondary-content">
                              Your Cart is Empty
                            </h1>
                            {/* <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                          Something's missing.
                        </p> */}
                            <p className="mb-4 text-lg font-light">
                              Make sure to add products to your cart before
                              checking out. You'll find lots to explore on the
                              home page.{" "}
                            </p>
                            <Link
                              to="/"
                              className="inline-flex text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 duration-150 ease-in"
                            >
                              Back to Homepage
                            </Link>
                          </div>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="w-full mt-8 flex flex-col lg:flex-row items-start justify-center pb-8 border-b-[2px] border-base-100">
                  <div className="w-full lg:w-[50%] mb-12 lg:mb-0">
                    <p className="text-secondary-content font-medium text-lg mb-2">
                      Need Help?
                    </p>
                    <a href="">
                      <p className="link">Order Issues</p>
                    </a>
                    <a href="">
                      <p className="link">Delivery Issues</p>
                    </a>
                    <a href="">
                      <p className="link">Return Policy</p>
                    </a>
                  </div>
                  <div className="w-full lg:w-[50%] flex flex-col items-start">
                    <p className="text-secondary-content font-medium text-lg mb-2">
                      Order Summary
                    </p>
                    <div className="flex flex-row w-full justify-between items-center mb-2">
                      <p className="text-xl font-semibold">Subtotal</p>
                      <p className="text-xl font-semibold">
                        {totalPrice()} {currency}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                      <p>Discount</p>
                      <p>
                        {discountedPrice()} {currency}
                      </p>
                    </div>

                    <div className="flex flex-row justify-between items-center w-full mb-2">
                      <p>Delivery</p>
                      <p>
                        {deliveryPrice()} {currency}
                      </p>
                    </div>
                    {shipping && (
                      <div className="flex flex-row justify-between items-center w-full border-b-[1px] border-gray-600 border-dashed pb-4 mb-4 text-secondary-content font-semibold">
                        <p>
                          Free delivery for orders over{" "}
                          {shipping[0]?.attributes.free_shipping_threshold}{" "}
                          {currency}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-row w-full justify-between items-center text-secondary-content">
                      <p className="text-xl font-semibold">Total</p>
                      <p className="text-xl font-semibold">
                        {totalPrice() - discountedPrice() < 0
                          ? 0
                          : (
                              totalPrice() -
                              discountedPrice() +
                              deliveryPrice()
                            ).toFixed(2)}{" "}
                        {currency}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full items-center lg:items-start justify-center lg:flex-row lg:justify-between lg:space-x-8 pt-4">
                  <div className="flex flex-col space-y-2 w-full max-w-[400px]">
                    <div className="relative flex w-full ">
                      <Input
                        id="promocode"
                        label="Promo Code"
                        value={promoInput}
                        color="cyan"
                        onChange={onChange}
                        className="pr-20 text-secondary-content "
                        containerProps={{
                          className:
                            "min-w-0 appearance-none focus:outline-none focus:border h-12",
                        }}
                      />
                      <Button
                        size="sm"
                        color="cyan"
                        disabled={!promoInput || promoCode !== null}
                        className="!absolute right-1 top-1 rounded h-10"
                        onClick={handlePromoCode}
                      >
                        Add
                      </Button>
                    </div>
                    {promoCode != null ? (
                      <div className="flex w-full justify-between pr-1 items-center">
                        <p className="text-sm mt-2">
                          {promoCode[0].attributes.code} Added!
                        </p>
                        <div className="flex flex-1 justify-end">
                          <button
                            onClick={() => dispatch(removePromo())}
                            type="button"
                            className="font-light text-sm text-secondary hover:text-secondary-focus"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className=" max-w-[400px] w-full mt-4 lg:mt-0">
                    <button
                      className={
                        products.length
                          ? "w-full btn btn-primary uppercase text-xl "
                          : "w-full btn btn-disabled uppercase text-xl "
                      }
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Order;
