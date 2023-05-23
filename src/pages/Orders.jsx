import { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation, Link } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useRegionChecker } from "../hooks/regionChecker";
import Loading from "../components/Loading";
import { removeAll } from "../redux/cartReducer";
import { Helmet } from "react-helmet";

function Orders() {
  const dispatch = useDispatch();

  const { currency } = useRegionChecker();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");

  const { decodedToken } = useJwt(localStorage.getItem("jwt"));

  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);

  const {
    data: ordersDB,
    metadata,
    loading,
  } = useFetch(
    decodedToken
      ? `api/orders/?populate[products]=*&populate[promotion]=*&sort[0]=date:desc&pagination[page]=${page}&pagination[pageSize]=10&filters[user][id][$eq]=${decodedToken?.id}`
      : "",
    true
  );

  useEffect(() => {
    handleAddMore();
  }, [ordersDB]);

  useEffect(() => {
    if (success === "true") {
      dispatch(removeAll());
    }
  }, [success]);

  const handleAddMore = () => {
    let tmpOrders = orders.slice();
    ordersDB?.map((order) => {
      if (orders.findIndex((x) => x.id === order.id) === -1)
        tmpOrders.push(order);
    });

    if (ordersDB) setOrders(tmpOrders);
  };

  const convertDate = (date) => {
    const tmpDate = new Date(date);
    const month = tmpDate.toLocaleString("default", { month: "long" });
    const day = tmpDate.getDate();
    const year = tmpDate.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <Helmet>
        <title>Orders - {localStorage.getItem("username")}</title>
      </Helmet>
      {ordersDB ? (
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
                <Link to={`/orders`}>{localStorage.getItem("username")}</Link>
              </Breadcrumbs>
              <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
                Your orders
              </h2>
              <p className="max-w-[700px]">
                {metadata?.pagination.total} total orders
              </p>
              <div className="h-[2px] w-full bg-primary"></div>

              {orders?.map((order, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col space-y-4 items-start h-full pb-8 border-b-[2px] border-base-100"
                >
                  <div className="flex w-full justify-between">
                    <h2 className="text-secondary-content font-semibold tracking-wide uppercase lg:text-lg">
                      order id: {order?.attributes.stripe_id}
                    </h2>
                    <p className="text-secondary-content font-semibold tracking-wide uppercase lg:text-lg">
                      {order.attributes.amount_total} {currency}
                    </p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>{convertDate(order?.attributes.date)}</p>
                    <Link
                      to={`/orders/${encodeURIComponent(order?.attributes.stripe_id)}`}
                      className="link"
                    >
                      <p> Order Details</p>
                    </Link>
                  </div>
                </div>
              ))}
              {page < metadata?.pagination.pageCount && (
                <p onClick={() => setPage(page + 1)}>Add More</p>
              )}
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
