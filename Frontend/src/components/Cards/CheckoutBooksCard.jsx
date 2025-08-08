import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import QuantitySelector from "../QuantitySelector";

const CheckoutBooksCard = ({ items, updateQuantity, removeItem }) => {
  return items.map((item, i) => (
    <motion.li
      key={item.id}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: i * 0.25,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.1 },
      }}
      className="flex p-3 h-fit transition-all duration-300 bg-[#F8F5F0] rounded-2xl"
    >
      <div className="flex-shrink-0 w-24 h-24 p-1 overflow-hidden border border-gray-200 rounded-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain object-center w-full h-full"
        />
      </div>

      <div className="relative flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <div className="flex flex-col">
              <h3>{item.name}</h3>
              <p className="text-[12px] leading-4 text-gray-500">
                A journey through space and time. This special edition
                includes...
              </p>
            </div>
            <p className="ml-4">${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-3">
          <QuantitySelector
            initialQuantity={item.quantity}
            onChange={(quantity) => updateQuantity(item.id, quantity)}
          />
        </div>

        <div className="absolute bottom-0 right-0 ">
          <button
            onClick={() => removeItem(item.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </motion.li>
  ));
};

export default CheckoutBooksCard;
