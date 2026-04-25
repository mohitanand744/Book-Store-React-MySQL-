/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main branding colors
        coffee: "#5C4C49",
        tan: "#D3BD9D",
        cream: "#ffe6c1",
        sepia: "#7C664D",
        // Semantic Colors
        red: {
          error: "#dc2626",
          heart: "#ef4444",
        },
        success: "#22c55e",
        orange: "#FB923C",
        warning: "#f5ab0bff",
        info: "#3b82f6",
        purple: "#7e22ce",

      },
      screens: {
        "xl-custom": "1560px",
      },
    },
    plugins: [],
  }
}
