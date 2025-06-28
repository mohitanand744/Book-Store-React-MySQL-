import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import QuantitySelector from "../../QuantitySelector";
import Button from "../../Buttons/Button";
import { FaArrowRightLong } from "react-icons/fa6";

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

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

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
                              <motion.li
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-6"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-12 h-12 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                  />
                                </svg>
                                <p className="mt-2 text-gray-500">
                                  Your cart is empty
                                </p>
                              </motion.li>
                            ) : (
                              <div className="space-y-5">
                                {cartItems.map((item) => (
                                  <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex p-3 transition-all duration-300 bg-[#F8F5F0] rounded-2xl"
                                  >
                                    <div className="flex-shrink-0 w-24 h-24 p-1 overflow-hidden border border-gray-200 rounded-2xl">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-contain object-center w-full h-full"
                                      />
                                    </div>

                                    <div className="flex flex-col flex-1 ml-4">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <div className="flex flex-col">
                                            <h3>{item.name}</h3>
                                            <p className="text-[12px] leading-4 text-gray-500">
                                              A journey through space and time.
                                              This special edition includes...
                                            </p>
                                          </div>
                                          <p className="ml-4">
                                            ${item.price.toFixed(2)}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <QuantitySelector
                                          initialQuantity={item.quantity}
                                          onChange={(quantity) =>
                                            handleQuantityChange(
                                              item.id,
                                              quantity
                                            )
                                          }
                                        />
                                      </div>

                                      <div className="flex justify-end mt-4">
                                        <button
                                          onClick={() => removeItem(item.id)}
                                          className="text-sm font-medium text-red-600 hover:text-red-500"
                                        >
                                          <RiDeleteBin6Line size={20} />
                                        </button>
                                      </div>
                                    </div>
                                  </motion.li>
                                ))}
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
