import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Button from "../../Buttons/Button";
import CheckoutBooksCard from "../../Cards/CheckoutBooksCard";
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
  const navigate = useNavigate();

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsCartOpen(false);
    window.addEventListener("keydown", handleEsc);

    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen, setIsCartOpen]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
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
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            onClick={toggleCart}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Panel Wrapper */}
            <div className="absolute inset-y-0 right-0 flex max-w-full">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut" }}
                className="relative w-screen max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full bg-white bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjgtMDAxOWIuanBn.jpg')] bg-cover bg-top shadow-xl">
                  {/* Header + Items */}
                  <div className="flex-1 pt-6 pb-2 pl-4 pr-2 overflow-y-auto sm:px-6">
                    {/* Header */}
                    <div className="flex h-[2.5rem] bg-[#F8F5F0] border-r-2 border-red-600 px-3 rounded-3xl items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Shopping Cart
                      </h2>
                      <div className="flex items-center gap-4">
                        <p
                          className="
    flex items-center justify-center
    min-w-[22px] h-[22px] px-1.5
    text-[11px] font-bold
    text-white
    bg-gradient-to-tr from-[#5C4C49] to-[#D3BD9D]
    rounded-full
    shadow-md
    ring-2 ring-white
  "
                        >
                          {totalItems}
                        </p>

                        <button
                          onClick={toggleCart}
                          className="flex items-center justify-center gap-4 h-10 text-red-700 rounded-full w-7 hover:text-gray-500"
                          aria-label="Close cart"
                        >
                          <FaArrowRightLong size={18} />
                        </button>
                      </div>
                    </div>


                    {/* Items */}
                    <div className="mt-6">
                      {cartItems.length === 0 ? (
                        <NoData
                          title="Your cart is empty"
                          message="Looks like you haven't added anything yet."
                          icon="cart"
                          showAction={true}
                          actionText="Continue Shopping"
                          actionLink="/nextChapter/books"
                          onActionClick={toggleCart}
                        />
                      ) : (
                        <ul className="space-y-5">
                          <CheckoutBooksCard
                            items={cartItems}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                          />
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
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

                      <p className="mt-1 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>

                      <div className="mt-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => {
                              navigate("/nextChapter/checkout");
                              toggleCart();
                            }}
                            type="button"
                            variant="primary"
                            className="w-full"
                          >
                            Checkout
                          </Button>
                        </motion.div>
                      </div>

                      <div className="flex justify-center mt-6 text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            onClick={toggleCart}
                            className="font-medium text-[#5C4C49] hover:text-indigo-500"
                          >
                            Continue Shopping →
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
