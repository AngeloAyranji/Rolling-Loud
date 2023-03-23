import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
// import Breadcrumbs from "../components/Breadcrumbs";
import ListProduct from "../components/ListProduct";
import { BsSliders } from "react-icons/bs";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Select, Option } from "@material-tailwind/react";
// import { Select, MenuItem } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { useParams, Link } from "react-router-dom";

function Products() {
  const { category } = useParams();

  const [isSidebar, setIsSidebar] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isInStock, setIsInStock] = useState(false);
  const [isOutStock, setIsOutStock] = useState(false);
  const [price, setPrice] = useState([0, 2000]);
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const { data: categoryDB } = useFetch(`api/categories/?filters[title][$eq]=${category}`)
  
  const {
    data: products,
    loading,
    error,
  } = useFetch(
    `api/products/?populate[image]=*&populate[brand]=*&populate[categories]=*${url}&filters[price][$gte]=${
      price[0]
    }
    &filters[price][$lte]=${price[1]}
    ${category ? `&filters[categories][title][$eq]=${category}` : ``}`
  );

  useEffect(() => {
    console.log(sortBy)
    if(sortBy === 2) products?.sort((a, b) => { return b.attributes.price - a.attributes.price})
    if(sortBy === 1) products?.sort((a, b) => { return a.attributes.price - b.attributes.price})
  }, [sortBy])


  useEffect(() => {
    let filter = "";
    if (isNew) filter += "&filters[type][$eq]=new";
    if (isPromotion) filter += "&filters[type][$eq]=promotion";
    if (isFeatured) filter += "&filters[type][$eq]=featured";
    if (isInStock) filter += "&filters[quantity][$gt]=0";
    setUrl(filter);
  }, [isNew, isFeatured, isPromotion, isInStock, categories]);

  return (
    <div className="w-full md:mb-[200px] mb-20">
      <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
        >
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {category ? (
            <Link to={`/products/${category}`}>{category}</Link>
          ) : (
            <Link to={`/products`}>All Products</Link>
          )}
        </Breadcrumbs>
        <h2 className="text-xl xl:text-3xl font-bold text-white">
          {!category ? "All Products" : category}
        </h2>
        <p className="max-w-[700px]">
          {categoryDB
            ? categoryDB[0]?.attributes.description
            : `ALL PRODUCTS Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
          veritatis placeat id soluta incidunt provident nostrum quibusdam amet
          dolor, excepturi eius, nihil quisquam. Debitis reprehenderit atque,
          suscipit quaerat impedit minima!`}
        </p>
        <div className="flex flex-row justify-between md:justify-start items-center w-full border-t-2 border-t-base-100 pt-6 space-x-8 md:space-x-0">
          <BsSliders
            className="w-6 h-6 font-thin text-[#A6ADBB] md:hidden"
            onClick={() => setIsSidebar(!isSidebar)}
          />
          <div className="pl-0">
            <Select
              color="cyan"
              label="Sort By"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              className="!ml-0"
              onChange={setSortBy}
            >
              <Option value={1}>Highest Price First</Option>
              <Option value={2}>Lowest Price First</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full relative mb-8">
        <Sidebar
          open={isSidebar}
          handleSidebar={() => setIsSidebar(!isSidebar)}
          setIsNew={setIsNew}
          setIsFeatured={setIsFeatured}
          setIsPromotion={setIsPromotion}
          setIsInStock={setIsInStock}
          setPrice={setPrice}
          categories={categories}
          setCategories={setCategories}
          productQuantity={products?.length}
        />
        <div className="w-full mx-auto flex items-center justify-center">
          <ListProduct products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default Products;
