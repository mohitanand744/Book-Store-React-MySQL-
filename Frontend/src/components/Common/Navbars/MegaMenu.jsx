import React from "react";

const MegaMenu = () => {
  const bookTypes = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Biography",
    "Self-Help",
    "Romance",
    "History",
    "Thriller",
    "Children's Books",
    "Poetry",
    "Adventure",
    "Drama",
    "Horror",
  ];

  return (
    <div
      className="p-6 bg-coffee border border-tan container rounded-lg h-full
    "
    >
      {/*  <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Types of Books
      </h1> */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bookTypes.map((type, index) => (
          <div
            key={index}
            className="flex items-center text-sm md:text-lg justify-center p-4 font-medium text-center text-tan transition duration-300 bg-tan/10 border border-tan/20 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-tan/20"
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;


