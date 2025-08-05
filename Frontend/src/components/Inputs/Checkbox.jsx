import React from "react";

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        className={`w-4 h-4 md:w-5 md:h-5 text-blue-600 bg-gray-50 rounded-md appearance-none checked:after:content-['✓'] checked:after:text-white flex justify-center items-center checked:bg-[#D3BD9D] ${className}`}
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
