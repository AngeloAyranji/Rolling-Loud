import { useState, Fragment } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegionChecker } from "../hooks/regionChecker";
import { addToCart } from "../redux/cartReducer";
import { updateQuantity } from "../redux/cartReducer";

function Card({ item, id }) {
  const navigate = useNavigate();

  const { currency } = useRegionChecker();

  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const products = useSelector((state) => state.cart.products);

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const CloseToast = () => {
    setShowToast(false);
  };

  const checkAvailability = (quantityValue) => {
    if (item) {
      const prod = products.find((x) => x.id === id);
      if (!prod) {
        if (
          item.options.length === 1 &&
          item.options[0].quantity > 0 &&
          (item.options[0].title === "Default" ||
            item.options[0].title === "default")
        ) {
          handleToast();
          dispatch(
            addToCart({
              id: id,
              name: item.title,
              img: item.image.data[0].attributes.url,
              price: item.options[0].price,
              option: item.options[0].option,
              optionId: item.options[0].id,
              optionName: item.options[0].option_name,
              quantity: 1,
            })
          );
        } else {
          navigate(`/product/${encodeURIComponent(item.title)}`);
        }
      } else {
        if (
          item.options.length === 1 &&
          quantityValue + prod.quantity <= item.options[0].quantity &&
          (item.options[0].title === "Default" ||
            item.options[0].title === "default")
        ) {
          handleToast();
          dispatch(
            updateQuantity({
              optionId: item.options[0].id,
              quantity: prod.quantity + quantityValue,
            })
          );
        } else {
          navigate(`/product/${encodeURIComponent(item.title)}`);
        }
      }
    }
  };

  const checkQuantity = () => {
    for(let i = 0; i < item.options.length; i++) {
      if(item.options[i].quantity > 0) return true
    }
    return false;
  }

  return (
    <Fragment>
      {/* toast */}
      <div
        id="toast-notification"
        className={
          showToast
            ? "w-full max-w-[300px] p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300 fixed bottom-4 right-4 z-[10000]"
            : "hidden"
        }
        role="alert"
      >
        <div className="flex items-center mb-3">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            Product added
          </span>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-notification"
            aria-label="Close"
            onClick={CloseToast}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <div className="relative inline-block shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src={item?.image.data[0].attributes.url}
              alt="Product"
            />
          </div>
          <div className="ml-3 text-sm font-normal">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.title}
            </div>
          </div>
        </div>
      </div>{" "}
      {/* card */}
      <div className="flex flex-col rounded-xl w-[150px] md:w-[190px] shadow-xl h-full lg:w-[300px] md:h-[320px] lg:h-[500px] cursor-pointer group relative bg-secondary-content">
        <Link to={`/product/${encodeURIComponent(item.title)}`}>
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
        <Link to={`/product/${encodeURIComponent(item.title)}`}>
          <div className="flex flex-col justify-between lg:w-[320px] w-[150px] md:w-[190px] h-[130px] p-4 lg:p-6">
            <div>
              <div className="flex flex-col space-y-2 mb-2 ">
                <h2 className="card-title uppercase text-neutral group-hover:text-black ease-in-out duration-150 text-xs lg:text-base line-clamp-2">
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
                {item.type === "preorder" && (
                  <div className="badge badge-secondary badge-xs lg:badge-md">
                    PRE-ORDER
                  </div>
                )}
              </div>
              <div className="h-4 mb-2">
                {item.type !== "preorder" && (
                  <>
                    {checkQuantity() ? (
                      <p className="text-green-500 text-xs lg:text-sm">
                        In Stock
                      </p>
                    ) : (
                      <p className="text-gray-600 line-through text-xs lg:text-sm">
                        Out Of Stock
                      </p>
                    )}
                  </>
                )}
              </div>
              {/* <p className="hidden group-hover:text-black text-base-100 ease-in-out duration-150 text-sm line-clamp-4 lg:line-clamp-3 mb-4 lg:mb-8 lg:inline-block">
                {item.shortDescription}
              </p> */}
            </div>
            {item.type == "promotion" ? (
              <div className="card-actions justify-start">
                <div className="badge badge-xs lg:badge-md line-through text-gray-400">
                  {currency} {item.options[0].price}
                </div>
                <div className="badge badge-xs lg:badge-md text-secondary-content">
                  {currency}{" "}
                  {item.options[0].price -
                    (item.options[0].price * item.discountPercentage) / 100}
                </div>
              </div>
            ) : (
              <div className="card-actions justify-start">
                <div className="badge badge-xs lg:badge-md text-secondary-content">
                  {currency} {item.options[0].price}
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>
    </Fragment>
  );
}

export default Card;
