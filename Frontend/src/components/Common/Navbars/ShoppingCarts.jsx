import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import QuantitySelector from "../../QuantitySelector";
import Button from "../../Buttons/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import CheckoutBooksCard from "../../Cards/CheckoutBooksCard";
import CartItemsNoData from "../../EmptyData/CartItemsNoData";
import NoData from "../../EmptyData/noData";

// Mock data for cart items
const mockCartItems = [
  {
    id: 1,
    name: "Desert Storms",
    price: 99.99,
    quantity: 1,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcST2_1i1NyxMqbY6vjq7CgFKocgroiiu9zg770ja3V7fj72rv10n9i_N64_2XQLEHWnnMUSs3Zcss5In9xlJmgHCjEpsLSi3t2FRx8bM7PEa6QCv0SWnMZq2Q",
  },
  {
    id: 2,
    name: "Galactic Wars",
    price: 199.99,
    quantity: 1,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTOYA9Dc5SYYw2PgWOjHWHh1u35Ej__7m6jz6KYITFoYs-CYD1pMGLkZEtQVk3W9eQBbugbA2aC5jSX8j7moU5ENIEEf8-fvx3p3sr0jBFTVg9FNBEdnXSF",
  },
  {
    id: 3,
    name: "Desert Storms",
    price: 79.99,
    quantity: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ1Skl5TTerlDFbWVmCW_cL9BBXAtdS-_AdVJdlbE7KPs7DExRiblBJswAfFgPmFj3wqteiD0MbfVnfeTJoBtaZwORgEV0qO9mItMDNsqmD_tnkAf758DwL",
  },
];

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [quantity, setQuantity] = useState(1);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const navigate = useNavigate();
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative">
      {/* Cart Slide-out Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-35"
              onClick={toggleCart}
            />

            <div className="absolute inset-y-0 right-0 flex max-w-full">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut" }}
                className="relative w-screen max-w-md"
              >
                <div className="flex flex-col h-full bg-white bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjgtMDAxOWIuanBn.jpg')] bg-cover bg-top shadow-xl">
                  <div className="flex-1 pt-6 pb-2 pl-4 pr-2 overflow-y-auto sm:px-6">
                    <div className="flex h-[2.5rem] bg-[#F8F5F0] border-r-2 border-red-600 px-3 rounded-3xl items-center justify-between">
                      <h2 className="text-xl font-medium text-gray-900">
                        Shopping cart
                      </h2>
                      <button
                        onClick={toggleCart}
                        className="flex items-center justify-center h-10 text-red-700 rounded-full w-7 hover:text-gray-500"
                      >
                        <FaArrowRightLong size={20} />
                      </button>
                    </div>

                    <div className="mt-16">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          <AnimatePresence>
                            {cartItems.length === 0 ? (
                              <NoData
                                title="Your cart is empty"
                                message="Looks like you haven't added anything to your cart yet"
                                icon="cart"
                                showAction={true}
                                actionText="Continue Shopping"
                                actionLink="/nextChapter/books"
                                onActionClick={toggleCart}
                              />
                            ) : (
                              <div className="pb-4 space-y-5">
                                <CheckoutBooksCard
                                  items={cartItems}
                                  updateQuantity={updateQuantity}
                                  removeItem={removeItem}
                                />
                              </div>
                            )}
                          </AnimatePresence>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {cartItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-4 py-6 border-t rounded-t-3xl bg-[#F8F5F0] border-gray-200 sm:px-6"
                    >
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full"
                        >
                          <Button
                            onClick={() => {
                              navigate("/nextChapter/checkout");
                              toggleCart();
                            }}
                            type="button"
                            variant="primary"
                            className="w-full"
                            //onClick={handleCheckout}
                          >
                            Checkout
                          </Button>
                        </motion.button>
                      </div>
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            onClick={toggleCart}
                            className="font-medium text-[#5C4C49] hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCart;
