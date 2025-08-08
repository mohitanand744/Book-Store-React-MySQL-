import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function DualRangeSlider({ setOpenCategory, PriceFilter }) {
  const [value, setValue] = React.useState([1500, 4000]); // Initial range values
  const min = 0; // Minimum value for price filter
  const max = 10000; // Maximum value for price filter

  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mx: "auto" }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenCategory((prev) => ({ ...prev, PriceFilter: !PriceFilter }));
        }}
        className="flex items-center cursor-pointer justify-between mb-2 p-3 bg-[#FFF5E4] rounded-lg"
      >
        <h1 className="text-lg font-semibold ">Price Filter</h1>

        <img
          className={`${
            PriceFilter ? "rotate-90" : ""
          } transition-all w-[1.5rem] duration-300 `}
          src="/images/right.png"
          alt=""
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          PriceFilter ? "h-[7rem]" : "h-[0rem]"
        } overflow-hidden flex justify-center items-center flex-col transition-all duration-300 ease-in-out w-full bg-[#FFF5E4] rounded-lg `}
      >
        <div className="w-full p-8 pt-0">
          {/* Display Min and Max Prices */}
          <div className="flex justify-between w-full">
            <h1>₹{min}</h1>
            <h1>₹{max}</h1>
          </div>

          {/* Slider Component */}
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={min} // Minimum price
            max={max} // Maximum price
            step={500} // Step size for the slider
            sx={{
              "& .MuiSlider-thumb": {
                color: "#D3BD9D",
                "&:hover": {
                  boxShadow: "0 0 0 10px #FFF5E4", // Focus effect
                },
              },
              "& .MuiSlider-track": {
                color: "#D3BD9D",
              },
              "& .MuiSlider-rail": {
                color: "#D3BD9D",
              },
            }}
          />
        </div>
        {/* Display Selected Range */}
        <h1 className="-mt-10">
          <b>Selected Range</b>: ₹{value[0]} - ₹{value[1]}
        </h1>
      </div>
    </Box>
  );
}

export default DualRangeSlider;
