import React from "react";

const ModelsHeading = ({ heading, subHeading }) => {
  return (
    <div className="mb-7">
      <h2 className="mb-1 text-2xl font-bold text-center ">
        {heading}
      </h2>
      <p className="text-sm text-center ">{subHeading}</p>
    </div>
  );
};

export default ModelsHeading;


