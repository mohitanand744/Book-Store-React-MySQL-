import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DualRangeSlider from "../components/Inputs/DualRangeSlider";
import BookCard from "../components/Cards/BookCard";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <div className="">
      <div className="bg-[#fff5e4]">
        <h1 className="py-4 mb-5 text-2xl font-semibold text-center text-[#5c4c49] md:text-3xl uppercase">
          We have various types of books
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-2 my-10">
        <div className="col-span-3">
          <DualRangeSlider />
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-12 gap-3 mx-16">
            {books?.books?.map((book) => (
              <div className="col-span-4">
                <BookCard book={book} key={book.book_id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

//
