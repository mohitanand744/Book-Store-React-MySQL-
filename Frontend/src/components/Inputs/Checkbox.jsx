import React from "react";

const Checkbox = (
  { id, label, checked, onChange, className = "", error, ...props },
  ref,
) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center"
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className={`w-4 h-4 border-2 md:w-5 md:h-5 bg-gray-300 rounded-md appearance-none checked:after:content-['✓'] checked:after:text-white flex justify-center items-center checked:bg-[#D3BD9D] ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="ml-2 text-sm font-semibold text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      </div>

      {error && <p className="ml-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default React.forwardRef(Checkbox);
