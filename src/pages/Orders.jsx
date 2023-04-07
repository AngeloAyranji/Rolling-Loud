import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

function Orders() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { data: orders, loading } = useFetch(
    `api/orders/?populate[products]=*&populate[promotion]=*&pagination[withCount]=true&filters[user][username][$eq]=${userId}`,
    true
  );
  console.log(orders)
  useEffect(() => {
    checkLogIn();
  }, []);

  const checkLogIn = () => {
    if (!sessionStorage.getItem("jwt")) {
      navigate("/login");
    }
  };

  const convertDate = (date) => {
    const tmpDate = new Date(date);
    const month = tmpDate.toLocaleString("default", { month: "long" });
    const day = tmpDate.getDate();
    const year = tmpDate.getFullYear();

    return `${month} ${day}, ${year}`;
  };



  const getPrice = (order) => {
    let totalPrice = 0;
    order.attributes.products.data.forEach(product => {
      const price = product.attributes.price;
      const quantity = order.attributes.quantities.find(qt => qt.id === product.id).quantity
      totalPrice += price * quantity;
    })

    if(order.attributes.promotion.data.attributes) totalPrice = totalPrice * (1 - order.attributes.promotion.data.attributes.discount / 100)
    return totalPrice
  }

  return (
    <>
      {!loading && orders ? (
        <div className="w-full mx-auto flex justify-center items-center">
          <div className="max-w-[1400px] w-full">
            <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
              >
                <Link to="/">Home</Link>
                <Link to={`/orders/${userId}`}>Orders</Link>
                <Link to={`/orders/${userId}`}>{userId}</Link>
              </Breadcrumbs>
              <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
                Your orders
              </h2>
              <p className="max-w-[700px]">3 total orders</p>
              <div className="h-[2px] w-full bg-primary"></div>

              {orders?.map((order, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col space-y-4 items-start h-full pb-8 border-b-[2px] border-base-100"
                >
                  <div className="flex w-full justify-between">
                    <h2 className="text-secondary-content font-semibold tracking-wide uppercase lg:text-lg">
                      order id: {order.attributes.stripe_id}
                    </h2>
                    <p className="text-secondary-content font-semibold tracking-wide uppercase lg:text-lg">
                      {getPrice(order)}$
                    </p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>{convertDate(order.attributes.date)}</p>
                    <Link
                      to={`/orders/${userId}/${order.attributes.stripe_id}`}
                      className="link"
                    >
                      <p> Order Details</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Orders;
