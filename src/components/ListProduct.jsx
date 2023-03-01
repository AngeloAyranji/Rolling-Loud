import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function ListProduct() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "api/products/?populate=*");

    console.log(res.data.data)
    setProducts(res.data.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className="w-full flex flex-wrap gap-4 p-4 justify-center">
      {products.map((item) => (
        <Card item={item.attributes} key={item.id} />
      ))}
    </div>
  );
}

export default ListProduct;
