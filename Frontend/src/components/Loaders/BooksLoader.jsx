import React from "react";

const BooksLoader = ({
  height = "40rem",
  imgWidth = "20",
  imgHeight = "20",
}) => {
  return (
    <center className={`min-h-[${height}] mt-5`}>
      <img
        className={`w-${imgWidth} h-${imgHeight}`}
        src="/images/loading.gif"
        alt=""
      />
    </center>
  );
};

export default BooksLoader;
