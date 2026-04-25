import React from "react";

const BooksLoader = ({
  height = "40rem",
  imgWidth = "20",
  imgHeight = "20",
  marginTop = "5",
}) => {
  return (
    <center className={`!min-h-[${height}] mt-${marginTop}`}>
      <img
        className={`w-${imgWidth} h-${imgHeight}`}
        src="/images/loading.gif"
        alt=""
      />
    </center>
  );
};

export default BooksLoader;


