import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function DualRangeSlider() {
  const [value, setValue] = React.useState([1500, 4000]); // Initial range values
  const min = 0; // Minimum value for price filter
  const max = 10000; // Maximum value for price filter

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300, mx: "auto", mt: 5 }}>
      <h1 className="mb-2 text-xl font-semibold">Price Filter</h1>

      {/* Display Min and Max Prices */}
      <div className="flex justify-between">
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
            color: "#D3BD9D", // Tailwind blue-500
            "&:hover": {
              boxShadow: "0 0 0 10px #FFF5E4", // Focus effect
            },
          },
          "& .MuiSlider-track": {
            color: "#D3BD9D",
            // Tailwind blue-500
          },
          "& .MuiSlider-rail": {
            color: "#D3BD9D", // Tailwind gray-300
          },
        }}
      />

      {/* Display Selected Range */}
      <h1 className="mt-2">
        Selected Range: ₹{value[0]} - ₹{value[1]}
      </h1>
    </Box>
  );
}

export default DualRangeSlider;
