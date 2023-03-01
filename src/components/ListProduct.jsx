import React from "react";
import Card from "./Card";

function ListProduct() {
  const data = [
    {
      name: "SET DE FILTRES ND 4/8/16/32 POUR DJI AVATA - CAMERA BUTTER",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: true,
      isFeatured: false,
      isPromotion: false,
      isInStock: true,
      promotion: 1,
      id: 1,
    },
    {
      name: "MOTEUR LETHAL CONCEPTION 2207.5 - 1866KV",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: true,
      promotion: 0.34,
      id: 2,
    },
    {
      name: "GPS GOKU GM10 NANO V3 - FLYWOO",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: false,
      promotion: 0.34,
      id: 3,
    },
    {
      name: "drone",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: true,
      promotion: 0.34,
      id: 4,
    },
    {
      name: "GPS GOKU GM10 NANO V3 - FLYWOO",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: false,
      promotion: 0.34,
      id: 5,
    },
    {
      name: "GPS GOKU GM10 NANO V3 - FLYWOO",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: false,
      promotion: 0.34,
      id: 6,
    },
    {
      name: "GPS GOKU GM10 NANO V3 - FLYWOO",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: false,
      promotion: 0.34,
      id: 7,
    },
    {
      name: "GPS GOKU GM10 NANO V3 - FLYWOO",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: false,
      promotion: 0.34,
      id: 8,
    },
    {
      name: "GPS GOKU GM10 NANO V3 - FLYWOO",
      image:
        "https://images.unsplash.com/photo-1597353361282-e3d3af9f4ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae! Corporis magni quisquam deserunt quibusdam similique labore rerum iusto, nisi, iste distinctio doloribus commodi nulla nostrum qui quaerat eaque perferendis?",
      price: 150,
      isNew: false,
      isFeatured: false,
      isPromotion: true,
      isInStock: false,
      promotion: 0.34,
      id: 9,
    },
  ];
  return (
    <div className="grid gap-4 grid-cols-2 md:gap-8 xl:gap-14 2xl:gap-8 2xl:grid-cols-3 gap-4 p-4 justify-start">
      {data?.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
}

export default ListProduct;
