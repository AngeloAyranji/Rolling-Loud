import { Fragment } from "react";
import useFetch from "../hooks/useFetch";
import { useRegionChecker } from "../hooks/regionChecker";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

function List({ type }) {
  const { region } = useRegionChecker();

  const { data: products, loading } = useFetch(
    `api/products?populate[image]=*&populate[brand]=*&populate[categories]=*&populate[options][populate]=*&filters[type][$eq]=${type}&pagination[pageSize]=4&filters[region][$eq]=${region}`
  );

  return (
    <div className="gap-4 flex flex-row overflow-x-scroll items-center justify-start scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full pb-8">
      {loading ? (
        <Fragment>
          {[...Array(4)].map((star, index) => {
            return <CardSkeleton key={index} />;
          })}
        </Fragment>
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
