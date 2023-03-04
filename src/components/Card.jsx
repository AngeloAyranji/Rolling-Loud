import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";


function Card({ item }) {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    setTimeout(() => setImgUrl(process.env.REACT_APP_BACKEND_URL + (item.image.data[0].attributes.url).substring(1)), 100)
  }, [])

  return (
    <div className="rounded-xl w-[150px] md:w-[190px] shadow-xl h-[296px] lg:w-[320px] lg:h-[570px] cursor-pointer group relative bg-secondary-content">
      <figure>
        <img
          src={imgUrl}
          alt="Shoes"
          className="lg:h-[220px] h-[115px] object-cover object-center w-full rounded-t-xl"
        />
      </figure>
      <div className="absolute flex lg:hidden h-8 w-8 md:h-12 md:w-12  rounded-full bg-primary transition-opacity right-4 top-4 lg:group-hover:flex text-secondary-content items-center justify-center hover:scale-105">
        <MdAddShoppingCart />
      </div>
      <div className="flex flex-col flex-1 justify-between lg:w-[320px] w-[150px] md:w-[190px] lg:h-[350px] h-[180px] p-4 lg:p-8">
        <div>
          <div className="flex flex-col space-y-2  mb-4">
            <h2 className="card-title uppercase text-neutral group-hover:text-black ease-in-out duration-150 text-xs lg:text-base">
              {item.title}
            </h2>
            {item.type === 'new' && (
              <div className="badge badge-secondary badge-xs lg:badge-md">
                NEW
              </div>
            )}
            {item.type === 'featured' && (
              <div className="badge badge-secondary badge-xs lg:badge-md">
                FEATURED
              </div>
            )}
            {item.type === "promotion" && (
              <div className="badge badge-secondary badge-xs lg:badge-md">
                PROMOTION
              </div>
            )}
          </div>
          {/* <div className="h-4">
          {item.quantity > 0 ? (
            <p className="text-green-500 text-xs lg:text-sm">In Stock</p>
          ) : (
            <p className="text-gray-600 line-through text-xs lg:text-sm">
              Out Of Stock
            </p>
          )}
        </div> */}
          <p className="hidden group-hover:text-black text-base-100 ease-in-out duration-150 text-sm line-clamp-0 lg:line-clamp-4 mb-4 lg:mb-8 lg:inline-block">
            {item.shortDescription}
          </p>
        </div>
        {item.type == 'promotion' ? (
          <div className="card-actions justify-start">

            <div className="badge badge-xs lg:badge-md line-through text-gray-400">
              $ {item.oldPrice}
            </div>
            <div className="badge badge-xs lg:badge-md text-secondary-content">
              $ {item.price}
            </div>
          </div>
        ) : (
          <div className="card-actions justify-start">
            <div className="badge badge-xs lg:badge-md text-secondary-content">
              ${item.price}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
