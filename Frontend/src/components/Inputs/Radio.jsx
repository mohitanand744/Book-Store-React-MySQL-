import React from "react";

const Radio = (
  { id, label, checked, onChange, className = "", error, ...props },
  ref,
) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center cursor-pointer group"
      >
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={id}
            checked={checked}
            onChange={onChange}
            className={`w-4 h-4 md:w-5 md:h-5 border-2 border-tan  rounded-full appearance-none flex justify-center items-center transition-all duration-200  ${className}`}
            {...props}
          />
          {checked && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] bg-tan text-sepia rounded-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-tan rounded-full"></div>
            </div>
          )}
        </div>
        <label
          htmlFor={id}
          className="ml-3 text-sm font-semibold text-tan cursor-pointer "
        >
          {label}
        </label>
      </div>

      {error && <p className="ml-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default React.forwardRef(Radio);


