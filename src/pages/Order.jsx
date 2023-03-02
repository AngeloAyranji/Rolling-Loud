import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/cartReducer";
import Breadcrumbs from "../components/Breadcrumbs";

function Order() {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <div className="max-w-[1400px] w-full">
        <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
          <Breadcrumbs className="z-0" />
          <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
            order id: 320581431
          </h2>
          <p className="max-w-[700px]">Order Date : Feb 16 , 2023</p>
          <div className="h-[2px] w-full bg-primary"></div>

          <div className="mt-8 w-full border-b-[2px] pb-8 border-b-base-100">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.img}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-sm lg:text-base font-medium text-white">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4 text-base lg:text-xl">
                            {product.price * product.quantity} $
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="">Qty : {product.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full mt-8 flex flex-col lg:flex-row items-start justify-center pb-8 border-b-[2px] border-base-100">
            <div className="w-full lg:w-[50%] mb-12 lg:mb-0">
              <p className="text-secondary-content font-medium text-lg mb-2">
                Payment Method:
              </p>
              <p className="">Visa **56</p>
            </div>
            <div className="w-full lg:w-[50%]">
              <p className="text-secondary-content font-medium text-lg mb-2">
                Delivery
              </p>
              <p className="text-sm text-gray-600">Adress</p>
              <p className="text-lg tracking-wide">847 Jewess Bridge Apt.174</p>
              <p className="text-lg tracking-wide">London, UK</p>
            </div>
          </div>

          <div className="w-full mt-8 flex flex-col lg:flex-row items-start justify-center pb-8 border-b-[2px] border-base-100">
            <div className="w-full lg:w-[50%] mb-12 lg:mb-0">
              <p className="text-secondary-content font-medium text-lg mb-2">
                Need Help?
              </p>
              <a href="">
                <p className="link">Order Issues</p>
              </a>
              <a href="">
                <p className="link">Delivery Issues</p>
              </a>
              <a href="">
                <p className="link">Return Policy</p>
              </a>
            </div>
            <div className="w-full lg:w-[50%] flex flex-col items-start">
              <p className="text-secondary-content font-medium text-lg mb-2">
                Order Summary
              </p>
              <div className="flex flex-row w-full justify-between items-center mb-2">
                <p className="text-xl font-semibold">Subtotal</p>
                <p className="text-xl font-semibold">524.50 $</p>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <p>Discount</p>
                <p>-127.40 $</p>
              </div>

              <div className="flex flex-row justify-between items-center w-full">
                <p>Delivery</p>
                <p>0.00 $</p>
              </div>

              <div className="flex flex-row justify-between items-center w-full border-b-[1px] border-gray-600 border-dashed pb-4 mb-4">
                <p>Tax</p>
                <p>0.00 $</p>
              </div>

              <div className="flex flex-row w-full justify-between items-center text-secondary-content">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">397.10 $</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full mx-auto max-w-[900px] lg:mt-20 mt-12 ">
            <ul className="steps w-full">
              <li data-content="" className="step step-primary">
                Order Placed
              </li>
              <li data-content="" className="step step-primary">
                Order Sent
              </li>
              <li data-content="" className="step">
                Delivered
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
