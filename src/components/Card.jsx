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
    for (let i = 0; i < item.options.length; i++) {
      if (item.options[i].quantity > 0) return true;
    }
    return false;
  };

  return (
    <Fragment>
      {/* card */}
      <div className="flex flex-col rounded-xl w-[150px] md:w-[190px] shadow-xl h-full lg:w-[300px] md:h-[320px] lg:h-[500px] cursor-pointer group relative bg-gradient-to-br from-[#2c2c2c] to-[#171717]">
        <div></div>
      </div>
    </Fragment>
  );
}

export default Card;
