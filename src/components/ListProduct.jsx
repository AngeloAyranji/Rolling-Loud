import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function ListProduct({ products }) {
  console.log(products)
  return (
    <div className="grid grid-cols-2 md:gap-8 xl:gap-14 2xl:gap-8 2xl:grid-cols-3 gap-4 p-4 justify-start">
      {products?.map((item, index) => (
        <Link
          to={`/product/${item.attributes.title}`}
          state={{ product: item.attributes, product_id: item.id }}
          key={index}
        >
          <Card item={item.attributes} id={item.id} />
        </Link>
      ))}
    </div>
  );
}

export default ListProduct;
