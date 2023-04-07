import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import useFetch from "../hooks/useFetch";
import Card from "./Card";
import Loading from "./Loading";

function List({ type }) {
  const {
    data: products,
    loading,
    error,
  } = useFetch(
    `api/products?populate[image]=*&populate[brand]=*&populate[categories]=*&filters[type][$eq]=${type}&pagination[pageSize]=4`
  );

  return (
    <div className="gap-4 flex flex-row overflow-x-scroll items-center justify-start scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full pb-8">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {products?.map((item, index) => (
            <Card item={item.attributes} id={item.id} key={index} />
          ))}
        </Fragment>
      )}
    </div>
  );
}

export default List;
