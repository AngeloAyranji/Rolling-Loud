import React from "react";
import Card from "./Card";

function ListProduct() {
  const data = [
    {
      name: "drone",
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
      id: 2,
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
  ];
  return (
    <div className="w-full flex flex-wrap gap-4 p-4 justify-center">
      {data?.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
}

export default ListProduct;
