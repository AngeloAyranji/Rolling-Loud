import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { FiHeart } from "react-icons/fi";
import { CiDeliveryTruck, CiLock } from "react-icons/ci";

const product = {
  manufacturer: "MANUFACTURER : CAMERA BUTTER / RÉFÉRENCE : AVATA-4-8-16-32",
  name: "SET DE FILTRES ND 4/8/16/32 POUR DJI AVATA - CAMERA BUTTER",
  price: "150.08 EUR",
  img: [
    {
      key: 0,
      source:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      key: 1,
      source:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      key: 2,
      source:
        "https://media.istockphoto.com/id/680040480/photo/quadrocopter-drone-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=Z1VhGbumvRzlCaBt8aKp7eShzX90RU6Axvjw-PIYvUs=",
    },
    {
      key: 3,
      source:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      key: 4,
      source:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      key: 5,
      source:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
    {
      key: 6,
      source:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    },
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque ex ipsum, minus eum, optio non ut natus ea deserunt, facilis assumenda! Ex unde suscipit beatae natus. Quo accusamus facere quae.",
  technicalDescription: [
    "ND4 (ND 0,6) 25% de transmission (nuageux, couvert)",
    "ND8 (ND 0,9) 12,5% de transmission (un peu de lumière)",
    "ND16 (ND 1,2) 6,25% de transmission (lumière intense)",
    "ND32 (ND 1,5) 3.125% de transmission (lumière très brillante)",
  ],
};

function Product() {
  const [mainImg, setMainImg] = useState(product.img[0].source);
  const [quantity, setQuantity] = useState(1);

  const handleImg = (e) => {
    setMainImg(e.target.src);
  };
  return (
    <div className="flex w-full mx-auto p-4 pt-8 md:p-8">
      <div className="flex flex-col space-y-8 w-full mx-auto max-w-[1400px]">
        <Breadcrumbs />
        <div className=" flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center mt-8 lg:mt-12 lg:space-x-8 xl:space-x-14">
          {/*image div*/}
          <div className="flex flex-col space-y-4 md:items-start justify-center items-center w-full max-w-[520px] lg:max-w-[440px]">
            <div className="relative w-full aspect-square border-primary border rounded-lg overflow-hidden">
              <img
                src={mainImg}
                alt=""
                className="object-cover object-center w-full h-full"
              />
              <div className="flex flex-row space-x-2 justify-end items-center absolute top-4 right-4 hover:text-black  duration-150 ease-in cursor-pointer">
                <FiHeart className="" />
                <p className="text-sm uppercase">Add to Wishlist</p>
              </div>
            </div>
            <div className="flex w-full mx-auto space-x-2 overflow-x-auto lg:scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-gray-600 scrollbar-track-rounded-full pb-4">
              {product.img.map((item) => (
                <div
                  className="w-[100px] h-[100px] aspect-square border-primary border rounded-lg cursor-pointer"
                  key={item.key}
                >
                  <img
                    src={item.source}
                    alt=""
                    className="object-cover object-center w-full h-full rounded-lg"
                    onClick={handleImg}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-12 lg:mt-0 max-w-[520px] lg:max-w-none">
            <p className="uppercase font-bold text-xs">
              {product.manufacturer}
            </p>
            <h2 className="text-xl text-secondary-content font-bold">
              {product.name}
            </h2>
            <p className="line-through text-xs lg:text-sm">Out Of Stock</p>
            <div className="w-full h-1 rounded-full bg-base-100"></div>
            <p className="text-xl text-primary font-semibold tracking-wide">
              {product.price}
            </p>
            <p className="text-secondary-content">{product.description}</p>
            <div className="pt-8 pb-8 flex flex-row justify-start space-x-4 items-center">
              <div className="flex h-full flex-row justify-between p-2 border rounded-lg border-primary items-center w-[90px] text-secondary-content pl-4 pr-4">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                {quantity}
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
              <button className="btn btn-primary w-full max-w-[250px]">
                Add to Cart
              </button>
            </div>
            <div className="w-full h-1 rounded-full bg-base-100"></div>
            <div className="flex flex-row space-x-4 items-center pt-4">
              <CiLock className="w-10 h-10 text-secondary-content text-sm" />
              <div className="flex flex-col space-y-2">
                <p className="uppercase text-secondary-content">
                  Secure payments
                </p>
                <p className="text-xs">
                  All payments made from SkyShop are 100% secure
                </p>
              </div>
            </div>
            <div className="flex flex-row space-x-4 items-center">
              <CiDeliveryTruck className="w-10 h-10 text-secondary-content" />
              <div className="flex flex-col space-y-2">
                <p className="uppercase text-secondary-content text-sm">
                  fast deliveries
                </p>
                <p className="text-xs">All deliveries take 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* extra infos and related products */}
        <div className="w-full mx-auto p-4 md:p-8 border-2 border-primary rounded-lg flex flex-col space-y-4 pt-8">
          <h3 className="text-secondary-content text-lg text-semibold tracking-wide uppercase">
            Technical Characteristics
          </h3>
          <div className="w-full h-1 rounded-full bg-secondary-content/[0.5]"></div>
          <p className="text-secondary-content leading-relaxed">
            Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula
            sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt
            nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed,
            convallis at tellus. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. Mauris blandit aliquet elit, eget
            tincidunt nibh pulvinar a. Proin eget tortor risus. Donec rutrum
            congue leo eget malesuada. Pellentesque in ipsum id orci porta
            dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at
            sem. Curabitur non nulla sit amet nisl tempus convallis quis ac
            lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis
            at tellus. Curabitur aliquet quam id dui posuere blandit. Curabitur
            aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit
            neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
            Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Quisque
            velit nisi, pretium ut lacinia in, elementum id enim. Quisque velit
            nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit
            tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui
            posuere blandit. Curabitur arcu erat, accumsan id imperdiet et,
          </p>
          <ul className="list-disc text-secondary-content list-inside">
            {product.technicalDescription.map((text) => (
              <li className="text-sm tracking-wide font-semibold">{text}</li>
            ))}
          </ul>
          <p className="link">Cick here for the whole product info</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
