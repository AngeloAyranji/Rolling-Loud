import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";
import { parseLink } from "../utils/utils";
import { useEffect, useState } from "react";

function Order() {
  const { orderId } = useParams();

  const { data: order, loading } = useFetch(
    `api/orders/?populate[products][populate][image]=*&populate[promotion]=*&filters[stripe_id][$eq]=${orderId}`,
    true
  );
  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    if (order) setCurrency(order[0].attributes.currency === "usd" ? "$" : "€");
  }, [order]);

  const convertDate = (date) => {
    const tmpDate = new Date(date);
    const month = tmpDate.toLocaleString("default", { month: "long" });
    const day = tmpDate.getDate();
    const year = tmpDate.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const orderStatus = () => {
    if (order[0]?.attributes.status === "submitted") {
      return (
        <div className="flex justify-center items-center w-full mx-auto max-w-[900px] lg:mt-20 mt-12 ">
          <ul className="steps w-full">
            <li data-content="" className="step step-primary">
              Order Placed
            </li>
            <li data-content="" className="step">
              Order Sent
            </li>
            <li data-content="" className="step">
              Delivered
            </li>
          </ul>
        </div>
      );
    } else if (order[0]?.attributes.status === "sent") {
      return (
        <div className="flex justify-center items-center w-full mx-auto max-w-[900px] lg:mt-20 mt-12 ">
          <ul className="steps w-full">
            <li data-content="" className="step step-primary">
              Order Placed
            </li>
            <li data-content="" className="step step-primary">
              Order Sent
            </li>
            <li data-content="" className="step">
              Delivered
            </li>
          </ul>
        </div>
      );
    } else if (order[0]?.attributes.status === "delivered") {
      return (
        <div className="flex justify-center items-center w-full mx-auto max-w-[900px] lg:mt-20 mt-12 ">
          <ul className="steps w-full">
            <li data-content="" className="step step-primary">
              Order Placed
            </li>
            <li data-content="" className="step step-primary">
              Order Sent
            </li>
            <li data-content="" className="step step-primary">
              Delivered
            </li>
          </ul>
        </div>
      );
    }
  };

  const fetchProduct = (productId) => {
    if (order[0].attributes.products.data.length) {
      const prd = order[0].attributes.products.data.find(
        (product) => product.id === productId
      );
      return prd;
    }
  };

  return (
    <>
      {!loading && order ? (
        <div className="w-full mx-auto flex justify-center items-center">
          <div className="max-w-[1400px] w-full">
            <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
              >
                <Link to="/">Home</Link>
                <Link to={`/orders`}>Orders</Link>
                <Link to={`/orders`}>{sessionStorage.getItem("username")}</Link>
                <Link to={`/orders/${orderId}`}>{orderId}</Link>
              </Breadcrumbs>
              <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
                order id: {orderId}
              </h2>
              <p className="max-w-[700px]">
                Order Date: {convertDate(order[0]?.attributes.date)}
              </p>
              <div className="h-[2px] w-full bg-primary"></div>

              <div className="mt-8 w-full border-b-[2px] pb-8 border-b-base-100">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.length &&
                      order[0]?.attributes.product_data.map(
                        (product, index) => (
                          <li key={index} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={
                                  fetchProduct(product.id).attributes.image
                                    .data[0].attributes.url
                                }
                                alt={fetchProduct(product.id).attributes.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-sm lg:text-base font-medium text-white">
                                  <Link
                                    to={`/product/${parseLink(
                                      fetchProduct(product.id).attributes.title
                                    )}`}
                                    className="line-clamp-3 text-white mb-2"
                                  >
                                    {fetchProduct(product.id).attributes.title}
                                  </Link>
                                  <p className="ml-4 text-base lg:text-xl min-w-[50px]">
                                    {product.price * product.quantity}{" "}
                                    {currency}
                                  </p>
                                </div>
                                {product.option.map((item, index) => (
                                  <p className="text-sm" key={index}>
                                    {item.option} :{" "}
                                    <span>{item.suboption}</span>
                                  </p>
                                ))}
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="">Qty : {product.quantity}</p>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>

              <div className="w-full mt-8 flex flex-col lg:flex-row items-start justify-center pb-8 border-b-[2px] border-base-100">
                <div className="w-full lg:w-[50%] mb-12 lg:mb-0">
                  <p className="text-secondary-content font-medium text-lg mb-2">
                    Payment Method:
                  </p>
                  <p className="">Visa </p>
                </div>
                <div className="w-full lg:w-[50%]">
                  <p className="text-secondary-content font-medium text-lg mb-2">
                    Delivery
                  </p>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-lg tracking-wide">
                    {`${order[0].attributes.shipping_details.address.city}, ${
                      order[0].attributes.shipping_details.address.line1
                    } ${
                      order[0].attributes.shipping_details.address.line2 !==
                      null
                        ? ", " +
                          order[0].attributes.shipping_details.address.line2
                        : ""
                    }`}
                  </p>
                  <p className="text-lg tracking-wide">
                    {`${
                      order[0]?.attributes.shipping_details.address.state.length
                        ? order[0]?.attributes.shipping_details.address.state +
                          ","
                        : ""
                    } ${order[0]?.attributes.shipping_details.address.country}`}
                  </p>
                  <p className="text-lg tracking-wide">
                    postal code:{" "}
                    {order[0].attributes.shipping_details.address.postal_code}
                  </p>
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
                  <a>
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
                      {order[0]?.attributes.amount_total -
                        order[0].attributes.shipping_cost +
                        order[0]?.attributes.discounted_amount}{" "}
                      {currency}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <p>Discount</p>
                    <p>
                      {order[0]?.attributes.discounted_amount} {currency}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full border-b-[1px] border-gray-600 border-dashed pb-4 mb-4">
                    <p>Delivery</p>
                    <p>
                      {order[0]?.attributes.shipping_cost} {currency}
                    </p>
                  </div>

                  <div className="flex flex-row w-full justify-between items-center text-secondary-content">
                    <p className="text-xl font-semibold">Total</p>
                    <p className="text-xl font-semibold">
                      {order[0]?.attributes.amount_total} {currency}
                    </p>
                  </div>
                </div>
              </div>
              {orderStatus()}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Order;
