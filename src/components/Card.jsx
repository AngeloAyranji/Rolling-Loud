import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartReducer";

function Card({ item, id }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const products = useSelector((state) => state.cart.products);

  const checkAvailability = (quantityValue) => {
    if (item) {
      const prod = products.find((x) => x.id === id);
      if (!prod && item.quantity > 0) {
        console.log(
          "added to cart: " + quantityValue,
          "total quantity",
          quantityValue
        );
        dispatch(
          addToCart({
            id: id,
            name: item.title,
            img: item.image.data[0].attributes.url,
            price: item.price,
            quantity,
          })
        );
      } else {
        if (!prod) {
          console.log("Item out of Stock");
        } else {
          if (quantityValue + prod.quantity <= item.quantity) {
            console.log(
              "added to cart: " + quantityValue,
              "total quantity",
              prod.quantity + quantityValue
            );
            dispatch(
              addToCart({
                id: id,
                name: item.title,
                img: item.image.data[0].attributes.url,
                price: item.price,
                quantity,
              })
            );
          } else {
            console.log("cart is full");
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col rounded-xl w-[150px] md:w-[190px] shadow-xl h-[296px] lg:w-[320px] md:h-[370px] lg:h-[570px] cursor-pointer group relative bg-secondary-content">
      <Link to={`/product/${item.title}`}>
        <figure>
          {item && (
            <img
              src={item?.image.data[0].attributes.url}
              alt="Product Image"
              className="object-cover object-center w-full rounded-t-xl aspect-square"
            />
          )}
        </figure>
      </Link>
      <div
        className="absolute flex lg:hidden h-8 w-8 md:h-12 md:w-12  rounded-full bg-primary transition-opacity right-4 top-4 lg:group-hover:flex text-secondary-content items-center justify-center hover:scale-105"
        onClick={() => checkAvailability(quantity)}
      >
        <MdAddShoppingCart />
      </div>
      <Link to={`/product/${item.title}`}>
        <div className="flex flex-col justify-between lg:w-[320px] w-[150px] md:w-[190px] h-full p-4 lg:p-6">
          <div>
            <div className="flex flex-col space-y-2  mb-4">
              <h2 className="card-title uppercase text-neutral group-hover:text-black ease-in-out duration-150 text-xs lg:text-base">
                {item.title}
              </h2>
              {item.type === "new" && (
                <div className="badge badge-secondary badge-xs lg:badge-md">
                  NEW
                </div>
              )}
              {item.type === "featured" && (
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
            <div className="h-4">
              {item.quantity > 0 ? (
                <p className="text-green-500 text-xs lg:text-sm">In Stock</p>
              ) : (
                <p className="text-gray-600 line-through text-xs lg:text-sm">
                  Out Of Stock
                </p>
              )}
            </div>
            <p className="hidden group-hover:text-black text-base-100 ease-in-out duration-150 text-sm line-clamp-0 lg:line-clamp-3 mb-4 lg:mb-8 lg:inline-block">
              {item.shortDescription}
            </p>
          </div>
          {item.type == "promotion" ? (
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
      </Link>
    </div>
  );
}

export default Card;
