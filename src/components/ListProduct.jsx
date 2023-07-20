import { Fragment } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { Link } from "react-router-dom";

function ListProduct({ products, loading }) {
  return (
    <div className="grid grid-cols-2 md:gap-8 xl:gap-14 2xl:gap-8 2xl:grid-cols-3 gap-4 p-4 justify-start">
      <Fragment>
        <Link to={"/product/1"}>
        <Card tokenId={1} />
        </Link>
        <Card tokenId={2} />
        <Card tokenId={3} />
        <Card tokenId={4} />
      </Fragment>

    </div>
  );
}

export default ListProduct;
