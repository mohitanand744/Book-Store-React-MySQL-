import React from "react";

const ModelsHeading = ({ heading, subHeading }) => {
  return (
    <>
      <h2 className="mb-1 text-2xl font-bold text-center text-[#5E4C37]">
        {heading}
      </h2>
      <p className="mb-4 text-sm text-center text-[#5E4C37]">{subHeading}</p>
    </>
  );
};

export default ModelsHeading;
