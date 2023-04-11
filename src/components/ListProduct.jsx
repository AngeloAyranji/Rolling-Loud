import { Fragment } from "react";
import Card from "./Card";
import Loading from "./Loading";

function ListProduct({ products, loading, error }) {
  return (
    <div className="grid grid-cols-2 md:gap-8 xl:gap-14 2xl:gap-8 2xl:grid-cols-3 gap-4 p-4 justify-start">
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

export default ListProduct;
