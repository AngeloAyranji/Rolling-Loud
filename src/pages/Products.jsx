import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Sidebar from "../components/Sidebar";
import ListProduct from "../components/ListProduct";
import { Select, Option } from "@material-tailwind/react";
import Loading from "../components/Loading";
import { BsSliders } from "react-icons/bs";
import useFetch from "../hooks/useFetch";
import { useParams, useLocation, Link } from "react-router-dom";

function Products() {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFilter = queryParams.get("filter");

  const [isSidebar, setIsSidebar] = useState(false);
  const [isNew, setIsNew] = useState(queryFilter === "new" ? true : false);
  const [isPromotion, setIsPromotion] = useState(
    queryFilter === "promotion" ? true : false
  );
  const [isFeatured, setIsFeatured] = useState(
    queryFilter === "featured" ? true : false
  );
  const [isInStock, setIsInStock] = useState(false);
  const [price, setPrice] = useState([0, 2000]);
  const [url, setUrl] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const { data: categoryDB } = useFetch(
    `api/categories/?filters[title][$eq]=${category}`
  );

  const { data: brandDB } = useFetch(
    `api/brands/?filters[name][$eq]=${category}`
  );

  const { data: products, loading, error } = useFetch(url);

  useEffect(() => {
    if (brandDB && categoryDB) handleFilters();
  }, [
    isNew,
    isFeatured,
    isPromotion,
    isInStock,
    sortBy,
    category,
    price,
    brandDB,
    categoryDB,
  ]);

  const handleFilters = () => {
    let filter = `api/products/?populate[image]=*&populate[brand]=*&populate[categories]=*&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}`;

    if (category && categoryDB?.length)
      filter += `&filters[categories][title][$eq]=${category}`;
    if (category && brandDB?.length)
      filter += `&filters[brand][name][$eq]=${category}`;
    if (isNew) filter += "&filters[type][$eq]=new";
    if (isPromotion) filter += "&filters[type][$eq]=promotion";
    if (isFeatured) filter += "&filters[type][$eq]=featured";
    if (isInStock) filter += "&filters[quantity][$gt]=0";
    if (sortBy == 2) filter += "&sort[0]=price:asc";
    if (sortBy == 1) filter += "&sort[0]=price:desc";
    setUrl(filter);
  };

  return (
    <>
      {!products ? (
        <Loading />
      ) : (
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
                <Link to={`/products/${category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              ) : (
                <Link to={`/products`}>All Products</Link>
              )}
            </Breadcrumbs>
            <h2 className="text-xl xl:text-3xl font-bold text-white uppercase">
              {!category ? "All Products" : category}
            </h2>
            <p className="max-w-[700px]">
              {category
                ? categoryDB.length
                  ? categoryDB[0]?.attributes.description
                  : brandDB.length
                  ? brandDB[0]?.attributes.name
                  : ""
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
                  <Option value={"1"}>Highest Price First</Option>
                  <Option value={"2"}>Lowest Price First</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full relative mb-8">
            <Sidebar
              open={isSidebar}
              handleSidebar={() => setIsSidebar(!isSidebar)}
              setIsNew={setIsNew}
              isNew={isNew}
              setIsFeatured={setIsFeatured}
              isFeatured={isFeatured}
              setIsPromotion={setIsPromotion}
              isPromotion={isPromotion}
              setIsInStock={setIsInStock}
              setPrice={setPrice}
              productQuantity={products?.length}
            />
            <div className="w-full mx-auto flex items-center justify-center">
              <ListProduct products={products} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
