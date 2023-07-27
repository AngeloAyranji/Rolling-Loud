import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useParams, useLocation, Link } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { BsSliders } from "react-icons/bs";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ListProduct from "../components/ListProduct";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";
import { useRegionChecker } from "../hooks/regionChecker";
import { Helmet } from "react-helmet";

function Products() {
  const { category, subcategory } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const queryFilter = queryParams.get("filter");
  const querySearch = queryParams.get("search");

  const { region } = useRegionChecker();

  const [isSidebar, setIsSidebar] = useState(false);
  const [isNew, setIsNew] = useState(queryFilter === "new" ? true : false);
  const [isPromotion, setIsPromotion] = useState(
    queryFilter === "promotion" ? true : false
  );
  const [isFeatured, setIsFeatured] = useState(
    queryFilter === "featured" ? true : false
  );
  const [isPreorder, setIsPreorder] = useState(
    queryFilter === "preorder" ? true : false
  );
  const [isInStock, setIsInStock] = useState(false);
  const [price, setPrice] = useState([0, 3000]);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const { data: categoryDB } = useFetch(
    `api/categories/?filters[title][$eq]=${category}`
  );

  const { data: brandDB } = useFetch(
    `api/brands/?filters[name][$eq]=${category}`
  );

  const {
    data: productsDB,
    metadata,
    loading,
  } = useFetch(url.length ? url + `&pagination[page]=1` : "");

  useEffect(() => {
    if (brandDB && categoryDB) handleFilters();
  }, [
    isNew,
    isFeatured,
    isPromotion,
    isPreorder,
    isInStock,
    category,
    price,
    brandDB,
    categoryDB,
    querySearch,
    subcategory,
  ]);

  useEffect(() => {
    setProducts(productsDB);
  }, [productsDB]);

  useEffect(() => {
    handleSortBy(products);
  }, [sortBy]);

  const handleSortBy = (prod) => {
    if (prod) {
      let tmpProducts = prod.slice();
      if (sortBy === "1") {
        tmpProducts = tmpProducts.sort(
          (a, b) =>
            b.attributes.options[0].price - a.attributes.options[0].price
        );
      } else if (sortBy === "2") {
        tmpProducts = tmpProducts.sort(
          (a, b) =>
            a.attributes.options[0].price - b.attributes.options[0].price
        );
      } else {
        tmpProducts = tmpProducts.sort(
          (a, b) =>
            new Date(a.attributes.publishedAt).getTime() -
            new Date(b.attributes.publishedAt).getTime()
        );
      }

      setProducts(tmpProducts);
    }
  };

  const handleFilters = () => {
    let filter = `api/products/?populate[image]=*&populate[brand]=*&populate[categories]=*&populate[options]=*&pagination[pageSize]=25&filters[region][$eq]=${region}`;

    if (querySearch) filter += `&filters[title][$containsi]=${querySearch}`;
    if (category && categoryDB?.length)
      filter += `&filters[categories][title][$eq]=${category}`;
    if (category && brandDB?.length)
      filter += `&filters[brand][name][$eq]=${category}`;
    if (subcategory)
      filter += `&filters[subcategories][title][$eq]=${subcategory}`;
    if (isNew) filter += "&filters[type][$eq]=new";
    if (isPromotion) filter += "&filters[type][$eq]=promotion";
    if (isFeatured) filter += "&filters[type][$eq]=featured";
    if (isPreorder) filter += "&filters[type][$eq]=preorder";
    if (isInStock) filter += "&filters[quantity][$gt]=0";
    setUrl(filter);
    setPage(1);
  };

  const handleAddMore = async (page) => {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + url + `&pagination[page]=${page}`
    );
    let tmpProducts = products.slice();
    tmpProducts = tmpProducts.concat(res.data.data);
    handleSortBy(tmpProducts);
    // setProducts(tmpProducts);
    setPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Rolling Loud - Tickets</title>
      </Helmet>
      <div className="w-full md:mb-[200px] mb-20">
        <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14">
          <div className="mb-4">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
            >
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to={`/products`}>All Products</Link>
            </Breadcrumbs>
          </div>
          <h2 className="text-xl xl:text-3xl font-bold text-white uppercase mb-4">
            All Tickets
          </h2>

          <div className="flex flex-row justify-between md:justify-start items-center w-full border-t-2 border-t-base-100 pt-6 space-x-8 md:space-x-0 mb-4">
            <BsSliders
              className="w-6 h-6 font-thin text-[#A6ADBB] md:hidden"
              onClick={() => setIsSidebar(!isSidebar)}
            />
          </div>
        </div>
        <div className="flex flex-row w-full relative mb-8">
          {/* <Sidebar
            open={isSidebar}
            handleSidebar={() => setIsSidebar(!isSidebar)}
            setIsNew={setIsNew}
            isNew={isNew}
            setIsFeatured={setIsFeatured}
            isFeatured={isFeatured}
            setIsPreorder={setIsPreorder}
            isPreorder={isPreorder}
            setIsPromotion={setIsPromotion}
            isPromotion={isPromotion}
            setIsInStock={setIsInStock}
            setPrice={setPrice}
            productQuantity={metadata ? metadata.pagination.total : 0}
          /> */}
          <div className="w-full mx-auto flex items-center justify-center">
            <ListProduct products={products} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
