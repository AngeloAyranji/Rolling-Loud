import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";

function Order() {
  const navigate = useNavigate();
  const { decodedToken } = useJwt(sessionStorage.getItem("jwt"));
  const products = useSelector((state) => state.cart.products);

  const [promoCode, setPromoCode] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.price * item.quantity));
    if (promoCode) total = total * (1 - promoCode[0].attributes.discount / 100);
    total = total.toFixed(2);
    return total;
  };

  const handleCheckout = async () => {
    if (sessionStorage.getItem("jwt")) {
      setLoadingCheckout(true);
      const productList = products.map((prd) => {
        return {
          id: prd.id,
          quantity: prd.quantity,
        };
      });
      const payload = {
        items: productList,
        promoCode: promoCode ? promoCode[0].attributes.code : null,
        userId: decodedToken?.id,
      };

      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
      };

      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "api/checkout",
        payload,
        config
      );
      console.log(res);
      setLoadingCheckout(false);
      navigate(`/orders`);
    } else {
      navigate("/login");
    }
  };

  return (
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
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.img}
                        alt={"product image"}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-sm lg:text-base font-medium text-white">
                          <a href={product.href}>{product.name}</a>
                          <p className="ml-4 text-base lg:text-xl">
                            {product.price * product.quantity} $
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="">Qty : {product.quantity}</p>
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
                        Make sure to add products to your cart before checking
                        out. You'll find lots to explore on the home page.{" "}
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
                <p className="text-xl font-semibold">{totalPrice()} $</p>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <p>Discount</p>
                <p>0.00 $</p>
              </div>

              <div className="flex flex-row justify-between items-center w-full">
                <p>Delivery</p>
                <p>0.00 $</p>
              </div>

              <div className="flex flex-row justify-between items-center w-full border-b-[1px] border-gray-600 border-dashed pb-4 mb-4">
                <p>Tax</p>
                <p>0.00 $</p>
              </div>

              <div className="flex flex-row w-full justify-between items-center text-secondary-content">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">{totalPrice()} $</p>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              className={
                products.length
                  ? "w-full btn btn-primary uppercase text-xl max-w-[500px]"
                  : "w-full btn btn-disabled uppercase text-xl max-w-[500px]"
              }
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
