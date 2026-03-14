import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { getAllCategories } from "../../utils/apis/categoryApis";

const categories = [
  {
    name: "Fiction",
    image: "https://m.media-amazon.com/images/I/71P+4DslKmL._SL1500_.jpg",
  },
  {
    name: "Non-Fiction",
    image:
      "https://wizdomapp.com/wp-content/uploads/2024/10/product-jpeg-500x500-1-500x490.webp",
  },
  {
    name: "Mystery",
    image:
      "https://www.novelsuspects.com/wp-content/uploads/2021/04/Featured-Imaged-4.png",
  },
  {
    name: "Fantasy",
    image:
      "https://i.pinimg.com/736x/8f/4f/f8/8f4ff802576845df5040c6cbea06e5ea.jpg",
  },
  {
    name: "Science Fiction",
    image: "https://kevnit.com/wp-content/uploads/2024/02/Science-Fiction.jpg",
  },
  {
    name: "Biography",
    image:
      "https://www.thoughtco.com/thmb/xSPZWJbn39aKLR3efNrggf_NXh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/biography_glossary-57e2311f5f9b586516b4072e.jpg",
  },
  {
    name: "Self-Help",
    image: "https://edlines.co/wp-content/uploads/2024/06/selfhelp.jpg",
  },
  {
    name: "Romance",
    image:
      "https://thedailyaztec.com/wp-content/uploads/2022/02/romance-books.jpg",
  },
  {
    name: "History",
    image:
      "https://images.stockcake.com/public/5/b/1/5b16cd96-8b6f-4e5f-a38a-7d8dbd520b8f_large/ancient-opened-book-stockcake.jpg",
  },
  {
    name: "Thriller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSvQWDf9qL-bel1Y4mncZrMLvcvWFfpDC3Hl1fw56iPdzkk5YrfYEHqoI8Yo9O4akWeY&usqp=CAU",
  },
  {
    name: "Children's Books",
    image: "https://m.media-amazon.com/images/I/91nq3ycUeLL.jpg",
  },
  {
    name: "Poetry",
    image:
      "https://piv-prod.s3.ca-central-1.amazonaws.com/public/styles/focal_point_2000x800/public/2020-team-regionals-1400x500_0.jpg.webp?VersionId=ps7pcESVPE_cWG37HlHr9xn0gxcI9Hfu&itok=rwnsT1UV",
  },
  {
    name: "Adventure",
    image:
      "https://www.collegetransitions.com/wp-content/uploads/2024/04/Shutterstock_2050444811.jpg",
  },
  {
    name: "Drama",
    image:
      "https://prodimage.images-bn.com/pimages/9781496547125_p3_v3_s600x595.jpg",
  },
  {
    name: "Horror",
    image:
      "https://m.media-amazon.com/images/I/91tQgWThRxS._UF1000,1000_QL80_.jpg",
  },
  {
    name: "story",
    image: "https://m.media-amazon.com/images/I/81y4kJnEzbL._SL1500_.jpg",
  },
];

const CategorySlider = ({ filters, setFilters }) => {
  const [categoriesList, setCategoriesList] = useState([]);

  const getAllCategoriesLists = async () => {
    try {
      const response = await getAllCategories();

      if (response?.success) {
        setCategoriesList(response?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategoriesLists();
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (filters.category === categoryName) {
      setFilters((prev) => ({ ...prev, category: "" }));
    } else {
      setFilters((prev) => ({ ...prev, category: categoryName }));
    }
  };

  console.log(categoriesList);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6 md:px-6"
    >
      <div className="container relative px-4 mx-auto">
        <h2 className="text-lg font-semibold text-[#5c4c49] mb-4 md:text-xl">
          Browse by Category
        </h2>

        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="!py-2"
        >
          {categoriesList.map((category, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative w-32 h-40 overflow-hidden rounded-xl cursor-pointer group md:w-36 md:h-44 transition-all duration-300 ${
                  filters.category === category.name
                    ? "border-2 border-white  shadow-[0_0_30px_rgba(92,76,73,1)]"
                    : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Modern selection indicator - animated border */}
                {filters.category === category.name && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    style={{
                      boxShadow: "inset 0 0 0 2px white",
                      zIndex: 10,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Glow effect */}
                {filters.category === category.name && (
                  <motion.div
                    className="absolute inset-0 bg-[#5c4c49] opacity-20 blur-md rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <img
                  src={
                    categories?.some((cat) => cat.name === category.name)
                      ? categories.find((cat) => cat.name === category.name)
                          ?.image
                      : ""
                  }
                  alt={category.name}
                  className={`object-cover w-full h-full transition-all duration-300 ${
                    filters.category === category.name
                      ? "scale-105 brightness-100"
                      : "brightness-90 group-hover:brightness-75"
                  }`}
                  style={{
                    transform:
                      filters.category === category.name
                        ? "translateZ(10px)"
                        : "translateZ(0)",
                  }}
                />

                <div
                  className={`absolute inset-0 flex items-end p-3 transition-all duration-300 ${
                    filters.category === category.name
                      ? "bg-gradient-to-t from-black/90 via-transparent to-transparent"
                      : "bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  }`}
                >
                  <motion.span
                    className={`text-sm font-medium ${
                      filters.category === category.name
                        ? "text-white font-bold tracking-wide"
                        : "text-white"
                    } md:text-base`}
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {category.name}
                  </motion.span>
                </div>

                {/* Modern selection indicator - corner accents */}
                {filters.category === category.name && (
                  <>
                    <motion.div
                      className="absolute w-3 h-3 border-t-2 border-l-2 border-white top-2 left-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute w-3 h-3 border-t-2 border-r-2 border-white top-2 right-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute w-3 h-3 border-b-2 border-l-2 border-white bottom-2 left-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute w-3 h-3 border-b-2 border-r-2 border-white bottom-2 right-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  </>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Selected category indicator (optional) */}
        {filters.category && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="md:absolute top-[-20px] left-[14rem] flex justify-center mt-4"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-[#fff5e4] border border-[#e8d9c5] shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 0.2 },
                }}
                className="w-2 h-2 bg-[#5c4c49] rounded-full"
              />

              <motion.p className="text-xs font-medium text-[#5c4c49]">
                Viewing:{" "}
                <span className="ml-1 font-bold">{filters.category}</span>
              </motion.p>

              <motion.button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, category: "" }))
                }
                whileHover={{ backgroundColor: "#f0e6d6" }}
                className="p-1 rounded-full"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5c4c49"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CategorySlider;
