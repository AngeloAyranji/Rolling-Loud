import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate, Link, useParams } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    checkLogIn();
  }, []);

  const checkLogIn = () => {
    if (!sessionStorage.getItem("jwt")) {
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
            <Link to={`/orders/${userId}`}>Orders</Link>
            <Link to={`/orders/${userId}`}>{userId}</Link>
          </Breadcrumbs>
          <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
            Your orders
          </h2>
          <p className="max-w-[700px]">3 total orders</p>
          <div className="h-[2px] w-full bg-primary"></div>

          <div className="w-full flex flex-col space-y-4 items-start h-full pb-8 border-b-[2px] border-base-100">
            <div className="flex w-full justify-between">
              <h2 className="text-secondary-content font-semibold tracking-wide uppercase lg:text-lg">
                order id: 4149043135
              </h2>
              <p className="text-secondary-content font-semibold tracking-wide uppercase lg:text-lg">
                170.00 $
              </p>
            </div>
            <div className="flex w-full justify-between">
              <p>February 12, 2023</p>
              <a href="" className="link">
                <p> Order Details</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
