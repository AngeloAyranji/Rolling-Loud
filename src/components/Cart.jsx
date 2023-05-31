import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem } from "../redux/cartReducer";
import { useRegionChecker } from "../hooks/regionChecker";

export default function Example({ handleOpen }) {
  const [open, setOpen] = useState(true);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const { currency } = useRegionChecker();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.price * item.quantity));
    total = total.toFixed(2);
    return total;
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[10000]" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-[#121212] shadow-xl">
                      <div className="flex-1 overflow-y-auto scrollbar-cart py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => handleOpen()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.img}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center bg-white"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-sm lg:text-base font-medium">
                                        <Link
                                          to={`/product/${encodeURIComponent(
                                            product.name
                                          )}`}
                                          className="line-clamp-3 text-white mb-2"
                                          onClick={() => handleOpen()}
                                        >
                                          {product.name}
                                        </Link>
                                        <p className="ml-4 text-white">
                                          {product.price * product.quantity}{" "}
                                          {currency}
                                        </p>
                                      </div>
                                      {product.option !== "Default" && (
                                        <p className="text-sm">
                                          {product.option}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                      <p>Qty {product.quantity}</p>

                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            dispatch(
                                              removeItem({
                                                id: product.id,
                                                optionId: product.optionId,
                                              })
                                            )
                                          }
                                          type="button"
                                          className="font-medium text-secondary hover:text-secondary-focus"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-white mt-4">
                          <p>Subtotal</p>
                          <p>
                            {totalPrice()} {currency}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            to="/checkout"
                            onClick={() => handleOpen()}
                            className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-focus"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-secondary hover:text-secondary-focus"
                              onClick={handleOpen}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
