import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function ListProduct({ products }) {
  return (
    <div className="w-full flex flex-wrap gap-4 p-4 justify-center">
      {products?.map((item) => (
        <Link to={"/product"} state={{product: item.attributes}}>
          <Card item={item.attributes} key={item.id} />
        </Link>
      ))}
    </div>
  );
}

export default ListProduct;
