import React from "react";
import useFetch from "../hooks/useFetch";
import Card from "./Card";

function List({ type }) {
  const {
    data: products,
    loading,
    error,
  } = useFetch(
    `api/products?populate=*&filters[type][$eq]=${type}&pagination[pageSize]=4`
  );

  return (
    <div className="gap-4 flex flex-row overflow-x-scroll items-center justify-start scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full pb-8">
      {products?.map((item) => (
        <Card item={item.attributes} key={item.id} />
      ))}
    </div>
  );
}

export default List;
