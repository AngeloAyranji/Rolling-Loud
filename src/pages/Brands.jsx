import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";
import { parseLink } from "../utils/utils";
import { Helmet } from "react-helmet";

function Brands() {
  const { data: brands, loading } = useFetch(`api/brands?populate[image]=*`);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {!loading && brands ? (
        <div className="w-full mx-auto flex justify-center items-center">
          <div className="max-w-[1400px] w-full p-4 md:p-8">
            <h1 className="text-xl xl:text-3xl font-bold text-white uppercase">
              our brands
            </h1>
            <p className="mt-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              quod error incidunt fugiat, expedita corporis soluta rerum
              architecto, quae possimus ab perferendis maiores quam odit dicta
              reiciendis, tempore cupiditate nostrum.
            </p>
            <div className="w-full h-[1px] bg-gray-700 mt-8 mb-10 md:mb-14"></div>
            <div className="w-full flex flex-row flex-wrap justify-center align-start gap-8 md:gap-12">
              {brands?.map((brand, index) => {
                return (
                  <Link
                    to={`/products/${parseLink(brand.attributes.name)}`}
                    key={index}
                  >
                    <Brand
                      imgsrc={
                        brand.attributes.image.data
                          ? brand.attributes.image.data.attributes.url
                          : null
                      }
                      name={brand.attributes.name}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Brands;
