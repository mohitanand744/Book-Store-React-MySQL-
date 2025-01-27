import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import { useParams } from "react-router-dom";
import { getSingleBook } from "../Helper/GetData";

const SingleBooks = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    getSingleBook(id);
  }, []);

  return <div>SingleBooks</div>;
};

export default SingleBooks;
