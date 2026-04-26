import React from "react";

const ModelsHeading = ({ heading, subHeading }) => {
  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-tan/40"></div>
        <h2 className="text-2xl font-bold text-tan tracking-tight">
          {heading}
        </h2>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-tan/40"></div>
      </div>
      <p className="text-lg text-center text-tan/60 italic max-w-[80%] mx-auto leading-relaxed">
        {subHeading}
      </p>
    </div>
  );
};

export default ModelsHeading;


